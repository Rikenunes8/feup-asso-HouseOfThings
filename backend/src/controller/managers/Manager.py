from abc import ABC


class Manager(ABC):
    def __init__(self, cid) -> None:
        super().__init__()
        self._cid = cid
