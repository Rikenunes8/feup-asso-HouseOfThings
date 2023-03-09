from controller.adapter.DeviceAdapter import DeviceAdapter
from model.DeviceManager import DeviceManager
from controller.adapter.LightMqttAdapter import LightMqttAdapter

class HoT():
  def __new__(cls):
    if not hasattr(cls, 'instance'):
      cls.instance = super(HoT, cls).__new__(cls)
    return cls.instance

  def __init__(self):
    self._devManager = DeviceManager()
    self._cid = "HoT" # TODO: set this to something better

  def _createAdapter(self, config) -> DeviceAdapter:
    group = config.get("group")

    if group == "light":
      return LightMqttAdapter(self._cid)
    else:
      print("No device for group: " + group)
    return None


  def devices(self) -> list:
    ids = self._devManager.getDeviceIds()
    return [self._devManager.getDevice(id).getModel() for id in ids]

  def connect(self, id, config):
    newDevice = self._createAdapter(config)
    if newDevice == None: return
    newDevice.connect(id)
    self._devManager.add(id, newDevice) # TODO add device after it has connected

  def action(self, id, rules):
    adapter : DeviceAdapter = self._devManager.getDevice(id)
    # TODO send rules to adapter to perform action instead of this
    if rules["action"] == "turnOn": adapter.turnOn()
    elif rules["action"] == "turnOff": adapter.turnOff()

  def disconnect(self, id):
    adapter = self._devManager.getDevice(id)
    adapter.disconnect()
    self._devManager.remove(id)
