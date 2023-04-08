from abc import ABC, abstractmethod
from src.controller.adapter.DeviceAdapter import DeviceAdapter

class ActuatorDeviceAdapter(DeviceAdapter, ABC):
    def __init__(self):
        super().__init__()
    
    @abstractmethod
    def action(self, action: str):
        pass

