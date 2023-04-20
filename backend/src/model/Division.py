from src.database.DB import DB

class Division:
  def __init__(self, name: str, icon: str, devices: list[int]) -> None:
    self._id = None
    self._name = name
    self._icon = icon
    self._devices = devices
    self._id = self._create()
    DB().update_division(self._id, {"id": self._id})
  
  def get_id(self) -> str:
    return self._id

  def _create(self):
    return DB().add_division(self.to_json())
  
  def rename(self, name: str) -> None:
    self._name = name
    DB().update_division(self._id, {"name": name})
  
  def change_icon(self, icon: str) -> None:
    self._icon = icon
    DB().update_division(self._id, {"icon": icon})
  
  def add_device(self, device: str) -> None:
    self._devices.append(device)
    DB().update_division(self._id, {"devices": self._devices})
  
  def remove_device(self, device: str) -> None:
    self._devices.remove(device)
    DB().update_division(self._id, {"devices": self._devices})
  
  def delete(self):
    DB().delete_division(self._id)

  def to_json(self) -> dict:
    return {
      "id": self._id,
      "name": self._name,
      "icon": self._icon,
      "devices": self._devices,
      "numDevices": len(self._devices),
    }
