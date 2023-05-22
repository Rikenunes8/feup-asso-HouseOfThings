from src.controller.managers.DevicesManager import DevicesManager
from src.controller.managers.RulesManager import RulesManager
from src.controller.managers.DivisionsManager import DivisionsManager


class HoT:
    def __init__(self):
        self._cid = "HoT"
        self._device_manager = DevicesManager(self._cid)
        self._rules_manager = RulesManager(self._cid, self._device_manager)
        self._divisions_manager = DivisionsManager(self._cid, self._device_manager)
        self._device_manager.load()
        self._rules_manager.load()
        self._rules_manager.run_alarms()
        self._divisions_manager.load()

    def get_devices_manager(self) -> DevicesManager:
        return self._device_manager

    def get_rules_manager(self) -> RulesManager:
        return self._rules_manager

    def get_divisions_manager(self) -> DivisionsManager:
        return self._divisions_manager
