from src.api.ApiException import ApiException
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
    
    @staticmethod
    def _build_conditions(conditions) -> list[Condition]:
        scheduleConditions = list(filter(lambda condition: condition['kind'] == "schedule", conditions))
        deviceConditions = list(filter(lambda condition: condition['kind'] == "device", conditions))
        scheduleConditions = list(map(lambda condition: ScheduleCondition(condition['time'], condition['days']), scheduleConditions))
        deviceConditions = list(map(lambda condition: DeviceCondition(condition['device_id'], condition['state']), deviceConditions))
        return scheduleConditions + deviceConditions

    @staticmethod
    def _build_actions(actions) -> list[Action]:
        return list(map(lambda action: Action(action['device_id'], action['action']), actions))

    def all(self):
        return self._rules.values()
    
    def get(self, id: str):
        rule = self._rules.get(id)
        if rule == None:
            raise ApiException("Rule not found")
        return rule

    def create(self, data: dict) -> Rule:
        conditions = self._build_conditions(data['when'])
        actions = self._build_actions(data['then'])
        rule = Rule(data['name'], data['operation'], conditions, actions)
        self._rules[rule.get_id()] = rule
        return rule

    def delete(self, rule_id: str):
        rule = self._rules.pop(rule_id, None)
        if rule == None:
            raise ApiException("Rule not found")
        rule.delete()

    def update(self, id: str, data: dict):
        rule = self.get(id)
        conditions = self._build_conditions(data['when'])
        actions = self._build_actions(data['then'])
        rule.update(data['name'], data['operation'], conditions, actions)
        return rule

    def execute(self, id : str):
        pass
