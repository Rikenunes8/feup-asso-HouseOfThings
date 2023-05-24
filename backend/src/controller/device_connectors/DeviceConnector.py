from abc import ABC, abstractmethod
from src.controller.observer.Publisher import Publisher


class DeviceConnector(Publisher, ABC):
    def __init__(self):
        super().__init__()
        self._connected = False
        self._protocol = None
        self._capabililties = []

    def set_connected(self, connected: bool) -> None:
        self._connected = connected

    def is_connected(self) -> bool:
        return self._connected

    def set_protocol(self, protocol: str) -> None:
        self._protocol = protocol

    def get_protocol(self) -> str:
        return self._protocol

    def set_capabilities(self, capabilities: list[str]) -> None:
        self._capabililties = capabilities

    def get_capabilities(self) -> list[str]:
        return self._capabililties

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
