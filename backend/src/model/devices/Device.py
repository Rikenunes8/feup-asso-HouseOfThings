from abc import ABC, abstractmethod
from src.database.DB import DB


class Device(ABC):
    NO_NAME = "Unamed"

    def __init__(self, id: int) -> None:
        super().__init__()
        self._id = id
        self._group = None

    def rename(self, name: str) -> None:
        self.update({"name": name})

    def setDivisions(self, divisions: list) -> None:
        self.update({"divisions": divisions})

    def getId(self) -> int:
        return self._id

    def add(self, state: dict) -> None:
        DB().addDevice(self._id, {
            "group": self._group,
            "name": self.NO_NAME,
            "divisions": [],
            **state
        }
        )

    def update(self, state: dict) -> None:
        DB().updateDevice(self._id, state)

    def remove(self) -> None:
        DB().deleteDevice(self._id)

    def find(self) -> dict:
        return DB().findDevice(self._id)

    @abstractmethod
    def toJson(self) -> dict:
        pass
