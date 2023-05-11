from src.model.rules.Condition import Condition
import schedule

# TODO cancel schedule when rule is deleted or updated
class ScheduleCondition(Condition):
  def __init__(self, time: str, days: list[int]) -> None:
    super().__init__()
    self._time = time
    self._days = days

  def configure(self, data: dict = None):
    for day in self._days:
      if day == 0:
        schedule.every().monday.at(self._time).do(self.notify)
      elif day == 1:
        schedule.every().tuesday.at(self._time).do(self.notify)
      elif day == 2:
        schedule.every().wednesday.at(self._time).do(self.notify)
      elif day == 3:
        schedule.every().thursday.at(self._time).do(self.notify)
      elif day == 4:
        schedule.every().friday.at(self._time).do(self.notify)
      elif day == 5:
        schedule.every().saturday.at(self._time).do(self.notify)
      elif day == 6:
        schedule.every().sunday.at(self._time).do(self.notify)

  def to_json(self) -> dict:
    return {
      "kind": "schedule",
      "time": self._time,
      "days": self._days
    }