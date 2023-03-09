from controller.adapter.DeviceAdapter import DeviceAdapter
from model.devices.LightDevice import LightDevice
from controller.mqtt import connect_mqtt, disconnect_mqtt, publish, subscribe


class LightMqttAdapter(DeviceAdapter):

  def __init__(self, cid : str, uid : str):
    super().__init__()
    self._client = None
    self._cid = cid
    self._uid = uid

  def createModel(self) -> None:
    self._model = LightDevice(self._uid)

  def on_connect(self, client, userdata, msg):
    if self._uid != msg.payload.decode():
      return
    print(f"Connected to device with id: {self._uid}")
    self.createModel()


  def connect(self):
    self._client = connect_mqtt()
    self._client.loop_start()

    subscribe(self._client, f"{self._cid}-connected", self.on_connect)
    publish(self._client, f"{self._uid}-connect", self._cid)
    print("Waiting for device to connect...")

  def disconnect(self) -> None:
    if (self._model != None):
      self._model.clear()
      publish(self._client, f"{self._uid}-disconnect", self._cid)
    disconnect_mqtt(self._client)
    self._client = None

  def turnOn(self) -> None:
    publish(self._client, f"{self._uid}-turnOn", self._cid)
    self._model.turnOn()
  
  def turnOff(self) -> None:
    publish(self._client, f"{self._uid}-turnOff", self._cid)
    self._model.turnOff()