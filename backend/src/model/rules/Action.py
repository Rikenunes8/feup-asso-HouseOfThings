from src.controller.adapter.ActuatorDeviceAdapter import ActuatorDeviceAdapter

class Action:
  def __init__(self, device : ActuatorDeviceAdapter, action : str ) -> None:
    self._deviceAdapter = device
    self._action = action
  
  def execute(self):
    self._deviceAdapter.action(self._action)

  def to_json(self) -> dict:
    return {
      "device_id": self._deviceAdapter.get_model().get_id(),
      "action": self._action
    }
    