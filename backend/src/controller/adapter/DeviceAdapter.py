from abc import ABC, abstractmethod
from src.model.devices.Device import Device


class DeviceAdapter(ABC):
    def __init__(self):
        super().__init__()
        self._model = None

    @abstractmethod
    def create_model(self) -> None:
        pass

    def get_model(self) -> Device:
        return self._model

    @abstractmethod
    def connect(self) -> bool:
        pass

    @abstractmethod
    def disconnect(self) -> None:
        pass

    @abstractmethod
    def start_discovery(self):
        pass

    @abstractmethod
    def finish_discovery(self):
        pass
