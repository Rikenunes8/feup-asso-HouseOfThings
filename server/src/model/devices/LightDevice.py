from model.devices.Device import Device

class LightDevice(Device):

  def __init__(self, id : int, isTurnedOn : bool = False) -> None:
    super().__init__(id)
    self._turnedOn = isTurnedOn

  def turnOn(self) -> None:
    self._turnedOn = True
  
  def turnOff(self) -> None:
    self._turnedOn = False

  def isLightOn(self) -> bool:
    return self._turnedOn

  def __str__(self) -> str:
    return "Light: {} -> State: {}".format(self._id, "On" if self._turnedOn else "Off")
  
  def toJson(self) -> dict:
    return {
      "id": self._id,
      "state": self._turnedOn
    }