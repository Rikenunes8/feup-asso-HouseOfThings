from flask import Blueprint, jsonify, request
from src.HoT import HoT
from src.api.utils import make_error, not_json_error, is_content_json
from src.api.validators.divisions import validate_division

divisions = Blueprint('divisions', __name__, url_prefix='/divisions')

@divisions.get("/")
def index():
  divisions = HoT().divisions()
  return jsonify({'divisions': list(map(lambda division: division.to_json() if division != None else {}, divisions))})

@divisions.post("/")
def create():
  if not is_content_json(request): return not_json_error()
  error = validate_division(request.json)
  if error: return make_error(error)

  division = HoT().create_division(request.json)
  if isinstance(division, str): return make_error(error)
  else: return jsonify({'division': division})

@divisions.delete("/<id>/")
def delete(id):
  error = HoT().delete_division(id)
  if error: return make_error(error)
  else:     return jsonify({})

@divisions.post("/<id>/update")
def update(id):
  if not is_content_json(request): return not_json_error()
  error = validate_division(request.json)
  if error: return make_error(error)

  division = HoT().update_division(id, request.json)
  if isinstance(division, str): return make_error(division)
  else: return jsonify({'division': division})
