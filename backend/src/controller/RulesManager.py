from src.model.rules.ScheduleCondition import ScheduleCondition
from src.model.rules.DeviceCondition import DeviceCondition
from src.model.rules.Action import Action
from src.model.rules.Rule import Rule
from src.model.rules.Condition import Condition

class RulesManager:
  def __init__(self):
    self._rules : dict[str, Rule]= {}
  
  def _build_conditions(self, conditions) -> list[Condition]:
    scheduleConditions = list(filter(lambda condition: condition['kind'] == "schedule", conditions))
    deviceConditions = list(filter(lambda condition: condition['kind'] == "device", conditions))
    scheduleConditions = list(map(lambda condition: ScheduleCondition(condition['time'], condition['days']), scheduleConditions))
    deviceConditions = list(map(lambda condition: DeviceCondition(condition['device_id'], condition['state']), deviceConditions))
    return scheduleConditions + deviceConditions

  def _build_actions(self, actions) -> list[Action]:
    return list(map(lambda action: Action(action['device_id'], action['action']), actions))


  def add(self, rule_json) -> Rule:
    conditions = self._build_conditions(rule_json['when'])
    actions = self._build_actions(rule_json['then'])

    rule = Rule(rule_json['name'], rule_json['operation'], conditions , actions)
    self._rules[rule.get_id()] = rule
    return self._rules[rule.get_id()]

  def remove(self, rule_id):
    rule = self._rules.pop(rule_id, None)
    if rule: rule.delete()
    else: return "Rule not found"

  def update(self, rule_id, rule_json):
    error = self.remove(rule_id)
    if error: return error
    return self.add(rule_json)

  def get_all(self):
    return list(map(lambda rule : rule.to_json(), self._rules.values()))
