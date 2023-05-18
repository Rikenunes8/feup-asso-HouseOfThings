from abc import ABC, abstractmethod


class DeviceConnectionSubscriber(ABC):
    def __init__(self) -> None:
        super().__init__()

    @abstractmethod
    def on_device_connect(self, data: dict = None) -> bool:
        """Returns whether the subscriber should continue to be notified."""

    # Not an abstract method because it's implementation is optional
    def on_device_disconnect(self, data: dict = None):
        pass
