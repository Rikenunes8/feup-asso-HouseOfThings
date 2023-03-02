from flask import Flask, jsonify, make_response, request
from HoT import HoT 

app = Flask(__name__)
hot = HoT()

@app.get("/heartbeat")
def heartbeat() -> str:
  return "Hello, world!"


@app.post("/devices/<id>/connect")
def connect(id):
  config = tuple(request.args.to_dict().values())
  hot.connect(config, id)
  return make_response('', 200)

@app.post("/devices/<id>/disconnect")
def disconnect(id):
  hot.disconnect(id)
  return make_response('', 200)

@app.post("/devices/<id>/action")
def action(id):
  content_type = request.headers.get('Content-Type')
  if (content_type == 'application/json'):
    hot.action(id, request.json)
    return make_response('', 200)
  else:
    return make_response('Content-Type not supported!', 400)
  

@app.get("/devices")
def connectedDevices() -> str:
  devices = hot.devices()
  return jsonify(dict(pair for device in devices for pair in device.toJson().items()))
  
