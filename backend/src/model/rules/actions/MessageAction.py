from abc import ABC, abstractmethod
from src.model.rules.actions.Action import Action
from src.model.devices.Device import Device


class MessageAction(Action, ABC):
    def __init__(self, service: str, data: dict) -> None:
        super().__init__("message")
        self._service = service
        self._data = data

    @abstractmethod
    def execute(self, data: dict) -> Device:
        pass

    def to_json(self) -> dict:
        return {"kind": self._kind, "service": self._service, "data": self._data}
