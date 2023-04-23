from src.model.devices.BaseCapability import BaseCapability
from src.model.devices.IDevice import IDevice
from src.controller.observer.Subscriber import Subscriber


class TemperatureCap(BaseCapability, Subscriber):
    def __init__(self, device: IDevice, state: dict = {}):
        super().__init__(device)
        temperature = state.get('temperature', 0)
        self._set_state({'temperature': temperature})

    def _build_state(self, temperature: float) -> dict:
        return {'temperature': temperature}
    def _set_state(self, state = {}):
        temperature = state.get('temperature')
        if temperature == None: return
        state = self._build_state(temperature)
        self.update(state)


    def notify(self, data: dict):
        self._set_state(data)
            