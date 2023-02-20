from flask import Flask
from HoT import HoT 

app = Flask(__name__)

@app.get("/heartbeat")
def heartbeat() -> str:
  return "Hello, world!"


@app.get("/device/<int:port>/connect") # TODO change to post
def connect(port) -> str:
  res = hot.connect(port)
  return "Success" if res else "Failed"

@app.get("/device/<int:port>/disconnect") # TODO change to post
def disconnect(port) -> str:
  res = hot.disconnect(port)
  return "Success" if res else "Failed"

@app.get("/devices")
def connectedDevices() -> str:
  res = hot.getConnectedDevices()
  return f'[ {"; ".join(list(map(lambda x : str(x), res)))} ]'

hot = HoT()
