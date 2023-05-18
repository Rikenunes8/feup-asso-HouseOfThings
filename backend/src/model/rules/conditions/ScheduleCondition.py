from src.model.rules.conditions.Condition import Condition
import schedule

class ScheduleCondition(Condition):
  def __init__(self, time: str, days: list[int]) -> None:
    super().__init__("schedule")
    self._time = time
    self._days = days

  def configure(self, data: dict = None):
    for day in self._days:
      if day == 0:
        self._job = schedule.every().monday.at(self._time).do(self.notify)
      elif day == 1:
        self._job = schedule.every().tuesday.at(self._time).do(self.notify)
      elif day == 2:
        self._job = schedule.every().wednesday.at(self._time).do(self.notify)
      elif day == 3:
        self._job = schedule.every().thursday.at(self._time).do(self.notify)
      elif day == 4:
        self._job = schedule.every().friday.at(self._time).do(self.notify)
      elif day == 5:
        self._job = schedule.every().saturday.at(self._time).do(self.notify)
      elif day == 6:
        self._job = schedule.every().sunday.at(self._time).do(self.notify)
  
  def clear(self):
    if not self._job: return
    schedule.cancel_job(self._job)

  def check(self) -> bool:
    old_check = self._check
    self._check = False
    return old_check

  def to_json(self) -> dict:
    return {
      "kind": self._kind,
      "time": self._time,
      "days": self._days
    }