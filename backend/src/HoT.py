import time

from src.controller.adapter.ActuatorDeviceAdapter import ActuatorDeviceAdapter
from src.controller.adapter.DeviceAdapter import DeviceAdapter
from src.controller.DeviceAdapterManager import DeviceAdapterManager
from src.controller.RulesManager import RulesManager
from src.controller.DivisionsManager import DivisionsManager
from src.database.DB import DB
from src.database.CollectionTypes import Collection

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
        self._rules_manager = RulesManager()
        self._divisions_manager = DivisionsManager()
        self._cid = "HoT"
        self._load_devices()

    def _load_devices(self):
        devices = DB().get(Collection.DEVICES).find_all()
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
        return DB().get(Collection.CATEGORIES).find_all()

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
      return self._rules_manager.get_all()
    
    def create_rule(self, rule : dict):
      return self._rules_manager.add(rule).to_json()

    def delete_rule(self, rule_id : str):
      return self._rules_manager.remove(rule_id)

    def update_rule(self, rule_id : str, rule : dict):
      rule_updated = self._rules_manager.update(rule_id, rule)
      if isinstance(rule_updated, str): return rule_updated
      return rule_updated.to_json()

    def execute_rule(self, rule_id : str):
      pass


    def divisions(self):
        return self._divisions_manager.get_all()
    
    def create_division(self, division : dict):
        return self._divisions_manager.add(division).to_json()

    def delete_division(self, division_id : str):
        return self._divisions_manager.remove(division_id)

    def rename_division(self, division_id: str, config: dict):
        name = config.get("name")
        if name == None:
            return "No name provided"
        division_updated = self._divisions_manager.rename(division_id, name)
        if isinstance(division_updated, str): return division_updated
        return division_updated.to_json()
        
    def change_icon_division(self, division_id: str, config: dict):
        icon = config.get("icon")
        if icon == None:
            return "No icon provided"
        division_updated = self._divisions_manager.change_icon(division_id, icon)
        if isinstance(division_updated, str): return division_updated
        return division_updated.to_json()
    
    def add_device_division(self, division_id: str, config: dict):
        uid = config.get("device")
        if uid == None:
            return "No device uid provided"
        adapter = self._manager.get_device(uid)
        if adapter == None:
            return "No device with uid " + uid
        device = adapter.get_model()
        division_updated = self._divisions_manager.add_device(division_id, uid)
        device.add_division(division_id)
        if isinstance(division_updated, str): return division_updated
        return division_updated.to_json()
    
    def remove_device_division(self, division_id: str, config: dict):
        uid = config.get("device")
        if uid == None:
            return "No device uid provided"
        adapter = self._manager.get_device(uid)
        if adapter == None:
            return "No device with uid " + uid
        device = adapter.get_model()
        division_updated = self._divisions_manager.remove_device(division_id, uid)
        device.remove_division(division_id)
        if isinstance(division_updated, str): return division_updated
        return division_updated.to_json()
