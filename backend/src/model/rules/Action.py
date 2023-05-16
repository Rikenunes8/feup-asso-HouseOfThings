from abc import ABC, abstractmethod
from src.controller.managers.DevicesManager import DevicesManager
from src.model.devices.Device import Device

class Action(ABC):
    def __init__(self, device_id : str, action : str ) -> None:
        self._device_id = device_id
        self._action = action

    @abstractmethod
    def execute(self, device_manager : DevicesManager) -> Device:
        pass

    @abstractmethod
    def to_json(self) -> dict:
        pass
