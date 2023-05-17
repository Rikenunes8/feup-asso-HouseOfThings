from abc import ABC, abstractmethod

class NewDeviceSubscriber(ABC):
    def __init__(self) -> None:
        super().__init__()
    
    @abstractmethod
    def resurrected(self, data: dict = None):
        pass
