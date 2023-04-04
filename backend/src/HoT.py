import time

from src.controller.adapter.ActuatorDeviceAdapter import ActuatorDeviceAdapter
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
        self._manager = DeviceAdapterManager()
        self._cid = "HoT"
        self._load_devices()

    def _load_devices(self):
        devices = DB().find_all_devices()
        for device in devices:
            new_device = DeviceAdapterManager.fabricate(
                self._cid, device['uid'], device)
            if new_device == None:
                continue
            new_device.create_model()
            new_device.connect()
            self._manager.add(device['uid'], new_device)

    def devices(self) -> list:
        ids = self._manager.get_device_ids()
        return [self._manager.get_device(id).get_model() for id in ids]

    def connect(self, uid: str, config: dict) -> str:
        new_device : DeviceAdapter = DeviceAdapterManager.fabricate(self._cid, uid, config)
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
        self._manager.add(uid, new_device)
        return new_device.get_model().to_json()

    def disconnect(self, uid: str) -> str:
        adapter = self._manager.get_device(uid)
        if adapter == None:
            return "No device with uid " + uid + " to disconnect"
        adapter.disconnect()
        self._manager.remove(uid)

    def action(self, uid: str, action: dict):
        action = action.get("action")
        if action == None: 
            return "No action provided"
        adapter: ActuatorDeviceAdapter = self._manager.get_device(uid)
        adapter.action(action)

    def rename(self, uid: str, config: dict):
        name = config.get("name")
        if name == None:
            return "No name provided"
        adapter = self._manager.get_device(uid)
        if adapter == None:
            return "No device with that uid"
        adapter.get_model().rename(name)

    def categories(self):
        return DB().find_all_categories()

    def available(self, config: dict):
        adapters = DeviceAdapterManager.fabricate(self._cid, None, config)
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
    
    def rules(self):
      pass
    
    def create_rule(self, rule : dict):
      pass

    def delete_rule(self, rule_id : str):
      pass

    def update_rule(self, rule_id : str, rule : dict):
      pass

    def execute_rule(self, rule_id : str):
      pass
