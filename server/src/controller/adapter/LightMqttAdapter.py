from controller.adapter.DeviceAdapter import DeviceAdapter
from model.devices.LightDevice import LightDevice
from controller.mqtt import connect_mqtt, disconnect_mqtt, publish, subscribe


class LightMqttAdapter(DeviceAdapter):

  def __init__(self):
    super().__init__()
    self._client = None

  def connect(self, id) -> bool:
    self._client = connect_mqtt()
    self._client.loop_start()
    publish(self._client, id, "connect please")
    self._model = LightDevice(id)
    return True
    

  def disconnect(self) -> None:
    disconnect_mqtt(self._client)
    self._client = None