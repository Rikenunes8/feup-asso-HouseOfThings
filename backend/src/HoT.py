from src.controller.managers.DeviceManager import DeviceManager
from src.controller.device_connectors.DeviceConnector import DeviceConnector
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
        self._rules_manager = RulesManager(self._cid, self._device_manager)
        self._divisions_manager = DivisionsManager(self._cid, self._device_manager)
        self._device_manager.load()


    def get_device_manager(self):
        return self._device_manager
    
    def get_rules_manager(self):
        return self._rules_manager
    
    def get_divisions_manager(self):
        return self._divisions_manager

    def categories(self):
        return DB().get(Collection.CATEGORIES).find_all()
