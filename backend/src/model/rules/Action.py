from src.controller.managers.DeviceManager import DeviceManager
from src.model.devices.Device import Device

class Action:
  def __init__(self, device_id : str, action : str ) -> None:
    self._device_id = device_id
    self._action = action
  
  def execute(self, device_manager : DeviceManager):
    device: Device = device_manager.get_device(self._device_id)
    if device == None: return f"No device with id: {self._device_id} to execute action"
    device.action(self._action)

  def to_json(self) -> dict:
    return {
      "device_id": self._device_id,
      "action": self._action
    }
