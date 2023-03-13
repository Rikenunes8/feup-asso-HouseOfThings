import time

from src.controller.adapter.DeviceAdapter import DeviceAdapter
from src.controller.adapter.LightMqttAdapter import LightMqttAdapter
from src.model.DeviceManager import DeviceManager
from src.database.DB import DB
from src.controller.mqtt import connect_mqtt, disconnect_mqtt, publish, subscribe


class HoTMeta(type):
  _instances = {}
  def __call__(cls, *args, **kwargs):
    if cls not in cls._instances:
      instance = super().__call__(*args, **kwargs)
      cls._instances[cls] = instance
    return cls._instances[cls]

class HoT(metaclass=HoTMeta):
  def __init__(self):
    print("HoT init")
    self._devManager = DeviceManager()
    self._cid = "HoT" # TODO: set this to something better
    self._loadDevices()


  def _loadDevices(self):
    devices = DB().findAllDevices()
    for device in devices:
      self.connect(device['uid'], device)
      self._devManager.getDevice(device['uid']).createModel()

  def _createAdapter(self, uid : str, config : dict) -> DeviceAdapter:
    group = config.get("group")
    if group == "light":
      return LightMqttAdapter(self._cid, uid)
    else:
      print("No device for group: " + group)
    return None


  def devices(self) -> list:
    ids = self._devManager.getDeviceIds()
    return [self._devManager.getDevice(id).getModel() for id in ids]

  def connect(self, uid : str, config : dict) -> str:
    newDevice = self._createAdapter(uid, config)
    if newDevice == None: return "No device for group: " + config.get("group")
    success = newDevice.connect()
    if not success: return "Failed to connect to device"
    name = config.get("name")
    divisions = config.get("divisions")
    if name != None: newDevice.getModel().rename(name)
    if divisions != None: newDevice.getModel().setDivisions(divisions)
    self._devManager.add(uid, newDevice)


  def disconnect(self, uid : str):
    adapter = self._devManager.getDevice(uid)
    adapter.disconnect()
    self._devManager.remove(uid)

  def action(self, uid : str, rules : dict):
    adapter : DeviceAdapter = self._devManager.getDevice(uid)
    # TODO send rules to adapter to perform action instead of this
    if rules["action"] == "turnOn": adapter.turnOn()
    elif rules["action"] == "turnOff": adapter.turnOff()

  def rename(self, uid : str, config : dict):
    name = config.get("name")
    if name == None: return "No name provided"
    adapter = self._devManager.getDevice(uid)
    if adapter == None: return "No device with that uid"
    adapter.getModel().rename(name)

  def categories(self):
    return DB().findAllCategories()

  def available(self, config : dict):
    adapter = self._createAdapter(None, config)
    if adapter == None: return

    adapter.startDiscovery()
    start = time.time()
    while time.time() - start < 4:
      pass
    devicesFound = adapter.finishDiscovery()
  
    return devicesFound
