from model.DeviceManager import DeviceManager
from controller.Hub import Hub
from model.devices.GeneralLampDevice import GeneralLampDevice

class HoT():
  def __new__(cls):
    if not hasattr(cls, 'instance'):
      cls.instance = super(HoT, cls).__new__(cls)
    return cls.instance

  def __init__(self):
    self.hub = Hub()
    self.devManager = DeviceManager()


  def getConnectedDevices(self) -> list:
    ports = self.devManager.getPorts()
    return [self.devManager.getDevice(port) for port in ports]

  def connect(self, port) -> bool:
    socket = self.hub.connect(port)
    if socket != None:
      newDevice = GeneralLampDevice(port, False)
      self.devManager.addDevice(port, socket, newDevice)
      return True
    else:
      return False

  def disconnect(self, port) -> bool:
    socket = self.devManager.getSocket(port)
    if socket == None: return False
    self.hub.disconnect(socket)
    self.devManager.removeDevice(port)
    return True
  
  
