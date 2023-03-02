from flask import Flask
from HoT import HoT 

app = Flask(__name__)

@app.get("/heartbeat")
def heartbeat() -> str:
  return "Hello, world!"


@app.get("/devices/<id>/connect") # TODO change to post
def connect(id) -> str:
  res = hot.connect(("light", "mqtt"), id)
  return "Success" if res else "Failed"

@app.get("/devices/<id>/disconnect") # TODO change to post
def disconnect(id) -> str:
  res = hot.disconnect(id)
  return "Success" if res else "Failed"

@app.get("/devices")
def connectedDevices() -> str:
  res = hot.devices()
  return f'[ {"; ".join(list(map(lambda x : str(x), res)))} ]'

hot = HoT()
