from model.DeviceManager import DeviceManager
from model.devices.LightDevice import LightDevice
from controller.adapter.LightSocketAdapter import LightSocketAdapter

class HoT():
  def __new__(cls):
    if not hasattr(cls, 'instance'):
      cls.instance = super(HoT, cls).__new__(cls)
    return cls.instance

  def __init__(self):
    self._devManager = DeviceManager()


  def devices(self) -> list:
    ids = self._devManager.getDeviceIds()
    return [self._devManager.getDevice(id).getModel() for id in ids]

  def connect(self, config, id) -> bool:
    if type(config) != tuple or len(config) != 2:
      return False
    (deviceType, protocol) = config

    if deviceType == "light":
      if protocol == "socket":
        newDevice = LightSocketAdapter()
      else:
        return False
    else:
      return False

    if newDevice.connect(id):
      self._devManager.add(id, newDevice)
      return True
    return False

  def disconnect(self, id) -> bool:
    adapter = self._devManager.getDevice(id)
    adapter.disconnect()
    adapter = self._devManager.remove(id)
    return True
  
  
