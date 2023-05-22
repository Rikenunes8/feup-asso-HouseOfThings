from src.model.devices.BaseCapability import BaseCapability
from src.model.devices.Device import Device
from src.controller.observer.Subscriber import Subscriber
from src.controller.observer.DeviceStateNotifier import DeviceStateNotifier


class TemperatureCap(BaseCapability, Subscriber):
    def __init__(self, device: Device, notifier: DeviceStateNotifier, state: dict = {}):
        super().__init__(device, notifier)
        temperature = state.get('temperature', 0)
        self.update_state({'temperature': temperature})

    def _build_state(self, temperature: float) -> dict:
        return {'temperature': temperature}

    def build_state(self, state = {}) -> dict:
        temperature = state.get('temperature')
        if temperature == None: return
        return self._build_state(temperature)

    # TODO: make a SelfUpdatedCap that extends BaseCapability and implements Subscriber 
    # and has this method and the TemperatureCap class extends SelfUpdatedCap
    def notified(self, data: dict):
        state = self.find()
        if self.build_state(state) == self.build_state(data): return
        self.update_state(data)
        self._notifier.announce(self.find())
