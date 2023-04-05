from abc import ABC, abstractmethod


class Condition(ABC):
  def __init__(self) -> None:
    super().__init__()
  
  @abstractmethod
  def to_json(self) -> dict:
    pass