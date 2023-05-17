from src.controller.observer.NewDeviceSubscriber import NewDeviceSubscriber

class NewDevicePublisher:
    def __init__(self):
        super().__init__()
        self._subscribers: dict[str, list[NewDeviceSubscriber]] = {}

    def subscribe(self, device_id: str, subscriber: NewDeviceSubscriber):
        if device_id not in self._subscribers:
            self._subscribers[device_id] = []
        self._subscribers[device_id].append(subscriber)

    def unsubscribe(self, device_id: str, subscriber: NewDeviceSubscriber):
        self._subscribers[device_id].remove(subscriber)

    def notify(self, device_id: str, data: dict = None):
        subscribers = self._subscribers.get(device_id, [])
        for subscriber in subscribers:
            if not subscriber.resurrected(data):
                self.unsubscribe(device_id, subscriber)
