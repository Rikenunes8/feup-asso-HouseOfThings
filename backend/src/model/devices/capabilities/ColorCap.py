from src.model.devices.BaseCapability import BaseCapability
from src.model.devices.Device import Device
from src.controller.observer.DeviceStateNotifier import DeviceStateNotifier


class ColorCap(BaseCapability):
    def __init__(self, device: Device, notifier: DeviceStateNotifier, state: dict = {}):
        super().__init__(device, notifier)
        color = state.get("color", "#FFFF00")
        self.update_state({"color": color})

    def _build_state(self, color: str) -> dict:
        return {"color": color}

    def build_state(self, state: dict = {}) -> dict:
        color = state.get("color")
        if color == None:
            return
        return self._build_state(color)

    def action(self, action: str, data: dict = None, updated_state=None) -> bool:
        if updated_state is None:
            if action == "set_color":
                updated_state = self.build_state(data)
        return self._device.action(action, data, updated_state)
