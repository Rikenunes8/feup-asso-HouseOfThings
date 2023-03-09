from abc import ABC, abstractmethod
from model.devices.Device import Device

class DeviceAdapter(ABC):  
  def __init__(self):
    super().__init__()
    self._model = None

  @abstractmethod
  def createModel(self) -> None:
    pass

  def getModel(self) -> Device:
    return self._model

  @abstractmethod
  def connect(self) -> bool:
    pass

  @abstractmethod
  def disconnect(self) -> None:
    pass
