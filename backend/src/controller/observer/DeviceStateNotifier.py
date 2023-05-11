from src.controller.observer.Publisher import Publisher

class DeviceStateNotifier(Publisher):
    def __init__(self) -> None:
        super().__init__()