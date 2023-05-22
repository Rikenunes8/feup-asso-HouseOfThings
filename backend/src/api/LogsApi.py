from flask import Blueprint
from src.database.DB import DB
from src.database.CollectionTypes import Collection
from src.api.CrudApi import BaseApi


class LogsApi(BaseApi):
    def __init__(self):
        super().__init__()
        self._bp = Blueprint("logs", __name__, url_prefix="/logs")

        self._bp.add_url_rule("/", methods=("GET",), view_func=self.all)

    def get_api(self) -> Blueprint:
        return self._bp

    def all(self):
        def inner():
            logs = DB().get(Collection.LOGS).find_all(include=True)
            logs = [ {**log, '_id': None, 'id': str(log['_id'])} for log in logs]
            return {"logs": logs}

        return self.handle_request(inner)
