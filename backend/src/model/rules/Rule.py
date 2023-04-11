from src.model.rules.Condition import Condition
from src.model.rules.Action import Action

from src.database.DB import DB

class Rule:
  def __init__(self, name: str, operation: str, conditions: list[Condition], actions: list[Action]) -> None:
    self._id = None
    self._name = name
    self._operation = operation 
    self._conditions = conditions
    self._actions = actions
    self._id = self._create()
    DB().update_rule(self._id, {"id": self._id})
  
  def get_id(self) -> str:
    return self._id

  def _create(self):
    return DB().add_rule(self.to_json())
  
  def update(self, name: str, operation: str, conditions: list[Condition], actions:list[Action]):
    self._name = name
    self._operation = operation 
    self._conditions = conditions
    self._actions = actions
    DB().update_rule(self._id, self.to_json())
  
  def delete(self):
    DB().delete_rule(self._id)

  def to_json(self) -> dict:
    return {
      "id": self._id,
      "name": self._name,
      "operation": self._operation,
      "when": list(map(lambda condition: condition.to_json(), self._conditions)),
      "then": list(map(lambda action: action.to_json(), self._actions))
    }