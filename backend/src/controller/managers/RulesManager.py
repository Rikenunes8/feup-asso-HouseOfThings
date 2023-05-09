from src.api.ApiException import ApiException
from src.model.rules.ScheduleCondition import ScheduleCondition
from src.model.rules.DeviceCondition import DeviceCondition
from src.model.rules.Action import Action
from src.model.rules.Rule import Rule
from src.model.rules.Condition import Condition
from src.model.devices.Device import Device
from src.controller.managers.Manager import Manager
from src.controller.managers.DevicesManager import DevicesManager
from src.database.DB import DB
from src.database.CollectionTypes import Collection

class RulesManager(Manager):
    def __init__(self, cid: str, device_manager: DevicesManager):
        super().__init__(cid)
        self._rules: dict[str, Rule] = {}
        self._device_manager = device_manager
    
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

    def all(self) -> list[Rule]:
        return self._rules.values()
    
    def get(self, id: str) -> Rule:
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

    def update(self, id: str, data: dict) -> Rule:
        rule = self.get(id)
        conditions = self._build_conditions(data['when'])
        actions = self._build_actions(data['then'])
        rule.update(data['name'], data['operation'], conditions, actions)
        return rule

    def execute(self, rule_id: str) -> list[Device]:
        rule = self._rules.get(rule_id)
        if rule == None: return "Rule not found"
        return rule.execute(self._device_manager)
    
    def load(self) -> None:
        rules = DB().get(Collection.RULES).find_all()
        for rule in rules:
            try: self.create(rule)
            except ApiException as e: continue
