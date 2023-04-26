from flask import Blueprint
from src.HoT import HoT
from src.controller.managers.RulesManager import RulesManager
from src.api.CrudApi import CrudApi
from datetime import datetime
from src.api.ApiException import ApiException


class RulesApi(CrudApi):
    def __init__(self):
        super().__init__()
        self._bp = Blueprint('rules', __name__, url_prefix='/rules')

        self._bp.add_url_rule("/", methods=('GET',), view_func=self.all)
        self._bp.add_url_rule("/", methods=('POST',), view_func=self.create)
        self._bp.add_url_rule("/<id>/", methods=('DELETE',), view_func=self.delete)
        self._bp.add_url_rule("/<id>/", methods=('POST',), view_func=self.update)
        self._bp.add_url_rule("/<id>/execute", methods=('POST',), view_func=self.execute)

    def get_blueprint(self) -> Blueprint:
        return self._bp

    def get_element_name(self) -> str:
        return "rule"

    def get_manager(self) -> RulesManager:
        return HoT().get_rules_manager()
    
    def execute(self, id):
        def inner():
            devices = HoT().get_rules_manager().execute(id)
            return {'devices': list(map(lambda d: d.to_json(), devices))}
        return self.handle_request(inner)

    def validate(self, rule) -> str or None:
        name = rule.get("name")
        operation = rule.get("operation")
        when = rule.get("when")
        then = rule.get("then")
        if name == None: return "No name provided"
        if operation == None: return "No operation provided"
        if operation not in ["and", "or"]: return "Invalid operation provided"
        if when == None: return "No when provided"
        if then == None: return "No then provided"
        if not isinstance(when, list): return "When must be a list"
        if not isinstance(then, list): return "Then must be a list"
        if len(then) == 0: return "No actions provided"
      
        for condition in when:
          error = self._validate_condition(condition)
          if error: return error
        for action in then:
          error = self._validate_action(action)
          if error: return error

    def _validate_condition(self, condition: dict):
        kind = condition.get("kind")
        if kind == None: return "No kind provided"
        if kind not in ["device", "schedule"]: return "Invalid kind provided"
        if kind == "device":
            device_id = condition.get("device_id")
            state = condition.get("state")
            if device_id == None: return "No device_id provided"
            if state == None: return "No state provided"
            if not isinstance(state, dict): return "State must be a dict"
        elif kind == "schedule":
            time = condition.get("time")
            days = condition.get("days")
            if time == None: return "No time provided"
            if days == None: return "No days provided"
            try: datetime.strptime(time, "%H:%M")
            except: return "Invalid time provided"
            if not isinstance(days, list): return "Days must be a list"
            for day in days:
                if day not in range(7): return "Invalid day provided"
      
    def _validate_action(self, action: dict):
        device_id = action.get("device_id")
        action_concrete = action.get("action")
        if device_id == None: return "No device_id provided"
        if action_concrete == None: return "No action provided"
