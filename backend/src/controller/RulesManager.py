from src.model.rules.ScheduleCondition import ScheduleCondition
from src.model.rules.DeviceCondition import DeviceCondition
from src.model.rules.Action import Action
from src.model.rules.Rule import Rule
from src.controller.DeviceAdapterManager import DeviceAdapterManager

class RulesManager:
  def __init__(self, device_manager : DeviceAdapterManager):
    self._device_manager = device_manager
    self._rules = {}

  def _build_schedule_condition(self, condition):
    return ScheduleCondition(condition['hour'], condition['days'])
  def _build_device_condition(self, condition):
    device_adapter = self._device_manager.get_device(condition['device_id'])
    if device_adapter is None: raise Exception("Device not found")
    return DeviceCondition(device_adapter.get_model(), condition['state'])
  def _build_action(self, action):
    device_adapter = self._device_manager.get_device(action['device_id'])
    if device_adapter is None: raise Exception("Device not found")
    return Action(device_adapter, action['action'])
  
  def _build_conditions(self, conditions):
    scheduleConditions = list(filter(lambda condition: condition['kind'] == "schedule", conditions))
    deviceConditions = list(filter(lambda condition: condition['kind'] == "device", conditions))
    scheduleConditions = list(map(self._build_schedule_condition, scheduleConditions))
    deviceConditions = list(map(self._build_device_condition, deviceConditions)) # TODO: Error handling
    return scheduleConditions + deviceConditions
  def _build_actions(self, actions):
    return list(map(self._build_action, actions)) # TODO: Error handling


  
  def add(self, rule_json) -> Rule:
    conditions = self._build_conditions(rule_json['when'])
    actions = self._build_actions(rule_json['then'])

    rule = Rule(rule_json['name'], rule_json['operation'], conditions , actions)
    self._rules[rule.get_id()] = rule
    return self._rules[rule.get_id()]

  def get_all(self):
    return list(map(lambda rule : rule.to_json(), self._rules.values()))
  
