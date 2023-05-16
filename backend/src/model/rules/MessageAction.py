from abc import ABC, abstractmethod
from src.model.rules.Action import Action
from src.model.devices.Device import Device
from src.controller.managers.DevicesManager import DevicesManager

class MessageAction(Action, ABC):
    def __init__(self) -> None:
        pass
  
    @abstractmethod
    def execute(self, device_manager: DevicesManager) -> Device:
        pass

    def to_json(self) -> dict:
        return {"kind": "message", "device_id": self._device_id, "action": self._action}
