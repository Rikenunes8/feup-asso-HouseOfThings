from src.model.rules.conditions.Condition import Condition
from src.controller.managers.DevicesManager import DevicesManager
from src.controller.observer.Publisher import Publisher
from src.controller.observer.subscribers.DeviceStateSubscriber import (
    DeviceStateSubscriber,
)
from src.controller.observer.DeviceConnectionSubscriber import (
    DeviceConnectionSubscriber,
)


class DeviceCondition(Condition, DeviceStateSubscriber, DeviceConnectionSubscriber):
    def __init__(self, device_id: str, data: dict) -> None:
        super().__init__("device")
        self._device_id = device_id
        self._comparator = data.get("comparator")
        self._attribute = data.get("attribute")
        self._state = data.get("state")
        self._active = True

    def configure(self, data: dict = None):
        device_manager: DevicesManager = data.get("device_manager")
        # Subscribe device manager to be notified when a new device
        # with the same id is added
        device_manager.subscribe(self._device_id, self)
        device = device_manager.get(self._device_id)
        # Subscribe device to be notified when its state changes
        device.subscribe(self)

    def clear(self):
        self._active = False

    def check(self) -> bool:
        return self._check

    def notified(self, data: dict) -> bool:
        if not self._active:
            return False
        current_state = data.get(self._attribute)

        if (
            (self._comparator == "==" and self._state != current_state)
            or (self._comparator == "<" and self._state < current_state)
            or (self._comparator == ">" and self._state > current_state)
        ):
            self._check = False
            return True
        if self._check:
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
        return {
            "kind": self._kind,
            "device_id": self._device_id,
            "comparator": self._comparator,
            "attribute": self._attribute,
            "state": self._state,
        }
