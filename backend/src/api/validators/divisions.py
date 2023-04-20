from datetime import datetime

def validate_division(division: dict):
  name = division.get("name")
  icon = division.get("icon")
  devices = division.get("devices")

  if name == None: return "No name provided"
  if icon == None: return "No icon provided"
  if devices == None: division["devices"] = []
  if not isinstance(devices, list): return "devices must be a list of device UIDs"
