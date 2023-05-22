from src.model.devices.BaseCapability import BaseCapability
from src.model.devices.Device import Device
from src.controller.observer.DeviceStateNotifier import DeviceStateNotifier


class BrightnessCap(BaseCapability):
    def __init__(self, device: Device, notifier: DeviceStateNotifier, state: dict = {}):
        super().__init__(device, notifier)
        brightness = state.get("brightness", 100)
        self.update_state({"brightness": brightness})

    def _build_state(self, brightness: str) -> dict:
        return {"brightness": brightness}

    def build_state(self, state: dict = {}) -> dict:
        brightness = state.get("brightness")
        if brightness is None:
            return
        return self._build_state(brightness)

    def action(self, action: str, data: dict = None, updated_state=None) -> bool:
        if updated_state is None:
            if action == "set_brightness":
                updated_state = self.build_state(data)
        return self._device.action(action, data, updated_state)
