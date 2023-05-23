from src.model.rules.actions.Action import Action
from src.model.devices.Device import Device
from src.controller.managers.DevicesManager import DevicesManager


class DeviceAction(Action):
    def __init__(self, device_id: str, action: str, data: dict) -> None:
        super().__init__("device")
        self._device_id = device_id
        self._action = action
        self._data = data

    def execute(self, data: dict) -> Device:
        device_manager: DevicesManager = data["device_manager"]
        device = device_manager.get(self._device_id)
        device.action(self._action, self._data)
        return device

    def to_json(self) -> dict:
        return {
            "kind": self._kind,
            "device_id": self._device_id,
            "action": self._action,
            "data": self._data,
        }
