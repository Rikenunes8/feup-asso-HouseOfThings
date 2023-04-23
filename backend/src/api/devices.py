from flask import Blueprint, request
from src.HoT import HoT
from src.controller.managers.DevicesManager import DevicesManager
from src.api.CrudApi import CrudApi


class DevicesApi(CrudApi):
    def __init__(self):
        super().__init__()
        self._bp = Blueprint('devices', __name__, url_prefix='/devices')

        self._bp.add_url_rule("/", methods=('GET',), view_func=self.all)
        self._bp.add_url_rule("/available", methods=('GET',), view_func=self.available)
        self._bp.add_url_rule("/<id>/connect", methods=('POST',), view_func=self.connect)
        self._bp.add_url_rule("/<id>/disconnect", methods=('POST',), view_func=self.disconnect)
        self._bp.add_url_rule("/<id>/action", methods=('POST',), view_func=self.action)
        self._bp.add_url_rule("/<id>/rename", methods=('POST',), view_func=lambda id: self.partial_update(id, ["name"]))

    def get_blueprint(self) -> Blueprint:
        return self._bp

    def get_element_name(self) -> str:
        return "device"

    def get_manager(self) -> DevicesManager:
        return HoT().get_device_manager()

    def validate(self, _) -> str or None:
        pass # Not implemented since we don't need to create devices

    def available(self):
        def inner():
            return {'devices': self.get_manager().available(request.args.to_dict())}
        return self.handle_request(inner)

    def connect(self, id):
        def inner(data):
            return {'device': self.get_manager().connect(id, data)}
        return self.handle_request_with_data(inner)
    
    def disconnect(self, id):
        def inner(data):
            self.get_manager().disconnect(id, data)
            return {}
        return self.handle_request_with_data(inner)

    def action(self, id):
        def inner(data):
            self.get_manager().action(id, data)
            return {}
        return self.handle_request_with_data(inner)
