import time
import schedule
import threading
from src.api.ApiException import ApiException
from src.model.rules.conditions.ScheduleCondition import ScheduleCondition
from src.model.rules.conditions.DeviceCondition import DeviceCondition
from src.model.rules.actions.Action import Action
from src.model.rules.actions.DeviceAction import DeviceAction
from src.model.rules.actions.message_actions.DiscordMessageAction import DiscordMessageAction
from src.model.rules.Rule import Rule
from src.model.rules.conditions.Condition import Condition
from src.model.devices.Device import Device
from src.controller.managers.Manager import Manager
from src.controller.managers.DevicesManager import DevicesManager
from src.controller.observer.Subscriber import Subscriber
from src.database.DB import DB
from src.database.CollectionTypes import Collection

class RulesManager(Manager, Subscriber):
    def __init__(self, cid: str, device_manager: DevicesManager):
        super().__init__(cid)
        self._rules: dict[str, Rule] = {}
        self._device_manager = device_manager
    
    @staticmethod
    def _build_conditions(conditions) -> list[Condition]:
        scheduleConditions = list(filter(lambda condition: condition['kind'] == "schedule", conditions))
        deviceConditions = list(filter(lambda condition: condition['kind'] == "device", conditions))
        scheduleConditions = list(map(lambda condition: ScheduleCondition(condition['time'], condition['days']), scheduleConditions))
        deviceConditions = list(map(lambda condition: DeviceCondition(condition['device_id'], condition), deviceConditions))
        return scheduleConditions + deviceConditions

    @staticmethod
    def _build_actions(actions) -> list[Action]:
        deviceActions = list(filter(lambda action: action['kind'] == "device", actions))
        deviceActions = list(map(lambda action: DeviceAction(action['device_id'], action['action'], action.get('data')), deviceActions))
        
        messageActions = list(filter(lambda action: action['kind'] == "message", actions))
        discordActions = list(filter(lambda action: action['service'] == "discord", messageActions))
        discordActions = list(map(lambda action: DiscordMessageAction(action['data']), discordActions))
        messageActions = discordActions
        return deviceActions + messageActions
    
    def _create(self, data: dict, rule_id: str = None) -> Rule:
        conditions = self._build_conditions(data['when'])
        actions = self._build_actions(data['then'])
        rule = Rule(data['name'], data['operation'], conditions, actions, rule_id)
        rule.init_notifier(self, self._device_manager)
        self._rules[rule.get_id()] = rule
        return rule

    def all(self) -> list[Rule]:
        return self._rules.values()
    
    def get(self, id: str) -> Rule:
        rule = self._rules.get(id)
        if rule == None:
            raise ApiException("Rule not found")
        return rule

    def create(self, data: dict) -> Rule:
        return self._create(data)

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
        rule.init_notifier(self, self._device_manager)
        return rule

    def execute(self, rule_id: str) -> list[Device]:
        rule = self.get(rule_id)
        return rule.execute(self._device_manager)
    
    def load(self) -> None:
        rules = DB().get(Collection.RULES).find_all()
        for rule in rules:
            try: self._create(rule, rule['id'])
            except ApiException as e: continue

    def run_alarms(self) -> None:
        cease_continuous_run = threading.Event()

        class ScheduleThread(threading.Thread):
            @classmethod
            def run(cls):
                while not cease_continuous_run.is_set():
                    schedule.run_pending()
                    time.sleep(1)

        continuous_thread = ScheduleThread()
        continuous_thread.start()

    def notified(self, data: dict = None):
        rule_id = data['rule_id']
        self.execute(rule_id)
