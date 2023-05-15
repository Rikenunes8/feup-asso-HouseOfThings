import time

from src.controller.device_connectors.DeviceConnector import DeviceConnector
from src.controller.mqtt import connect_mqtt, disconnect_mqtt, publish, subscribe


class ThermometerVirtualConnector(DeviceConnector):

    MAX_TIME_TO_CONNECT = 5

    def __init__(self, cid: str, uid: str, config: dict):
        super().__init__()
        self.set_protocol('virtual')
        self.set_capabilities(['temperature'])
        self._client = None
        self._cid = cid
        self._uid = uid
        self._config = {'protocol': self._protocol, **config}
        self._available = []


    def on_connect(self, client, userdata, msg):
        if self._uid != msg.payload.decode():
            return
        print(f"Connected to device with id: {self._uid}")
        self._connected = True

    def connect(self) -> bool:
        self._client = connect_mqtt()
        self._client.loop_start()

        subscribe(self._client, f"{self._cid}-connected", self.on_connect)
        publish(self._client, f"{self._uid}-connect", self._cid)
        print("Waiting for device to connect...")
        start = time.time()
        while not self._connected and time.time() - start < self.MAX_TIME_TO_CONNECT:
            pass
        if not self._connected:
            print("Device not connected")
            self.disconnect()
            return False
        subscribe(self._client, f"{self._uid}-temperature", self.on_temperature)
        print("Device connected")
        return True

    def disconnect(self) -> None:
        publish(self._client, f"{self._uid}-disconnect", self._cid)
        disconnect_mqtt(self._client)
        self._client = None
        self._connected = False


    def on_temperature(self, client, userdata, msg):
        temperature = float(msg.payload.decode())
        self.notify({"temperature": temperature})


    def on_available(self, client, userdata, msg):
        self._available.append(msg.payload.decode())

    def start_discovery(self):
        self._client = connect_mqtt()
        self._client.loop_start()

        subscribe(self._client, f"{self._cid}-thermometer-available-virtual", self.on_available)
        publish(self._client, "thermometer-available-virtual", self._cid)

    def finish_discovery(self) -> list[str]:
        disconnect_mqtt(self._client)
        self._client = None
        aux = self._available
        self._available = []
        return aux
