import time

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

    def add(self, id: str, adapter: DeviceAdapter) -> None:
        self._devices[id] = adapter

    def remove(self, id) -> None:
        if self._devices.get(id) != None:
            del self._devices[id]

    def get_device(self, id) -> DeviceAdapter:
        return self._devices.get(id)


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

    
    def devices(self) -> list:
        devices_ids = list(self._devices.keys())
        return [self.get_device(id).get_model() for id in devices_ids]

    def connect(self, uid: str, config: dict) -> str:
        new_device : DeviceAdapter = DeviceManager.fabricate(self._cid, uid, config)
        if new_device == None:
            return "No device for subcategory: " + config.get("subcategory")
        success = new_device.connect()
        if not success:
            return "Failed to connect to device with uid: " + uid
        name = config.get("name")
        divisions = config.get("divisions")
        if name != None:
            new_device.get_model().rename(name)
        if divisions != None:
            new_device.get_model().set_divisions(divisions)
        self.add(uid, new_device)
        return new_device.get_model().to_json()

    def disconnect(self, uid: str) -> str:
        adapter = self.get_device(uid)
        if adapter == None:
            return "No device with uid " + uid + " to disconnect"
        adapter.disconnect()
        self.remove(uid)

    def action(self, uid: str, action: dict):
        action = action.get("action")
        if action == None: 
            return "No action provided"
        adapter: ActuatorDeviceAdapter = self.get_device(uid)
        adapter.action(action)

    def rename(self, uid: str, config: dict):
        name = config.get("name")
        if name == None:
            return "No name provided"
        adapter = self.get_device(uid)
        if adapter == None:
            return "No device with that uid"
        adapter.get_model().rename(name)

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