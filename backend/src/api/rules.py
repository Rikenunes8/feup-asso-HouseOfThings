from flask import Blueprint, jsonify, request
from src.HoT import HoT
from src.api.utils import make_error, not_json_error, is_content_json


rules = Blueprint('rules', __name__, url_prefix='/rules')

@rules.get("/")
def index():
  rules = HoT().rules()
  return rules


@rules.post("/")
def create():
  if (not is_content_json(request)): return not_json_error()

  error = HoT().create_rule(request.json)
  if error: return make_error(error)
  else:     return jsonify({})


@rules.delete("/<id>/")
def delete(id):
  error = HoT().delete_rule(id)
  if error: return make_error(error)
  else:     return jsonify({})

@rules.post("/<id>/")
def update(id):
  if (not is_content_json(request)): return not_json_error()

  error = HoT().update_rule(id, request.json)
  if error: return make_error(error)
  else:     return jsonify({})

@rules.post("/<id>/execute")
def execute(id):
  error = HoT().execute_rule(id)
  if error: return make_error(error)
  else:     return jsonify({})