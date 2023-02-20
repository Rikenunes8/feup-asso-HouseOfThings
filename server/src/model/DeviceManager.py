from model.devices.Device import Device

class DeviceManager:
  def __init__(self) -> None:
    self._devices = {}

  def addDevice(self, port : int, socket, device : Device) -> None:
    self._devices[port] = (socket, device)

  def removeDevice(self, port) -> None:
    del self._devices[port]

  def getSocket(self, port):
    return self._devices[port][0]

  def getDevice(self, port) -> Device:
    return self._devices[port][1]

  def getPorts(self) -> list:
    return list(self._devices.keys())