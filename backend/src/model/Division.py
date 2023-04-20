from src.database.DB import DB

class Division:
  def __init__(self, name: str, icon: str, num_devices: int) -> None:
    self._id = None
    self._name = name
    self._icon = icon
    self._numDevices = num_devices
    self._id = self._create()
    DB().update_division(self._id, {"id": self._id})
  
  def get_id(self) -> str:
    return self._id

  def _create(self):
    return DB().add_division(self.to_json())
  
  def update(self, name: str, icon: str, num_devices: int):
    self._name = name
    self._icon = icon
    self._numDevices = num_devices
    DB().update_division(self._id, self.to_json())
  
  def delete(self):
    DB().delete_division(self._id)

  def to_json(self) -> dict:
    return {
      "id": self._id,
      "name": self._name,
      "icon": self._icon,
      "numDevices": self._numDevices,
    }
