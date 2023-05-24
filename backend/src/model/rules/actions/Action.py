from abc import ABC, abstractmethod
from src.model.devices.Device import Device


class Action(ABC):
    def __init__(self, kind) -> None:
        super().__init__()
        self._kind = kind

    @abstractmethod
    def execute(self, data: dict) -> Device:
        pass

    @abstractmethod
    def to_json(self) -> dict:
        pass
