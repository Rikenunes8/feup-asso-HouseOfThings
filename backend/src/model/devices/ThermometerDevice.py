from src.model.devices.Device import Device


class ThermometerDevice(Device):
    def __init__(self, id: int, temperature: float = 0) -> None:
        super().__init__(id)
        self._category = "sensor"
        self._subcategory = "thermometer (raspPI)"
        super().add(self.state(temperature))

    def state(self, temperature: float) -> dict:
        return {"temperature": temperature}

    def set_temperature(self, temperature: float) -> None:
        super().update(self.state(temperature))

    def get_temperature(self) -> float:
        return super().find()["temperature"]

    def clear(self) -> None:
        super().remove()

    def to_json(self) -> dict:
        return super().find()
