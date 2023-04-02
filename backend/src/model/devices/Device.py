from abc import ABC, abstractmethod
from src.database.DB import DB


class Device(ABC):
    NO_NAME = "Unamed"

    def __init__(self, id: int) -> None:
        super().__init__()
        self._id = id
        self._category = None

    def rename(self, name: str) -> None:
        self.update({"name": name})

    def set_divisions(self, divisions: list) -> None:
        self.update({"divisions": divisions})

    def getId(self) -> int:
        return self._id

    def add(self, state: dict) -> None:
        DB().add_device(self._id, {
            "category": self._category,
            "name": self.NO_NAME,
            "divisions": [],
            **state
        }
        )

    def update(self, state: dict) -> None:
        DB().update_device(self._id, state)

    def remove(self) -> None:
        DB().delete_device(self._id)

    def find(self) -> dict:
        return DB().find_device(self._id)

    @abstractmethod
    def to_json(self) -> dict:
        pass
