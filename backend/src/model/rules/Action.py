from src.controller.managers.DevicesManager import DevicesManager

class Action:
    def __init__(self, device_id : str, action : str ) -> None:
        self._device_id = device_id
        self._action = action
    
    def execute(self, devicesManager: DevicesManager):
      device = devicesManager.get_device(self._device_id)
      device.action(self._action)

    def to_json(self) -> dict:
        return {"device_id": self._device_id, "action": self._action}
