from flask import Blueprint, request
from src.HoT import HoT
from src.controller.managers.DevicesManager import DevicesManager
from src.api.CrudApi import CrudApi
from src.api.ApiException import ApiException


class DevicesApi(CrudApi):
    def __init__(self):
        super().__init__()
        self._bp = Blueprint('devices', __name__, url_prefix='/devices')

        self._bp.add_url_rule("/", methods=('GET',), view_func=self.all)
        self._bp.add_url_rule("/available", methods=('GET',), view_func=self.available)
        self._bp.add_url_rule("/<id>/connect", methods=('POST',), view_func=self.create)
        self._bp.add_url_rule("/<id>/disconnect", methods=('POST',), view_func=self.delete)
        self._bp.add_url_rule("/<id>/action", methods=('POST',), view_func=self.action)
        self._bp.add_url_rule("/<id>/rename", methods=('POST',), view_func=self.rename)

    def get_blueprint(self) -> Blueprint:
        return self._bp

    def get_element_name(self) -> str:
        return "device"

    def get_manager(self) -> DevicesManager:
        return HoT().get_device_manager()

    def validate(self, _) -> str or None:
        pass

    def rename(self, id):
        return self.partial_update(id, ["name"])

    def available(self):
        def inner():
            return {'devices': self.get_manager().available(request.args.to_dict())}
        return self.handle_request(inner)

    def action(self, id):
        def inner(data):
            action = data.get("action")
            if action == None: 
                raise ApiException("No action provided")
            payload = data.get("data")
            self.get_manager().action(id, action, payload)
            return {}
        return self.handle_request_with_data(inner)
