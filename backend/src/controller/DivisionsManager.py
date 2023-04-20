from src.model.Division import Division

class DivisionsManager:
  def __init__(self):
    self._divisions: dict[str, Division]= {}

  def add(self, division_json) -> Division:
    division = Division(division_json['name'], division_json['icon'], division_json['devices'])
    self._divisions[division.get_id()] = division
    return self._divisions[division.get_id()]

  def remove(self, division_id):
    division = self._divisions.pop(division_id, None)
    if division == None: return "Division not found"
    else: division.delete()

  def rename(self, division_id, name):
    division = self._divisions.get(division_id)
    if division == None: return "Division not found"
    division.rename(name)
    return division

  def change_icon(self, division_id, icon):
    division = self._divisions.get(division_id)
    if division == None: return "Division not found"
    division.change_icon(icon)
    return division
  
  def add_device(self, division_id, device):
    division = self._divisions.get(division_id)
    if division == None: return "Division not found"
    division.add_device(device)
    return division
  
  def remove_device(self, division_id, device):
    division = self._divisions.get(division_id)
    if division == None: return "Division not found"
    division.remove_device(device)
    return division

  def get_all(self):
    return list(map(lambda division : division.to_json(), self._divisions.values()))
