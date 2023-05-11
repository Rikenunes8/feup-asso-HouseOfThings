from src.model.rules.Condition import Condition

class DeviceCondition(Condition):
  def __init__(self, device_id : str, state : dict) -> None:
    super().__init__()
    self._device_id = device_id
    self._state = state
  
  def configure(self, data: dict = None):
    pass

  def to_json(self) -> dict:
    return {
      "kind": "device",
      "device_id": self._device_id,
      "state": self._state
    }