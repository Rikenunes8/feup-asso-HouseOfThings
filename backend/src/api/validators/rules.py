from datetime import datetime

def validate_create_rule(rule: dict):
  return _validate_rule(rule)

def _validate_rule(rule: dict):
  id = rule.get("id")
  name = rule.get("name")
  operation = rule.get("operation")
  when = rule.get("when")
  then = rule.get("then")
  if id == None: return "No id provided"
  if name == None: return "No name provided"
  if operation == None: return "No operation provided"
  if operation not in ["and", "or"]: return "Invalid operation provided"
  if when == None: return "No when provided"
  if then == None: return "No then provided"
  if not isinstance(when, list): return "When must be a list"
  if not isinstance(then, list): return "Then must be a list"
  if len(then) == 0: return "No actions provided"
  
  for condition in when:
    error = _validate_condition(condition)
    if error: return error
  for action in then:
    error = _validate_action(action)
    if error: return error

def _validate_condition(condition: dict):
  kind = condition.get("kind")
  if kind == None: return "No kind provided"
  if kind not in ["device", "schedule"]: return "Invalid kind provided"
  if kind == "device":
    device_id = condition.get("device_id")
    if device_id == None: return "No device_id provided"
  elif kind == "schedule":
    time = condition.get("hour")
    days = condition.get("days")
    if time == None: return "No time provided"
    if days == None: return "No days provided"
    try: datetime.strptime(time, "%H:%M")
    except: return "Invalid time provided"
    if not isinstance(days, list): return "Days must be a list"
    for day in days:
      if day not in range(7): return "Invalid day provided"
  
def _validate_action(action: dict):
  device_id = action.get("device_id")
  action_concrete = action.get("action")
  if device_id == None: return "No device_id provided"
  if action_concrete == None: return "No action provided"
