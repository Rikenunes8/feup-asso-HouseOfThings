from src.model.rules.Condition import Condition
from src.controller.managers.DevicesManager import DevicesManager
from src.controller.observer.Subscriber import Subscriber

class DeviceCondition(Condition, Subscriber):
  def __init__(self, device_id: str, state: dict) -> None:
    super().__init__()
    self._device_id = device_id
    self._state = state
  
  def configure(self, data: dict = None):
    device_manager: DevicesManager = data.get('device_manager')
    device = device_manager.get(self._device_id)
    device.subscribe(self)

  def check(self) -> bool:
    return self._check

  def notified(self, data: dict):
    for key in self._state:
      if self._state[key] != data.get(key): 
        self._check = False
        return
    self.notify()

  def to_json(self) -> dict:
    return {
      "kind": "device",
      "device_id": self._device_id,
      "state": self._state
    }