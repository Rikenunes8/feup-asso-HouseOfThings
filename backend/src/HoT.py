import time

from src.controller.adapter.DeviceAdapter import DeviceAdapter
from src.controller.DeviceAdapterManager import DeviceAdapterManager
from src.database.DB import DB


class HoTMeta(type):
    _instances = {}

    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            instance = super().__call__(*args, **kwargs)
            cls._instances[cls] = instance
        return cls._instances[cls]


class HoT(metaclass=HoTMeta):
    def __init__(self):
        print("HoT init")
        self._devManager = DeviceAdapterManager()
        self._cid = "HoT"  # TODO: set this to something better
        self._loadDevices()

    def _loadDevices(self):
        devices = DB().findAllDevices()
        for device in devices:
            newDevice = DeviceAdapterManager.factory(
                self._cid, device['uid'], device)
            if newDevice == None:
                continue
            newDevice.createModel()
            newDevice.connect()
            self._devManager.add(device['uid'], newDevice)

    def devices(self) -> list:
        ids = self._devManager.getDeviceIds()
        return [self._devManager.getDevice(id).getModel() for id in ids]

    def connect(self, uid: str, config: dict) -> str:
        newDevice = DeviceAdapterManager.factory(self._cid, uid, config)
        if newDevice == None:
            return "No device for group: " + config.get("group")
        success = newDevice.connect()
        if not success:
            return "Failed to connect to device with uid: " + uid
        name = config.get("name")
        divisions = config.get("divisions")
        if name != None:
            newDevice.getModel().rename(name)
        if divisions != None:
            newDevice.getModel().setDivisions(divisions)
        self._devManager.add(uid, newDevice)

    def disconnect(self, uid: str) -> str:
        adapter = self._devManager.getDevice(uid)
        if adapter == None:
            return "No device with uid " + uid + " to disconnect"
        adapter.disconnect()
        self._devManager.remove(uid)

    def action(self, uid: str, rules: dict):
        adapter: DeviceAdapter = self._devManager.getDevice(uid)
        # TODO send rules to adapter to perform action instead of this
        if rules["action"] == "turnOn":
            adapter.turnOn()
        elif rules["action"] == "turnOff":
            adapter.turnOff()

    def rename(self, uid: str, config: dict):
        name = config.get("name")
        if name == None:
            return "No name provided"
        adapter = self._devManager.getDevice(uid)
        if adapter == None:
            return "No device with that uid"
        adapter.getModel().rename(name)

    def categories(self):
        return DB().findAllCategories()

    def available(self, config: dict):
        adapter = DeviceAdapterManager.factory(self._cid, None, config)
        if adapter == None:
            return

        adapter.startDiscovery()
        start = time.time()
        while time.time() - start < 4:
            pass
        devicesFound = adapter.finishDiscovery()

        return devicesFound
