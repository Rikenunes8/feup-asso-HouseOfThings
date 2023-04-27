from abc import abstractmethod
from src.controller.managers.Manager import Manager

class CrudManager(Manager):
    def __init__(self, cid) -> None:
        super().__init__(cid)
        
    @abstractmethod
    def all(self) -> list:
        pass

    @abstractmethod
    def get(self, id: str):
        pass

    @abstractmethod
    def create(self, data, id: str = None):
        pass

    @abstractmethod
    def update(self, id: str, data):
        pass

    @abstractmethod
    def delete(self, id: str):
        pass
