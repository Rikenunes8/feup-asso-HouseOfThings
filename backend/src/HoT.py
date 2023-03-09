from controller.adapter.DeviceAdapter import DeviceAdapter
from model.DeviceManager import DeviceManager
from controller.adapter.LightMqttAdapter import LightMqttAdapter
from database.DB import DB

class HoT():
  def __new__(cls):
    if not hasattr(cls, 'instance'):
      cls.instance = super(HoT, cls).__new__(cls)
    return cls.instance

  def __init__(self):
    self._devManager = DeviceManager()
    self._cid = "HoT" # TODO: set this to something better
    self._loadDevices()


  def _loadDevices(self):
    devices = DB().findAllDevices()
    for device in devices:
      adapter : DeviceAdapter = self._createAdapter(device['uid'], device)
      if adapter == None: continue
      adapter.createModel()
      self._devManager.add(device['uid'], adapter)

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

  def connect(self, uid, config):
    newDevice = self._createAdapter(uid, config)
    if newDevice == None: return
    newDevice.connect()
    self._devManager.add(uid, newDevice) # TODO add device after it has connected

  def action(self, uid, rules):
    adapter : DeviceAdapter = self._devManager.getDevice(uid)
    # TODO send rules to adapter to perform action instead of this
    if rules["action"] == "turnOn": adapter.turnOn()
    elif rules["action"] == "turnOff": adapter.turnOff()

  def disconnect(self, uid):
    adapter = self._devManager.getDevice(uid)
    adapter.disconnect()
    self._devManager.remove(uid)
