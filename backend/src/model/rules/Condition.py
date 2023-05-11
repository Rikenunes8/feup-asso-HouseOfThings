from abc import ABC, abstractmethod
from src.controller.observer.Subscriber import Subscriber


class Condition(ABC):
  def __init__(self) -> None:
    super().__init__()

  # Template Method
  def initialize(self, subscriber: Subscriber):
    self._subscriber = subscriber
    self.configure()

  def notify(self):
    self._subscriber.notified()

  @abstractmethod
  def configure(self, data: dict = None):
    pass
  
  @abstractmethod
  def to_json(self) -> dict:
    pass