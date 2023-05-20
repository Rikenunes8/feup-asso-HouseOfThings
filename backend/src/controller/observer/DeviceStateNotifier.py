from src.controller.observer.Publisher import Publisher

class DeviceStateNotifier(Publisher):
    def __init__(self, announcer) -> None:
        super().__init__()
        self._announcer = announcer

    def notify(self, data: dict = None):
        for subscriber in self._subscribers:
            if not subscriber.notified(data):
                self.unsubscribe(subscriber)
    
    def announce(self, data: dict):
        self._announcer.announce([data], "update")

