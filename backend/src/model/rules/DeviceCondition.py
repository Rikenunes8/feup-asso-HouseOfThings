from src.model.rules.Condition import Condition
from src.model.devices.Device import Device

class DeviceCondition(Condition):
  def __init__(self, device : Device, state : dict) -> None:
    super().__init__()
    self._device = device
    self._state = state

  def to_json(self) -> dict:
    return {
      "kind": "device",
      "device_id": self._device.get_id(),
      "state": self._state
    }