from abc import ABC, abstractmethod
from src.controller.observer.Subscriber import Subscriber


class Condition(ABC):
    def __init__(self, kind) -> None:
        super().__init__()
        self._kind = kind
        self._check = False

    def initialize(self, subscriber: Subscriber, data: dict = None):
        self._subscriber = subscriber
        self.configure(data)

    def notify(self):
        self._check = True
        self._subscriber.notified()

    def clear(self):
        pass

    @abstractmethod
    def check(self) -> bool:
        pass

    @abstractmethod
    def configure(self, data: dict = None):
        pass

    @abstractmethod
    def to_json(self) -> dict:
        pass
