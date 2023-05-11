from src.controller.observer.Publisher import Publisher

class DeviceStateNotifier(Publisher):
    def __init__(self) -> None:
        super().__init__()

    def notify(self, data: dict = None):
        for subscriber in self._subscribers:
            if not subscriber.notified(data):
                self.unsubscribe(subscriber)
