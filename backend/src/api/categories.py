from flask import Blueprint
from src.database.DB import DB
from src.database.CollectionTypes import Collection
from src.api.CrudApi import BaseApi


class CategoriesApi(BaseApi):
    def __init__(self):
        super().__init__()
        self._bp = Blueprint('categories', __name__, url_prefix='/categories')

        self._bp.add_url_rule("/", methods=('GET',), view_func=self.all)

    def get_blueprint(self) -> Blueprint:
        return self._bp

    def all(self):
        def inner():
            return {'categories': DB().get(Collection.CATEGORIES).find_all()}
        return self.handle_request(inner)
