import time

from src.controller.adapter.DeviceAdapter import DeviceAdapter
from src.model.devices.ThermostatDevice import ThermostatDevice
from src.controller.mqtt import connect_mqtt, disconnect_mqtt, publish, subscribe


class ThermostatPIAdapter(DeviceAdapter):

    MAX_TIME_TO_CONNECT = 5

    def __init__(self, cid: str, uid: str):
        super().__init__()
        self._client = None
        self._cid = cid
        self._uid = uid
        self._available = []

    def create_model(self) -> None:
        self._model = ThermostatDevice(self._uid)

    def get_model(self) -> ThermostatDevice:
        return self._model

    def on_connect(self, client, userdata, msg):
        if self._uid != msg.payload.decode():
            return
        print(f"Connected to device with id: {self._uid}")
        subscribe(client, f"{self._uid}-temperature", self.on_temperature)
        self.create_model()

    def on_available(self, client, userdata, msg):
        self._available.append(msg.payload.decode())

    def on_temperature(self, client, userdata, msg):
        self._model.set_temperature(float(msg.payload.decode()))

    def connect(self) -> bool:
        self._client = connect_mqtt()
        self._client.loop_start()

        subscribe(self._client, f"{self._cid}-connected", self.on_connect)
        publish(self._client, f"{self._uid}-connect", self._cid)
        print("Waiting for device to connect...")
        start = time.time()
        while self._model == None and time.time() - start < self.MAX_TIME_TO_CONNECT:
            pass
        if self._model == None:
            print("Device not connected")
            self.disconnect()
            return False
        print("Device connected")
        return True

    def disconnect(self) -> None:
        if (self._model != None):
            self._model.clear()
            publish(self._client, f"{self._uid}-disconnect", self._cid)
        disconnect_mqtt(self._client)
        self._client = None

    def start_discovery(self):
        self._client = connect_mqtt()
        self._client.loop_start()

        subscribe(self._client,
                  f"{self._cid}-thermostat-available", self.on_available)
        publish(self._client, "thermostat-available", self._cid)

    def finish_discovery(self):
        disconnect_mqtt(self._client)
        self._client = None
        aux = self._available
        self._available = []
        return aux
