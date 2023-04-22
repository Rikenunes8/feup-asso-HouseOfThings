from flask import Blueprint, jsonify, request
from src.HoT import HoT
from src.api.utils import make_error, not_json_error, is_content_json
from src.api.validators.divisions import validate_division

divisions = Blueprint('divisions', __name__, url_prefix='/divisions')

@divisions.get("/")
def index():
  divisions = HoT().divisions()
  return jsonify({'divisions': divisions})

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

@divisions.post("/<id>/rename")
def rename(id):
  if not is_content_json(request): return not_json_error()

  error = HoT().rename_division(id, request.json)
  if error: return make_error(error)
  else:     return jsonify({})

@divisions.post("/<id>/change-icon")
def change_icon(id):
  if not is_content_json(request): return not_json_error()

  error = HoT().change_icon_division(id, request.json)
  if error: return make_error(error)
  else:     return jsonify({})

@divisions.post("/<id>/add-device")
def add_device(id):
  if not is_content_json(request): return not_json_error()

  error = HoT().add_device_division(id, request.json)
  if error: return make_error(error)
  else:     return jsonify({})

@divisions.post("/<id>/remove-device")
def remove_device(id):
  if not is_content_json(request): return not_json_error()

  error = HoT().remove_device_division(id, request.json)
  if error: return make_error(error)
  else:     return jsonify({})
