from abc import ABC, abstractmethod
from src.model.rules.actions.Action import Action
from src.model.devices.Device import Device

class MessageAction(Action, ABC):
    def __init__(self) -> None:
        self._service = None
        self._data = {}
  
    @abstractmethod
    def execute(self, data: dict) -> Device:
        pass

    def to_json(self) -> dict:
        return {"kind": "message", "service": self._service, "data": self._data}
