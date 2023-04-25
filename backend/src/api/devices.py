from flask import Blueprint, jsonify, request
from src.HoT import HoT
from src.api.utils import make_error, not_json_error, is_content_json


devices = Blueprint('devices', __name__, url_prefix='/devices')

@devices.get("/")
def index():
  devices = HoT().get_device_manager().devices()
  return jsonify({'devices': list(map(lambda device: device.to_json(), devices))})


@devices.get("/available")
def available():
  devices = HoT().get_device_manager().available(request.args.to_dict())
  return jsonify({'devices': devices})


@devices.post("/<id>/connect")
def connect(id):
  if (not is_content_json(request)): return not_json_error()
  
  device = HoT().get_device_manager().connect(id, request.json)
  if type(device) == str: return make_error(device, 404)
  else: return jsonify({'device': device})


@devices.post("/<id>/disconnect")
def disconnect(id):
  error = HoT().get_device_manager().disconnect(id)
  if error: return make_error(error, 404)
  else:     return jsonify({})


@devices.post("/<id>/action")
def action(id):
  if (not is_content_json(request)): return not_json_error()

  device = HoT().get_device_manager().action(id, request.json)
  if type(device) == str: return make_error(device)
  else: return jsonify({'device': device})


@devices.post("/<id>/rename")
def rename(id):
  if (not is_content_json(request)): return not_json_error()

  error = HoT().get_device_manager().rename(id, request.json.get("name"))
  if error: return make_error(error)
  else:     return jsonify({})
