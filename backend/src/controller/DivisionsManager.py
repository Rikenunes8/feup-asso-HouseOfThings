from src.model.Division import Division

class DivisionsManager:
  def __init__(self):
    self._divisions: dict[str, Division]= {}

  def add(self, division_json) -> Division:
    division = Division(division_json['name'], division_json['icon'], division_json['numDevices'])
    self._divisions[division.get_id()] = division
    return self._divisions[division.get_id()]

  def remove(self, division_id):
    division = self._divisions.pop(division_id, None)
    if division == None: return "Division not found"
    else: division.delete()

  def update(self, division_id, division_json):
    rule = self._divisions.get(division_id)
    if rule == None: return "Division not found"
    rule.update(division_json['name'], division_json['icon'], division_json['numDevices'])
    return rule

  def get_all(self):
    return list(map(lambda division : division.to_json(), self._divisions.values()))
