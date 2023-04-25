from src.database.DB import DB
from src.database.CollectionTypes import Collection

class Division:
  def __init__(self, name: str, icon: str, devices: list[int]) -> None:
    self._id = None
    self._name = name
    self._icon = icon
    self._devices = devices
    self._id = self._create()
    DB().get(Collection.DIVISIONS).update(self._id, {"id": self._id})
  
  def get_id(self) -> str:
    return self._id

  def _create(self):
    return DB().get(Collection.DIVISIONS).add(self.to_json())
  
  def update(self, config: dict) -> None:
    for key, value in config.items():
        print(f"test ${key} ${value}")
        if key in ["name", "icon", "devices"]:
          setattr(self, "_" + key, value)
        print(f"test ${self._name}")
    DB().get(Collection.DIVISIONS).update(self._id, config)
  
  def add_device(self, device: str) -> None:
    self._devices.append(device)
    DB().get(Collection.DIVISIONS).update(self._id, {"devices": self._devices})
  
  def remove_device(self, device: str) -> None:
    self._devices.remove(device)
    DB().get(Collection.DIVISIONS).update(self._id, {"devices": self._devices})
  
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
