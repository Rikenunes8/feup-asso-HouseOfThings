from src.model.devices.BaseCapability import BaseCapability
from src.model.devices.IDevice import IDevice

class TemperatureCap(BaseCapability):
    def __init__(self, device: IDevice, state: dict = {}):
        super().__init__(device)
        state = self.build_state(state.get('temperature', False))
        self.update(state)

    def build_state(self, temperature: float) -> dict:
        return {'temperature': temperature}
