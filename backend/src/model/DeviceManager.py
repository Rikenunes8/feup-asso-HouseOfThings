from src.model.devices.Device import Device
from src.controller.adapter.DeviceAdapter import DeviceAdapter

class DeviceManager:
  def __init__(self) -> None:
    self._devices = {}

  def add(self, id : str, adapter: DeviceAdapter) -> None:
    self._devices[id] = adapter

  def remove(self, id) -> None:
    if self._devices.get(id) != None:
      del self._devices[id]

  def getDevice(self, id) -> DeviceAdapter:
    return self._devices.get(id)

  def getDeviceIds(self) -> list:
    return list(self._devices.keys())