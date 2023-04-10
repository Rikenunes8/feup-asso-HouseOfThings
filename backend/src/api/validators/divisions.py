from datetime import datetime

def validate_division(division: dict):
  name = division.get("name")
  icon = division.get("icon")
  numDevices = division.get("numDevices")

  if name == None: return "No name provided"
  if icon == None: return "No icon provided"
  if numDevices == None: return "No number of devices provided"
  if not isinstance(numDevices, int): return "NumDevices must be an integer"
  if numDevices < 0: return "Invalid number of devices provided"
