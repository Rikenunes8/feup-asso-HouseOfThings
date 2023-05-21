from flask import Blueprint, request, Response
from src.controller.managers.DevicesManager import DevicesManager
from src.api.CrudApi import CrudApi
from src.api.ApiException import ApiException


class DevicesApi(CrudApi):
    def __init__(self, manager: DevicesManager):
        super().__init__(manager)
        self._bp = Blueprint("devices", __name__, url_prefix="/devices")

        self._bp.add_url_rule("/", methods=("GET",), view_func=self.all)
        self._bp.add_url_rule("/available", methods=("GET",), view_func=self.available)
        self._bp.add_url_rule("/<id>/connect", methods=("POST",), view_func=self.create)
        self._bp.add_url_rule("/<id>/disconnect", methods=("POST",), view_func=self.delete)
        self._bp.add_url_rule("/<id>/action", methods=("POST",), view_func=self.action)
        self._bp.add_url_rule("/<id>/rename", methods=("POST",), view_func=self.rename)
        self._bp.add_url_rule("/listener", methods=('GET',), view_func=self.listener)


    def get_api(self) -> Blueprint:
        return self._bp

    def get_element_name(self) -> str:
        return "device"

    def validate(self, _) -> str or None:
        pass

    def rename(self, id):
        return self.partial_update(id, ["name"])

    def available(self):
        def inner():
            return {"devices": self._manager.available(request.args.to_dict())}

        return self.handle_request(inner)

    def action(self, id):
        def inner(data):
            action = data.get("action")
            if action == None:
                raise ApiException("No action provided")
            payload = data.get("data")
            device = self._manager.action(id, action, payload)
            return {"device": device.to_json()}

        return self.handle_request_with_data(inner)
    
    def listener(self):
        def stream():
            announcer = self._manager.announcer()
            messages = announcer.listen()  
            while True:
                msg = messages.get() 
                yield msg
        return Response(stream(), mimetype='text/event-stream')
