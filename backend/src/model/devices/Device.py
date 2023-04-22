from abc import ABC, abstractmethod
from src.database.DB import DB
from src.database.CollectionTypes import Collection


class Device(ABC):
    NO_NAME = "Unamed"

    def __init__(self, id: int) -> None:
        super().__init__()
        self._id = id
        self._config : dict = None

    def rename(self, name: str) -> None:
        self.update({"name": name})

    def set_divisions(self, divisions: list) -> None:
        self.update({"divisions": divisions})
    
    def add_division(self, division: str) -> None:
        divisions = self.find()["divisions"]
        divisions.append(division)
        self.set_divisions(divisions)

    def remove_division(self, division: str) -> None:
        divisions = self.find()["divisions"]
        divisions.remove(division)
        self.set_divisions(divisions)

    def get_id(self) -> int:
        return self._id

    def add(self, state: dict) -> None:
        DB().get(Collection.DEVICES).add({
            "uid": self._id,
            "category": self._config.get("category"),
            "subcategory": self._config.get("subcategory"),
            "protocol": self._config.get("protocol"),
            "name": self.NO_NAME,
            "divisions": [],
            **state
        }
        )

    def update(self, state: dict) -> None:
        DB().get(Collection.DEVICES).update(self._id, state)

    def remove(self) -> None:
        DB().get(Collection.DEVICES).delete(self._id)

    def find(self) -> dict:
        return DB().get(Collection.DEVICES).find(self._id)

    @abstractmethod
    def to_json(self) -> dict:
        pass
