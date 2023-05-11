from src.model.devices.BaseCapability import BaseCapability
from src.model.devices.Device import Device
from src.controller.observer.DeviceStateNotifier import DeviceStateNotifier

class PowerCap(BaseCapability):

    def __init__(self, device: Device, notifier: DeviceStateNotifier, state: dict = {}):
        super().__init__(device, notifier)
        power = state.get('power', False)
        self.update_state({'power': power})

    def _build_state(self, power: bool) -> dict:
        return {'power': power}
    
    def build_state(self, state = {}) -> dict:
        power = state.get('power')
        if power == None: return
        return self._build_state(power)

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
