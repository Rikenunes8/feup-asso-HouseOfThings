from abc import ABC, abstractmethod
from src.database.DB import DB
from src.database.CollectionTypes import Collection

class IDevice(ABC):
    def __init__(self, id: str) -> None:
        self._id: str = id

    def get_id(self) -> str:
        return self._id
        

    def update(self, state: dict) -> None:
        DB().get(Collection.DEVICES).update(self._id, state)

    def remove(self) -> None:
        DB().get(Collection.DEVICES).delete(self._id)

    def find(self) -> dict:
        print("Finding with id: " + self._id)
        return DB().get(Collection.DEVICES).find(self._id)


    @abstractmethod
    def get(self):
        pass

    @abstractmethod
    def action(self, action: str, data: dict = None, updated_state = None) -> bool:
        pass

    @abstractmethod
    def to_json(self) -> dict:
        pass
    
    @abstractmethod
    def add(self, state: dict) -> None:
        pass
