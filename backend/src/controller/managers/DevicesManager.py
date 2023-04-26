import time

from src.api.ApiException import ApiException
from src.model.devices.Device import Device
from src.model.devices.ConcreteDevice import ConcreteDevice
from src.controller.managers.Manager import Manager
from src.controller.device_connectors.DeviceConnector import DeviceConnector
from src.controller.device_connectors.BasicLightMqttConnector import BasicLightMqttConnector
from src.controller.device_connectors.BasicLightPiConnector import BasicLightPiConnector
from src.controller.device_connectors.ThermometerPiConnector import ThermometerPiConnector
from src.controller.observer.Subscriber import Subscriber
from src.database.DB import DB
from src.database.CollectionTypes import Collection

# DO NOT REMOVE THESE IMPORTS, THEY ARE NEEDED FOR THE EVAL TO WORK
from src.model.devices.capabilities.PowerCap import PowerCap
from src.model.devices.capabilities.TemperatureCap import TemperatureCap


class DevicesManager(Manager):
    def __init__(self, cid) -> None:
        super().__init__(cid)
        self._devices: dict[str, Device] = {}
    
    def all(self) -> list:
        def valid(dev: Device) -> bool:
            return dev != None and dev.get().is_connected()
        return list(filter(valid, self._devices.values()))
    
    def get(self, uid: str) -> Device:
        device = self._devices.get(uid)
        if device == None:
            raise ApiException("Device not found")
        return device

    def create(self, config: dict, uid: str) -> Device:
        new_device = self._make_device(self._cid, uid, config)
        if new_device == None:
            raise ApiException("No device for subcategory: " + config.get("subcategory"))
        concrete_device: ConcreteDevice = new_device.get()
        if not concrete_device.connect():
            raise ApiException("Failed to connect to device with uid: " + uid)
        name = config.get("name")
        divisions = config.get("divisions")
        if name != None:
            concrete_device.rename(name)
        if divisions != None: # TODO should this also change divisions
            concrete_device.set_divisions(divisions)
        self.add(uid, new_device)
        return new_device
    
    def update(self, uid: str, data: dict):
        device = self.get(uid)
        device.update(data)
        return device

    def delete(self, uid) -> None:
        device = self._devices.pop(uid, None)
        if device == None:
            raise ApiException("No device with uid " + uid + " to disconnect")
        device.get().disconnect()

    def add(self, uid: str, device: Device) -> None:
        self._devices[uid] = device
        return device

    def action(self, uid: str, action, data):
        self.get(uid).action(action, data)

    def load(self):
        devices = DB().get(Collection.DEVICES).find_all()
        for device in devices:
            if not device.get('connected'):
                DB().get(Collection.DEVICES).remove(device.get('uid'))
                continue
            new_device: Device = self._make_device(self._cid, device['uid'], device, device)
            if new_device is None:
                continue

            new_device_concrete: ConcreteDevice = new_device.get()
            new_device_concrete.connect(True)

            self.add(device['uid'], new_device)

    def available(self, config: dict):
        connectors = self._make_connectors(self._cid, None, config)
        if connectors == None: 
            return
        
        for connector in connectors: 
            connector.start_discovery()
        
        start = time.time()
        while time.time() - start < 4: pass
        
        devices_found = {}
        for connector in connectors:
            devices_found[connector.get_protocol()] = connector.finish_discovery()

        return devices_found


    def _make_device(self, cid: str, uid: str, config: dict, data: dict = {}) -> Device or None:
        connectors = self._make_connectors(cid, uid, config)
        if connectors == None or len(connectors) > 1: return None
        connector = connectors[0]
        capabilities: list[str] = connector.get_capabilities()

        device = ConcreteDevice(uid, config, connector)
        for capability in capabilities:
            # eval to get the respective decorator capabililty class instead of making an inifinite if-else
            device = eval(f"{capability.title()}Cap")(device, data)
            if isinstance(device, Subscriber):
                connector.subscribe(device)

        return device

    def _make_connectors(self, cid: str, uid: str, config: dict) -> list[DeviceConnector] or None:
        category = config.get("category")
        subcategory = config.get("subcategory")
        protocol = config.get("protocol")
        config = {'category': category, 'subcategory': subcategory, 'protocol': protocol}
        
        connectors = []
        if subcategory == "light bulb":
            if protocol == "virtual" or protocol == None:
                connectors.append(BasicLightMqttConnector(cid, uid, config))
            if protocol == "raspberry pi" or protocol == None:
                connectors.append(BasicLightPiConnector(cid, uid, config))
        elif subcategory == "thermometer":
            if protocol == "raspberry pi" or protocol == None:
                connectors.append(ThermometerPiConnector(cid, uid, config))

        if len(connectors) == 0:
            print(f"No device implementation for subcategory: {subcategory} and protocol: {protocol}")
            return None
        
        return connectors
