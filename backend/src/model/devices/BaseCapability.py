from src.model.devices.IDevice import IDevice
from src.model.devices.Device import Device
from abc import ABC

class BaseCapability(IDevice, ABC):

    def __init__(self, device: IDevice):
        self._device: IDevice = device
        self._id: str = device.get_id()
    
    def get(self) -> Device:
        return self._device.get()

    def action(self, action: str, data: dict = None, updated_state = None) -> bool:
        return self._device.action(action, data, updated_state)
    
    def to_json(self) -> dict:
        print("requesting to device")
        print(self._device)
        return self._device.to_json()
    
    def add(self, state: dict) -> None:
        self._device.add(state)
    