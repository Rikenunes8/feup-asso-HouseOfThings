from src.model.rules.Rule import Rule

class DivisionsManager:
  def __init__(self):
    self._divisions : dict[str, Rule]= {}

  def add(self, rule_json) -> Rule:
    conditions = self._build_conditions(rule_json['when'])
    actions = self._build_actions(rule_json['then'])

    rule = Rule(rule_json['name'], rule_json['operation'], conditions , actions)
    self._divisions[rule.get_id()] = rule
    return self._divisions[rule.get_id()]

  def remove(self, rule_id):
    rule = self._divisions.pop(rule_id, None)
    if rule == None: return "Rule not found"
    else: rule.delete()

  def update(self, rule_id, rule_json):
    rule = self._divisions.get(rule_id)
    if rule == None: return "Rule not found"
    conditions = self._build_conditions(rule_json['when'])
    actions = self._build_actions(rule_json['then'])
    rule.update(rule_json['name'], rule_json['operation'], conditions, actions)
    return rule

  def get_all(self):
    return list(map(lambda rule : rule.to_json(), self._divisions.values()))
