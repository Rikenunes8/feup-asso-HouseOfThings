from src.model.rules.Condition import Condition

class ScheduleCondition(Condition):
  def __init__(self, time, days) -> None:
    super().__init__()
    self._time = time
    self._days = days
  
  def to_json(self) -> dict:
    return {
      "kind": "schedule",
      "time": self._time,
      "days": self._days
    }