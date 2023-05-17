from abc import ABC, abstractmethod

class Subscriber(ABC):
    def __init__(self):
        super().__init__()

    @abstractmethod
    def notified(self, data: dict = None):
        pass
