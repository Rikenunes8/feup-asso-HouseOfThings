from src.database.DB import DB
from src.database.CollectionTypes import Collection


class Division:
    def __init__(
        self, name: str, icon: str, devices: list[int], id: str = None
    ) -> None:
        self._id = None
        self._name = name
        self._icon = icon
        self._devices = devices

        if id != None:
            self._id = id
        else:
            self._id = self._create()
            DB().get(Collection.DIVISIONS).update(self._id, {"id": self._id})

    def get_id(self) -> str:
        return self._id

    def get_name(self) -> str:
        return self._name

    def _create(self):
        return DB().get(Collection.DIVISIONS).add(self.to_json())

    def update(self, config: dict) -> None:
        for key, value in config.items():
            if key in ["name", "icon", "devices"]:
                setattr(self, "_" + key, value)
        DB().get(Collection.DIVISIONS).update(self._id, config)

    def add_device(self, device: str) -> None:
        if device not in self._devices:
            self._devices.append(device)
        DB().get(Collection.DIVISIONS).update(self._id, {"devices": self._devices})

    def remove_device(self, device: str) -> None:
        if device in self._devices:
            self._devices.remove(device)
        DB().get(Collection.DIVISIONS).update(self._id, {"devices": self._devices})

    def get_devices(self) -> list[str]:
        return self._devices

    def delete(self):
        DB().get(Collection.DIVISIONS).delete(self._id)

    def to_json(self) -> dict:
        return {
            "id": self._id,
            "name": self._name,
            "icon": self._icon,
            "devices": self._devices,
            "numDevices": len(self._devices),
        }
