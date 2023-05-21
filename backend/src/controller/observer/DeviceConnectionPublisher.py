from src.controller.observer.DeviceConnectionSubscriber import DeviceConnectionSubscriber


class DeviceConnectionPublisher:
    def __init__(self):
        super().__init__()
        self._subscribers: dict[str, list[DeviceConnectionSubscriber]] = {}
        self._global_subscribers: list[DeviceConnectionSubscriber] = []

    def subscribe_all(self, subscriber: DeviceConnectionSubscriber):
        self._global_subscribers.append(subscriber)

    def unsubscribe_all(self, subscriber: DeviceConnectionSubscriber):
        self._global_subscribers.remove(subscriber)

    def subscribe(self, device_id: str, subscriber: DeviceConnectionSubscriber):
        if device_id not in self._subscribers:
            self._subscribers[device_id] = []
        self._subscribers[device_id].append(subscriber)

    def unsubscribe(self, device_id: str, subscriber: DeviceConnectionSubscriber):
        self._subscribers[device_id].remove(subscriber)

    def notify_connect(self, device_id: str, data: dict = None):
        subscribers = self._subscribers.get(device_id, [])
        for subscriber in self._global_subscribers:
            if not subscriber.on_device_connect(data):
                self.unsubscribe_all(subscriber)
        for subscriber in subscribers:
            if not subscriber.on_device_connect(data):
                self.unsubscribe(device_id, subscriber)

    def notify_disconnect(self, device_id: str, data: dict = None):
        subscribers = self._subscribers.get(device_id, [])
        for subscriber in self._global_subscribers:
            subscriber.on_device_disconnect(data)
        for subscriber in subscribers:
            subscriber.on_device_disconnect(data)
