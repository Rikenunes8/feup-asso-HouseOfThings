from src.controller.adapter.ActuatorDeviceAdapter import ActuatorDeviceAdapter
from src.controller.DeviceAdapterManager import DeviceAdapterManager

class Action:
  def __init__(self, device_id : str, action : str ) -> None:
    self._device_id = device_id
    self._action = action
  
  def execute(self, deviceManager : DeviceAdapterManager):
    deviceAdapter : ActuatorDeviceAdapter = deviceManager.get_device(self._device_id)
    if deviceAdapter == None: return "No device with id: " + str(self._device_id) + " to execute action"
    deviceAdapter.action(self._action)

  def to_json(self) -> dict:
    return {
      "device_id": self._device_id,
      "action": self._action
    }
