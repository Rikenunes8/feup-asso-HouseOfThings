from abc import ABC, abstractmethod
from src.controller.device_connectors.DeviceConnector import DeviceConnector


class ActuatorDeviceConnector(DeviceConnector, ABC):
    def __init__(self):
        super().__init__()

    @abstractmethod
    def action(self, action: str, data: dict = None):
        pass
