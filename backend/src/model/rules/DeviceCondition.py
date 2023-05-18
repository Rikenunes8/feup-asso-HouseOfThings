from src.model.rules.Condition import Condition
from src.controller.managers.DevicesManager import DevicesManager
from src.controller.observer.Publisher import Publisher
from src.controller.observer.Subscriber import Subscriber
from src.controller.observer.DeviceConnectionSubscriber import DeviceConnectionSubscriber


class DeviceCondition(Condition, Subscriber, DeviceConnectionSubscriber):
    def __init__(self, device_id: str, state: dict) -> None:
        super().__init__()
        self._device_id = device_id
        self._state = state
        self._active = True

    def configure(self, data: dict = None):
        device_manager: DevicesManager = data.get("device_manager")
        device_manager.subscribe(
            self._device_id, self
        )  # Subscribe device manager to be notified when a new device with the same id is added
        device = device_manager.get(self._device_id)
        device.subscribe(self)  # Subscribe device to be notified when its state changes

    def clear(self):
        self._active = False

    def check(self) -> bool:
        return self._check

    def notified(self, data: dict) -> bool:
        if not self._active:
            return False
        for key in self._state:
            if self._state[key] != data.get(key):
                self._check = False
                return True
        self.notify()
        return True

    def on_device_connect(self, data: dict = None):
        if not self._active:
            return False
        device: Publisher = data.get("device")
        device.subscribe(self)
        return True

    def to_json(self) -> dict:
        return {"kind": "device", "device_id": self._device_id, "state": self._state}
