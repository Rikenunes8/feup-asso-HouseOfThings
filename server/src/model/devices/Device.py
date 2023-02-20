from abc import ABC

class Device(ABC):  
  def __init__(self, id : int) -> None:
    super().__init__()
    self._id = id

  def getId(self) -> int:
    return self._id
  
