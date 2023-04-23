from src.model.devices.BaseCapability import BaseCapability
from src.model.devices.IDevice import IDevice


class PowerCap(BaseCapability):

    def __init__(self, device: IDevice, state: dict = {}):
        super().__init__(device)
        power = state.get('power', False)
        self._set_state({'power': power})

    def _build_state(self, power: bool) -> dict:
        return {'power': power}
    def _set_state(self, state = {}):
        power = state.get('power')
        if power == None: return
        state = self._build_state(power)
        self.update(state)
    def turn_on(self) -> None:
        return self._build_state(True)
    def turn_off(self) -> None:
        return self._build_state(False)
    


    def action(self, action: str, data: dict = None, updated_state = None) -> bool:
        if updated_state is None:
            if action == 'turn_on':
                updated_state = self.turn_on()
            elif action == 'turn_off':
                updated_state = self.turn_off()
        return self._device.action(action, data, updated_state)
