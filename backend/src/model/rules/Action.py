from src.controller.adapter.ActuatorDeviceAdapter import ActuatorDeviceAdapter
from src.controller.managers.DeviceManager import DeviceManager

class Action:
  def __init__(self, device_id : str, action : str ) -> None:
    self._device_id = device_id
    self._action = action
  
  def execute(self, device_manager : DeviceManager):
    device_adapter: ActuatorDeviceAdapter = device_manager.get_device(self._device_id)
    if device_adapter == None: return "No device with id: " + str(self._device_id) + " to execute action"
    device_adapter.action(self._action)

  def to_json(self) -> dict:
    return {
      "device_id": self._device_id,
      "action": self._action
    }
