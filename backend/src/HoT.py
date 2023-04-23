from src.controller.managers.DeviceManager import DeviceManager
from src.controller.adapter.DeviceAdapter import DeviceAdapter
from src.controller.managers.RulesManager import RulesManager
from src.controller.managers.DivisionsManager import DivisionsManager
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
        self._cid = "HoT"
        self._device_manager = DeviceManager(self._cid)
        self._rules_manager = RulesManager(self._cid)
        self._divisions_manager = DivisionsManager(self._cid, self._device_manager)
        self._load_devices()

    def _load_devices(self):
        devices = DB().get(Collection.DEVICES).find_all()
        for device in devices:
            new_device: DeviceAdapter = DeviceManager.fabricate(
                self._cid, device['uid'], device)
            if new_device == None:
                continue
            new_device.create_model()
            new_device.connect()
            self._device_manager.add(device['uid'], new_device)

    def get_device_manager(self):
        return self._device_manager
    
    def get_rules_manager(self):
        return self._rules_manager
    
    def get_divisions_manager(self):
        return self._divisions_manager

    def categories(self):
        return DB().get(Collection.CATEGORIES).find_all()
