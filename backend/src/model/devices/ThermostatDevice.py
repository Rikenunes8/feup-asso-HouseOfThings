from src.model.devices.Device import Device


class ThermostatDevice(Device):
    def __init__(self, id: int, temperature: float = 0) -> None:
        super().__init__(id)
        self._group = "thermostat"
        super().add(self.state(temperature))

    def state(self, temperature: float) -> dict:
        return {"temperature": temperature}

    def setTemperature(self, temperature: float) -> None:
        super().update(self.state(temperature))

    def getTemperature(self) -> float:
        return super().find()["temperature"]

    def clear(self) -> None:
        super().remove()

    def toJson(self) -> dict:
        return super().find()
