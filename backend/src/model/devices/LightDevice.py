from src.model.devices.Device import Device


class LightDevice(Device):

    def __init__(self, id: int, on: bool = False) -> None:
        super().__init__(id)
        self._group = "light"
        super().add(self.state(on))

    def state(self, on: bool) -> dict:
        return {'on': on}

    def turn_on(self) -> None:
        super().update(self.state(True))

    def turn_off(self) -> None:
        super().update(self.state(False))

    def is_light_on(self) -> bool:
        return super().find()['on']

    def clear(self) -> None:
        super().remove()

    def to_json(self) -> dict:
        return super().find()
