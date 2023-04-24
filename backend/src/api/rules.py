from flask import Blueprint, jsonify, request
from src.HoT import HoT
from src.api.utils import make_error, not_json_error, is_content_json
from src.api.validators.rules import validate_create_rule


rules = Blueprint('rules', __name__, url_prefix='/rules')

@rules.get("/")
def index():
  rules = HoT().get_rules_manager().get_all()
  return jsonify({"rules": rules})


@rules.post("/")
def create():
  if not is_content_json(request): return not_json_error()
  error = validate_create_rule(request.json)
  if error: return make_error(error)

  rule = HoT().get_rules_manager().add(request.json)
  if isinstance(rule, str): return make_error(error)
  else: return jsonify({'rule': rule})


@rules.delete("/<id>/")
def delete(id):
  error = HoT().get_rules_manager().remove(id)
  if error: return make_error(error)
  else:     return jsonify({})

@rules.post("/<id>/")
def update(id):
  if not is_content_json(request): return not_json_error()
  error = validate_create_rule(request.json)
  if error: return make_error(error)

  rule = HoT().get_rules_manager().update(id, request.json)
  if isinstance(rule, str): return make_error(rule)
  else: return jsonify({'rule': rule})

@rules.post("/<id>/execute")
def execute(id):
  error = HoT().get_rules_manager().execute(id)
  if error: return make_error(error)
  else:     return jsonify({})
