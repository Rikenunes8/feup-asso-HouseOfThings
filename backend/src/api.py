from flask import Blueprint, jsonify, make_response, request
from src.HoT import HoT 

api = Blueprint('api', __name__)

def makeError(error, code=400):
  return make_response(jsonify({'error': error}), code)
def notJsonError():
  return makeError("Content-Type not supported!", 400)
def isContentJson(request):
  return request.headers.get('Content-Type') == 'application/json'

@api.get("/heartbeat")
def heartbeat():
  return jsonify({'status': 'ok'})

@api.get("/categories")
def categories():
  return jsonify({'categories': HoT().categories()})

@api.post("/devices/<id>/connect")
def connect(id):
  if (not isContentJson(request)): return notJsonError()
  error = HoT().connect(id, request.json)
  if error: return makeError(error, 404)
  else: return jsonify({})

@api.post("/devices/<id>/disconnect")
def disconnect(id):
  error = HoT().disconnect(id)
  if error: return makeError(error, 404)
  else: return jsonify({})

@api.post("/devices/<id>/action")
def action(id):
  if (not isContentJson(request)): return notJsonError()
  HoT().action(id, request.json)
  return jsonify({})

@api.post("/devices/<id>/rename")
def rename(id):
  if (not isContentJson(request)): return notJsonError()
  error = HoT().rename(id, request.json)
  if error: return makeError(error)
  else: return jsonify({})

@api.get("/devices")
def connectedDevices():
  devices = HoT().devices()
  return jsonify({'devices': list(map(lambda device: device.toJson() if device != None else {}, devices))})

@api.get("/devices/available")
def available():
  if (not isContentJson(request)): return notJsonError()
  devices = HoT().available(request.json)
  return jsonify({'devices': devices})
