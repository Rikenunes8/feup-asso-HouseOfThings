from flask import Flask, jsonify, make_response, request
from HoT import HoT 

app = Flask(__name__)
hot = HoT()

def notJson():
  return make_response(jsonify({'error': 'Content-Type not supported!'}), 400)
def isContentJson(request):
  return request.headers.get('Content-Type') == 'application/json'

@app.get("/heartbeat")
def heartbeat() -> str:
  return jsonify({'status': 'ok'})


@app.post("/devices/<id>/connect")
def connect(id):
  if (not isContentJson(request)): return notJson()
  hot.connect(id, request.json)
  return jsonify({})

@app.post("/devices/<id>/disconnect")
def disconnect(id):
  hot.disconnect(id)
  return jsonify({})

@app.post("/devices/<id>/action")
def action(id):
  if (not isContentJson(request)): return notJson()
  hot.action(id, request.json)
  return jsonify({})
  

@app.get("/devices")
def connectedDevices() -> str:
  devices = hot.devices()
  return jsonify({'devices': list(map(lambda device: device.toJson(), devices))})
  

