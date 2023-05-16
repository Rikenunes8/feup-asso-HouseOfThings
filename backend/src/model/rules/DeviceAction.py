from src.model.rules.Action import Action
from src.model.devices.Device import Device
from src.controller.managers.DevicesManager import DevicesManager

class DeviceAction(Action):
    def __init__(self, device_id : str, action : str ) -> None:
        self._device_id = device_id
        self._action = action
  
    def execute(self, device_manager : DevicesManager) -> Device:
        device = device_manager.get(self._device_id)
        device.action(self._action)
        return device

    def to_json(self) -> dict:
        return {"kind": "device", "device_id": self._device_id, "action": self._action}
