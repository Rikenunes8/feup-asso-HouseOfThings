from flask import Blueprint
from src.controller.managers.RulesManager import RulesManager
from src.api.CrudApi import CrudApi
from datetime import datetime


class RulesApi(CrudApi):
    def __init__(self, manager: RulesManager):
        super().__init__(manager)
        self._bp = Blueprint("rules", __name__, url_prefix="/rules")

        self._bp.add_url_rule("/", methods=("GET",), view_func=self.all)
        self._bp.add_url_rule("/", methods=("POST",), view_func=self.create)
        self._bp.add_url_rule("/<id>/", methods=("DELETE",), view_func=self.delete)
        self._bp.add_url_rule("/<id>/", methods=("POST",), view_func=self.update)
        self._bp.add_url_rule(
            "/<id>/execute", methods=("POST",), view_func=self.execute
        )

    def get_api(self) -> Blueprint:
        return self._bp

    def get_element_name(self) -> str:
        return "rule"

    def execute(self, id):
        def inner():
            devices = self._manager.execute(id)
            return {"devices": list(map(lambda d: d.to_json(), devices))}

        return self.handle_request(inner)

    def validate(self, rule) -> str or None:
        name = rule.get("name")
        operation = rule.get("operation")
        when = rule.get("when")
        then = rule.get("then")
        if name is None:
            return "No name provided"
        if operation is None:
            return "No operation provided"
        if operation not in ["and", "or"]:
            return "Invalid operation provided"
        if when is None:
            return "No when provided"
        if then is None:
            return "No then provided"
        if not isinstance(when, list):
            return "When must be a list"
        if not isinstance(then, list):
            return "Then must be a list"
        if len(then) == 0:
            return "No actions provided"

        for condition in when:
            error = self._validate_condition(condition)
            if error:
                return error
        for action in then:
            error = self._validate_action(action)
            if error:
                return error

    def _validate_condition(self, condition: dict):
        kind = condition.get("kind")
        if kind is None:
            return "No kind provided"
        if kind not in ["device", "schedule"]:
            return "Invalid kind provided"
        if kind == "device":
            device_id = condition.get("device_id")
            comparator = condition.get("comparator")
            attribute = condition.get("attribute")
            state = condition.get("state")
            if device_id is None:
                return "No device_id provided"
            if comparator is None:
                return "No comparator provided"
            if comparator not in ["==", ">", "<"]:
                return "Invalid comparator provided"
            if attribute is None:
                return "No attribute provided"
            if state is None:
                return "No state provided"
        elif kind == "schedule":
            time = condition.get("time")
            days = condition.get("days")
            if time is None:
                return "No time provided"
            if days is None:
                return "No days provided"
            try:
                datetime.strptime(time, "%H:%M")
            except ValueError:
                return "Invalid time provided"
            if not isinstance(days, list):
                return "Days must be a list"
            for day in days:
                if day not in range(7):
                    return "Invalid day provided"

    def _validate_action(self, action: dict):
        kind = action.get("kind")
        if kind is None:
            return "No kind provided"
        if kind not in ["device", "message"]:
            return "Invalid kind provided"
        if kind == "device":
            device_id = action.get("device_id")
            action_concrete = action.get("action")
            if device_id is None:
                return "No device_id provided"
            if action_concrete is None:
                return "No action provided"
        elif kind == "message":
            service = action.get("service")
            if service is None:
                return "No service provided"
            data = action.get("data")
            if data is None or type(data) != dict:
                return "No data provided"
            if service == "discord":
                url = data.get("url")
                if url is None:
                    return "No url provided"
