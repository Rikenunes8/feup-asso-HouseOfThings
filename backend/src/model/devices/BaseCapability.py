from src.model.devices.Device import Device
from src.model.devices.ConcreteDevice import ConcreteDevice
from abc import ABC

class BaseCapability(Device, ABC):

    def __init__(self, device: Device):
        self._device: Device = device
        self._id: str = device.get_id()
    
    def get(self) -> ConcreteDevice:
        return self._device.get()

    def action(self, action: str, data: dict = None, updated_state = None) -> bool:
        return self._device.action(action, data, updated_state)
    
    def to_json(self) -> dict:
        return self._device.to_json()
    
    def add(self, state: dict) -> None:
        self._device.add(state)
    