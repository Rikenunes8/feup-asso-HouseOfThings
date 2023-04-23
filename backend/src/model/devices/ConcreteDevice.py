from src.database.DB import DB
from src.database.CollectionTypes import Collection
from src.model.devices.Device import Device
from src.controller.device_connectors.DeviceConnector import DeviceConnector
from src.controller.device_connectors.ActuatorDeviceConnector import ActuatorDeviceConnector


class ConcreteDevice(Device):
    NO_NAME = "Unamed"

    def get(self): return self

    def __init__(self, id: str, config: dict[str, object], connector: DeviceConnector) -> None:
        super().__init__(id)
        self._config: dict[str, object] = config
        self._connector: DeviceConnector = connector
        self._connected = False
        self.add()

    def add(self) -> None:
        DB().get(Collection.DEVICES).add({
            "uid": self._id,
            "category": self._config.get("category"),
            "subcategory": self._config.get("subcategory"),
            "protocol": self._config.get("protocol"),
            "name": self.NO_NAME,
            "divisions": [],
        })

    def rename(self, name: str) -> None:
        self.update({"name": name})

    def set_divisions(self, divisions: list) -> None:
        self.update({"divisions": divisions})
    
    def add_division(self, division: str) -> None:
        divisions = self.find()["divisions"]
        divisions.append(division)
        self.set_divisions(divisions)

    def remove_division(self, division: str) -> None:
        divisions = self.find()["divisions"]
        divisions.remove(division)
        self.set_divisions(divisions)

    def connect(self, connected: bool = False) -> bool:
        self._connector.set_connected(connected)
        self._connector.connect()
        self._connected = True
        return True
    
    def disconnect(self) -> bool:
        self._connector.disconnect()
        self._connected = False
        self.remove()
        return True

    def is_connected(self) -> bool:
        return self._connected

    def action(self, action: str, data: dict = None, updated_state: dict = None) -> bool:
        if not isinstance(self._connector, ActuatorDeviceConnector):
            return True
        if self._connector.action(action, data):
            if updated_state != None:
                self.update(updated_state)
            return True
        return False

    def to_json(self) -> dict:
        return self.find()


