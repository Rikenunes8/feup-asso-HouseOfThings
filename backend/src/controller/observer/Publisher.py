from abc import ABC
from src.controller.observer.Subscriber import Subscriber

class Publisher(ABC):
    def __init__(self):
        super().__init__()
        self._subscribers = []

    def subscribe(self, subscriber: Subscriber):
        self._subscribers.append(subscriber)

    def unsubscribe(self, subscriber: Subscriber):
        self._subscribers.remove(subscriber)

    def notify(self, data: dict = None):
        for subscriber in self._subscribers:
            subscriber.notify(data)