from flask import Blueprint, jsonify, request
from src.HoT import HoT
from src.api.utils import make_error, not_json_error, is_content_json


devices = Blueprint('devices', __name__, url_prefix='/devices')

@devices.get("/")
def index():
  devices = HoT().devices()
  return jsonify({'devices': list(map(lambda device: device.to_json() if device != None else {}, devices))})


@devices.get("/available")
def available():
  devices = HoT().available(request.args.to_dict())
  return jsonify({'devices': devices})


@devices.post("/<id>/connect")
def connect(id):
  if (not is_content_json(request)): return not_json_error()
  
  device = HoT().connect(id, request.json)
  if type(device) == str: return make_error(device, 404)
  else: return jsonify({'device': device})


@devices.post("/<id>/disconnect")
def disconnect(id):
  error = HoT().disconnect(id)
  if error: return make_error(error, 404)
  else:     return jsonify({})


@devices.post("/<id>/action")
def action(id):
  if (not is_content_json(request)): return not_json_error()

  error = HoT().action(id, request.json)
  if error: return make_error(error)
  else:     return jsonify({})


@devices.post("/<id>/rename")
def rename(id):
  if (not is_content_json(request)): return not_json_error()

  error = HoT().rename(id, request.json)
  if error: return make_error(error)
  else:     return jsonify({})