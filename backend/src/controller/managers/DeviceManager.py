import time

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


class DeviceManager(Manager):
    def __init__(self, cid) -> None:
        super().__init__(cid)
        self._devices: dict[str, Device] = {}

    def add(self, id: str, device: Device) -> None:
        self._devices[id] = device
    def remove(self, id) -> None:
        if self._devices.get(id) != None:
            del self._devices[id]
    def get_device(self, id) -> Device:
        return self._devices.get(id)

    def load(self):
        devices = DB().get(Collection.DEVICES).find_all()
        for device in devices:
            new_device: Device = self._make_device(self._cid, device['uid'], device, device)
            if new_device == None: continue

            new_device_concrete: ConcreteDevice = new_device.get()
            new_device_concrete.connect(True)

            self.add(device['uid'], new_device)



    def devices(self) -> list[Device]:
        def valid(dev: Device) -> bool:
            return dev != None and dev.get().is_connected()
        return list(filter(valid, self._devices.values()))
    
    def action(self, uid: str, payload: dict):
        data = payload.get("data")
        action = payload.get("action")
        if action == None: return "No action provided"
        device: Device = self.get_device(uid)
        if device == None: return "No device with that uid"
        device.action(action, data)

    def rename(self, uid: str, name: str):
        if name == None: return "No name provided"
        device = self.get_device(uid)
        if device == None: return "No device with that uid"
        concrete_device: ConcreteDevice = device.get()
        concrete_device.rename(name)

    def disconnect(self, uid: str) -> str:
        device = self.get_device(uid)
        if device == None: 
            return f"No device with uid {uid} to disconnect"
        
        concrete_device: ConcreteDevice = device.get()
        if concrete_device.disconnect():
            self.remove(uid)

    def connect(self, uid: str, config: dict) -> str or dict:
        device: Device = self._make_device(self._cid, uid, config)
        if device == None:
            return "No device for subcategory: " + config.get("subcategory")

        concrete_device: ConcreteDevice = device.get()
        if (not concrete_device.connect()):
            return "Failed to connect to device with uid: " + uid
        
        name = config.get("name")
        divisions = config.get("divisions")
        if name != None: concrete_device.rename(name)
        if divisions != None: concrete_device.set_divisions(divisions)

        self.add(uid, device)
        return device.to_json()

    def available(self, config: dict):
        connectors = self._make_connectors(self._cid, None, config)
        if connectors == None: return
        
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
