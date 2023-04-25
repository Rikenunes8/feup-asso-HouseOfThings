import time

from src.api.ApiException import ApiException
from src.controller.managers.Manager import Manager
from src.controller.adapter.DeviceAdapter import DeviceAdapter
from src.controller.adapter.ActuatorDeviceAdapter import ActuatorDeviceAdapter
from src.controller.adapter.LightMqttAdapter import LightMqttAdapter
from src.controller.adapter.LightBulbPiAdapter import LightBulbPiAdapter
from src.controller.adapter.ThermometerPiAdapter import ThermometerPiAdapter


class DeviceManager(Manager):
    def __init__(self, cid) -> None:
        super().__init__(cid)
        self._devices = {}
    
    def all(self) -> list:
        return [device.get_model() for device in self._devices.values()]
    
    def get(self, uid) -> DeviceAdapter:
        adapter = self._devices.get(uid)
        if adapter == None:
            raise ApiException("Device not found")
        return adapter

    def create(self, uid: str, config: dict) -> str:
        new_device = DeviceManager.fabricate(self._cid, uid, config)
        if new_device == None:
            raise ApiException("No device for subcategory: " + config.get("subcategory"))
        if not new_device.connect():
            raise ApiException("Failed to connect to device with uid: " + uid)
        name = config.get("name")
        divisions = config.get("divisions")
        if name != None:
            new_device.get_model().rename(name)
        if divisions != None: # TODO should this also change divisions
            new_device.get_model().set_divisions(divisions)
        self.add(uid, new_device)
        return new_device
    
    def update(self, uid: str, data: dict):
        adapter = self.get(uid)
        adapter.get_model().update(data)
        return adapter

    def delete(self, uid) -> None:
        adapter = self._devices.pop(uid, None)
        if adapter == None:
            raise ApiException("No device with uid " + uid + " to disconnect")
        adapter.disconnect()

    def add(self, uid: str, adapter: DeviceAdapter) -> None:
        self._devices[uid] = adapter
        return adapter

    @staticmethod
    def fabricate(cid: str, uid: str, config: dict) -> list[DeviceAdapter] or DeviceAdapter or None:
        category = config.get("category")
        subcategory = config.get("subcategory")
        protocol = config.get("protocol")
        config = {'category': category, 'subcategory': subcategory, 'protocol': protocol}
        
        adapters = []
        if subcategory == "light bulb":
            if protocol == "virtual" or protocol == None:
                adapters.append(LightMqttAdapter(cid, uid, config))
            if protocol == "raspberry pi" or protocol == None:
                adapters.append(LightBulbPiAdapter(cid, uid, config))
        elif subcategory == "thermometer":
            if protocol == "raspberry pi" or protocol == None:
                adapters.append(ThermometerPiAdapter(cid, uid, config))

        if len(adapters) == 0:
            print(f"No device implementation for subcategory: {subcategory} and protocol: {protocol}")
            return None
        
        return adapters if (protocol == None) else adapters[0]

    def action(self, uid: str, action):
        self.get(uid).action(action)

    def available(self, config: dict):
        adapters = DeviceManager.fabricate(self._cid, None, config)
        if adapters == None:
            return
        
        for adapter in adapters: 
            adapter.start_discovery()
        
        start = time.time()
        while time.time() - start < 4:
            pass
        
        devices_found = {}
        for adapter in adapters:
            devices_found[adapter.get_protocol()] = adapter.finish_discovery()

        return devices_found
