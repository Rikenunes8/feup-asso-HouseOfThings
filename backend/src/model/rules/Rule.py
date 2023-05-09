from src.api.ApiException import ApiException
from src.model.rules.Condition import Condition
from src.model.rules.Action import Action
from src.model.devices.Device import Device
from src.controller.managers.DevicesManager import DevicesManager

from src.database.DB import DB
from src.database.CollectionTypes import Collection


class Rule:
    def __init__(self, name: str, operation: str, conditions: list[Condition], actions: list[Action], id: str = None) -> None:
        self._id = None
        self._name = name
        self._operation = operation 
        self._conditions = conditions
        self._actions = actions
        if id != None:
            self._id = id
        else:
          self._id = self._create()
          DB().get(Collection.RULES).update(self._id, {"id": self._id})

    def get_id(self) -> str:
        return self._id

    def _create(self):
        return DB().get(Collection.RULES).add(self.to_json())

    def update(self, name: str, operation: str, conditions: list[Condition], actions: list[Action]):
        self._name = name
        self._operation = operation 
        self._conditions = conditions
        self._actions = actions
        DB().get(Collection.RULES).update(self._id, self.to_json())

    def delete(self):
        DB().get(Collection.RULES).delete(self._id)

    def execute(self, device_manager: DevicesManager) -> list[Device]:
        devices_updated: list[Device] = []
        for action in self._actions:
            try:
                result = action.execute(device_manager)
                devices_updated.append(result)
            except ApiException as e:
                print(e)
        return devices_updated

    def to_json(self) -> dict:
        return {
            "id": self._id,
            "name": self._name,
            "operation": self._operation,
            "when": list(map(lambda condition: condition.to_json(), self._conditions)),
            "then": list(map(lambda action: action.to_json(), self._actions))
        }
