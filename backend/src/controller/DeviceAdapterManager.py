from src.controller.adapter.DeviceAdapter import DeviceAdapter
from src.controller.adapter.LightMqttAdapter import LightMqttAdapter
from src.controller.adapter.ThermostatPIAdapter import ThermostatPIAdapter


class DeviceAdapterManager:
    def __init__(self) -> None:
        self._devices = {}

    def add(self, id: str, adapter: DeviceAdapter) -> None:
        self._devices[id] = adapter

    def remove(self, id) -> None:
        if self._devices.get(id) != None:
            del self._devices[id]

    def get_device(self, id) -> DeviceAdapter:
        return self._devices.get(id)

    def get_device_ids(self) -> list:
        return list(self._devices.keys())

    @staticmethod
    def factory(cid: str, uid: str, config: dict) -> DeviceAdapter:
        group = config.get("group")
        if group == "light":
            return LightMqttAdapter(cid, uid)
        elif group == "thermostat":
            return ThermostatPIAdapter(cid, uid)
        else:
            print("No device for group: " + group)
        return None
