from flask import Blueprint
from src.HoT import HoT
from src.controller.managers.RulesManager import RulesManager
from src.api.CrudApi import CrudApi
from datetime import datetime
from src.api.ApiException import ApiException


class RulesApi(CrudApi):
    def __init__(self):
        super().__init__()
        self._bp = Blueprint("rules", __name__, url_prefix="/rules")

        self._bp.add_url_rule("/", methods=("GET",), view_func=self.all)
        self._bp.add_url_rule("/", methods=("POST",), view_func=self.create)
        self._bp.add_url_rule("/<id>/", methods=("DELETE",), view_func=self.delete)
        self._bp.add_url_rule("/<id>/", methods=("POST",), view_func=self.update)
        self._bp.add_url_rule(
            "/<id>/execute", methods=("POST",), view_func=self.execute
        )

    def get_blueprint(self) -> Blueprint:
        return self._bp

    def get_element_name(self) -> str:
        return "rule"

    def get_manager(self) -> RulesManager:
        return HoT().get_rules_manager()

    def execute(self, id):
        def inner():
            devices = HoT().get_rules_manager().execute(id)
            return {"devices": list(map(lambda d: d.to_json(), devices))}

        return self.handle_request(inner)
