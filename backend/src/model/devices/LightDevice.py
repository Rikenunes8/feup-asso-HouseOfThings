from model.devices.Device import Device
from database.DB import DB

class LightDevice(Device):

  def __init__(self, id : int, on : bool = False) -> None:
    super().__init__(id)
    self._group = "light"
    DB().addDevice(self._id, self._group, self.state(on))
  
  def state(self, on : bool) -> dict:
    return {
      'on': on,
    }

  def turnOn(self) -> None:
    DB().updateDevice(self._id, self.state(True))
  
  def turnOff(self) -> None:
    DB().updateDevice(self._id, self.state(False))

  def isLightOn(self) -> bool:
    return DB().findDevice(self._id)['on']
  
  def clear(self) -> None:
    DB().deleteDevice(self._id)
  
  def toJson(self) -> dict:
    return DB().findDevice(self._id)