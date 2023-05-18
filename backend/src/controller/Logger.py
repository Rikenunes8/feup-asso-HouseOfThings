import time
from src.database.DB import DB
from src.database.CollectionTypes import Collection


class Logger:
    def __init__(self) -> None:
        pass
    
    def _log(self, level: str, message: str) -> None:
        DB().get(Collection.LOGS).add({
            "type": level, 
            "content": message, 
            "time": time.strftime("%Y-%m-%dT%H:%M:%S", time.localtime()),
        })
    
    def info(self, message: str) -> None:
        self._log("info", message)

    def warn(self, message: str) -> None:
        self._log("warn", message)

    def error(self, message: str) -> None:
        self._log("error", message)
