from flask import Flask, jsonify, make_response, request
from HoT import HoT 

app = Flask(__name__)
hot = HoT()

@app.get("/heartbeat")
def heartbeat() -> str:
  return jsonify({'status': 'ok'})


@app.post("/devices/<id>/connect")
def connect(id):
  config = tuple(request.args.to_dict().values())
  hot.connect(config, id)
  return jsonify({})

@app.post("/devices/<id>/disconnect")
def disconnect(id):
  hot.disconnect(id)
  return jsonify({})

@app.post("/devices/<id>/action")
def action(id):
  content_type = request.headers.get('Content-Type')
  if (content_type == 'application/json'):
    hot.action(id, request.json)
    return jsonify({})
  else:
    return make_response(jsonify({'error': 'Content-Type not supported!'}), 400)
  

@app.get("/devices")
def connectedDevices() -> str:
  devices = hot.devices()
  return jsonify({'devices': list(map(lambda device: device.toJson(), devices))})
  
