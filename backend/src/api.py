from flask import Blueprint, jsonify, make_response, request
from src.HoT import HoT 

api = Blueprint('api', __name__)

def notJson():
  return make_response(jsonify({'error': 'Content-Type not supported!'}), 400)
def isContentJson(request):
  return request.headers.get('Content-Type') == 'application/json'

@api.get("/heartbeat")
def heartbeat() -> str:
  return jsonify({'status': 'ok'})


@api.post("/devices/<id>/connect")
def connect(id):
  if (not isContentJson(request)): return notJson()
  HoT().connect(id, request.json)
  return jsonify({})

@api.post("/devices/<id>/disconnect")
def disconnect(id):
  HoT().disconnect(id)
  return jsonify({})

@api.post("/devices/<id>/action")
def action(id):
  if (not isContentJson(request)): return notJson()
  HoT().action(id, request.json)
  return jsonify({})
  

@api.get("/devices")
def connectedDevices() -> str:
  devices = HoT().devices()
  return jsonify({'devices': list(map(lambda device: device.toJson(), devices))})
  

