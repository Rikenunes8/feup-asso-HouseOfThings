from src.controller.adapter.DeviceAdapter import DeviceAdapter
from src.controller.adapter.LightMqttAdapter import LightMqttAdapter
from src.controller.adapter.LightBulbPiAdapter import LightBulbPiAdapter
from src.controller.adapter.ThermometerPiAdapter import ThermometerPiAdapter


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
    def fabricate(cid: str, uid: str, config: dict) -> list[DeviceAdapter] or DeviceAdapter or None:
        category = config.get("category")
        subcategory = config.get("subcategory")
        protocol = config.get("protocol")
        config = {'category': category, 'subcategory': subcategory, 'protocol': protocol}
        
        adapters = []
        if subcategory == "light bulb":
            if protocol == "virtual" or protocol == None:
                adapters.append(LightMqttAdapter(cid, uid, config))
            if protocol == "raspberry pi" or protocol == None:
                adapters.append(LightBulbPiAdapter(cid, uid, config))
        elif subcategory == "thermometer":
            if protocol == "raspberry pi" or protocol == None:
                adapters.append(ThermometerPiAdapter(cid, uid, config))

        if len(adapters) == 0:
            print(f"No device implementation for subcategory: {subcategory} and protocol: {protocol}")
            return None
        
        return adapters if (protocol == None) else adapters[0]
