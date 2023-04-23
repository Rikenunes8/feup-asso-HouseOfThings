from flask import Blueprint
from src.HoT import HoT
from src.controller.managers.DivisionsManager import DivisionsManager
from src.api.CrudApi import CrudApi


class DivisionsApi(CrudApi):
    def __init__(self):
        super().__init__()
        self._bp = Blueprint('divisions', __name__, url_prefix='/divisions')

        self._bp.add_url_rule("/", methods=('GET',), view_func=self.all)
        self._bp.add_url_rule("/", methods=('POST',), view_func=self.create)
        self._bp.add_url_rule("/<id>/", methods=('DELETE',), view_func=self.delete)
        self._bp.add_url_rule("/<id>/rename", methods=('POST',), view_func=lambda id: self.partial_update(id, ["name"]))
        self._bp.add_url_rule("/<id>/change-icon", methods=('POST',), view_func=lambda id: self.partial_update(id, ["icon"]))
        self._bp.add_url_rule("/<id>/add-device", methods=('POST',), view_func=self.add_device)
        self._bp.add_url_rule("/<id>/remove-device", methods=('POST',), view_func=self.remove_device)

    def get_blueprint(self) -> Blueprint:
        return self._bp

    def get_element_name(self) -> str:
        return "division"

    def get_manager(self) -> DivisionsManager:
        return HoT().get_divisions_manager()

    def validate(self, division) -> str or None:
        name = division.get("name")
        icon = division.get("icon")
        devices = division.get("devices")

        if name == None: return "No name provided"
        if icon == None: return "No icon provided"
        if devices == None: division["devices"] = []
        if not isinstance(devices, list): return "devices must be a list of device UIDs"
    
    def add_device(self, id):
        def inner(data):
            self.get_manager().add_device(id, data)
            return {}
        return self.handle_request_with_data(inner)
    
    def remove_device(self, id):
        def inner(data):
            self.get_manager().remove_device(id, data)
            return {}
        return self.handle_request_with_data(inner)
