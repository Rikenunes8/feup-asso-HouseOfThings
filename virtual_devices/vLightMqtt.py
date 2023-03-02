from mqtt import connect_mqtt, subscribe, publish

uid = "1"
cid = None # id of the controller that is connected to the light

state = False


def on_connect(client, userdata, msg):
  global cid
  if (cid != None):
    print(f"Light was already connected by `{cid}`")
    return
  cid = msg.payload.decode()
  print(f"Light was connected by `{cid}`")
  publish(client, f"{cid}-connected", uid)

def on_disconnect(client, userdata, msg):
  global cid, state
  if (cid == None or cid != msg.payload.decode()):
    print(f"Light is not connected or is connected to other cid")
    return
  print(f"Light was disconnected by `{cid}`")
  cid = None
  state = False


def on_turnOn(client, userdata, msg):
  global state
  if (cid == None or cid != msg.payload.decode()):
    print(f"Light is not connected or is connected to other cid")
    return
  state = True
  print(f"Light was turned on by `{cid}`")

def on_turnOff(client, userdata, msg):
  global state
  if (cid == None or cid != msg.payload.decode()):
    print(f"Light is not connected or is connected to other cid")
    return
  state = False
  print(f"Light was turned off by `{cid}`")

def run():
  client = connect_mqtt()

  subscribe(client, f"{uid}-connect", on_connect)
  subscribe(client, f"{uid}-disconnect", on_disconnect)
  subscribe(client, f"{uid}-turnOn", on_turnOn)
  subscribe(client, f"{uid}-turnOff", on_turnOff)

  client.loop_forever()


if __name__ == '__main__':
  run()