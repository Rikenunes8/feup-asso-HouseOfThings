from abc import ABC, abstractmethod
from src.database.DB import DB
from src.database.CollectionTypes import Collection
from src.controller.observer.Publisher import Publisher
from src.controller.observer.Subscriber import Subscriber
from src.controller.observer.DeviceStateNotifier import DeviceStateNotifier


class Device(Publisher, ABC):
    def __init__(self, id: str, notifier: DeviceStateNotifier) -> None:
        self._id: str = id
        self._notifier: DeviceStateNotifier = notifier

    def get_id(self) -> str:
        return self._id

    def update(self, state: dict) -> None:
        DB().get(Collection.DEVICES).update(self._id, state)

    def remove(self) -> None:
        DB().get(Collection.DEVICES).delete(self._id)

    def find(self) -> dict:
        return DB().get(Collection.DEVICES).find(self._id)

    @abstractmethod
    def get(self):
        """
        @return: ConcreteDevice
        """
        pass

    @abstractmethod
    def action(self, action: str, data: dict = None, updated_state=None) -> bool:
        pass

    @abstractmethod
    def to_json(self) -> dict:
        pass

    def subscribe(self, subscriber: Subscriber):
        self._notifier.subscribe(subscriber)
        self.notify(self.find())

    def unsubscribe(self, subscriber: Subscriber):
        self._notifier.unsubscribe(subscriber)
        self.notify(self.find())

    def notify(self, data: dict = None):
        self._notifier.notify(data)
