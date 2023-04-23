from src.model.rules.ScheduleCondition import ScheduleCondition
from src.model.rules.DeviceCondition import DeviceCondition
from src.model.rules.Action import Action
from src.model.rules.Rule import Rule
from src.model.rules.Condition import Condition
from src.controller.managers.Manager import Manager

class RulesManager(Manager):
    def __init__(self, cid):
        super().__init__(cid)
        self._rules : dict[str, Rule]= {}
    
    def _build_conditions(self, conditions) -> list[Condition]:
        scheduleConditions = list(filter(lambda condition: condition['kind'] == "schedule", conditions))
        deviceConditions = list(filter(lambda condition: condition['kind'] == "device", conditions))
        scheduleConditions = list(map(lambda condition: ScheduleCondition(condition['time'], condition['days']), scheduleConditions))
        deviceConditions = list(map(lambda condition: DeviceCondition(condition['device_id'], condition['state']), deviceConditions))
        return scheduleConditions + deviceConditions

    def _build_actions(self, actions) -> list[Action]:
        return list(map(lambda action: Action(action['device_id'], action['action']), actions))

    def all(self):
        return list(map(lambda rule : rule.to_json(), self._rules.values()))

    def create(self, rule_json: dict) -> Rule:
        conditions = self._build_conditions(rule_json['when'])
        actions = self._build_actions(rule_json['then'])

        rule = Rule(rule_json['name'], rule_json['operation'], conditions , actions)
        self._rules[rule.get_id()] = rule
        return rule.to_json()

    def delete(self, rule_id: str):
        rule = self._rules.pop(rule_id, None)
        if rule == None: return "Rule not found"
        else: rule.delete()

    def update(self, rule_id: str, rule_json: dict):
        rule = self._rules.get(rule_id)
        if rule == None: return "Rule not found"
        conditions = self._build_conditions(rule_json['when'])
        actions = self._build_actions(rule_json['then'])
        rule.update(rule_json['name'], rule_json['operation'], conditions, actions)
        return rule.to_json()

    def execute(self, rule_id : str):
      pass