from model.devices.Device import Device
from controller.adapter.DeviceAdapter import DeviceAdapter

# TODO error handling
class DeviceManager:
  def __init__(self) -> None:
    self._devices = {}

  def add(self, id : str, adapter: DeviceAdapter) -> None:
    self._devices[id] = adapter

  def remove(self, id) -> None:
    del self._devices[id]

  def getDevice(self, id) -> DeviceAdapter:
    return self._devices[id]

  def getDeviceIds(self) -> list:
    return list(self._devices.keys())