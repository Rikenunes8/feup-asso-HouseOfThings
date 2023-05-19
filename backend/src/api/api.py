from flask import Blueprint, jsonify
from src.api.CategoriesApi import CategoriesApi
from src.api.DevicesApi import DevicesApi
from src.api.RulesApi import RulesApi
from src.api.DivisionsApi import DivisionsApi
from src.api.LogsApi import LogsApi
from src.controller.HoT import HoT


class Api:
    def __init__(self):
        self._bp = Blueprint("api", __name__)

        self._bp.add_url_rule("/", methods=("GET",), view_func=self.heartbeat)
        self._bp.add_url_rule("/heartbeat", methods=("GET",), view_func=self.heartbeat)

        self._managers = HoT()
        views = [
            CategoriesApi(),
            DevicesApi(self._managers.get_devices_manager()),
            RulesApi(self._managers.get_rules_manager()),
            DivisionsApi(self._managers.get_divisions_manager()),
            LogsApi(),
        ]

        for view in views:
            self._bp.register_blueprint(view.get_api())

    def heartbeat(self):
        return jsonify({"status": "ok"})

    def get_api(self) -> Blueprint:
        return self._bp
