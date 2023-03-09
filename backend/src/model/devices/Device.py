from abc import ABC, abstractmethod

class Device(ABC):  
  def __init__(self, id : int) -> None:
    super().__init__()
    self._id = id
    self._group = None

  def getId(self) -> int:
    return self._id
  
  @abstractmethod
  def toJson(self) -> dict:
    pass
  
