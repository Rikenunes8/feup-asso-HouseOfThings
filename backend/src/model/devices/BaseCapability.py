from abc import ABC, abstractmethod
from src.model.devices.Device import Device
from src.model.devices.ConcreteDevice import ConcreteDevice
from src.controller.observer.DeviceStateNotifier import DeviceStateNotifier

class BaseCapability(Device, ABC):

    def __init__(self, device: Device, notifier: DeviceStateNotifier):
        super().__init__(device.get_id(), notifier)
        self._device: Device = device
    
    def get(self) -> ConcreteDevice:
        return self._device.get()

    def action(self, action: str, data: dict = None, updated_state = None) -> bool:
        return self._device.action(action, data, updated_state)
    
    def to_json(self) -> dict:
        return self._device.to_json()

    def update_state(self, state = {}):
        valid_state = self.build_state(state)
        self.update(valid_state)
        self.notify(valid_state)

    @abstractmethod
    def build_state(self, state = {}):
        pass