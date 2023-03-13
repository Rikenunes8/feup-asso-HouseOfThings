import pygame
import time
import sys
from mqtt import connect_mqtt, subscribe, publish
from Drawer import Drawer

uid = "1"
cid = None # id of the controller that is connected to the light

def isConnected() -> bool: return cid != None
state : bool = False
drawer : Drawer = None

def on_connect(client, userdata, msg):
  global cid, state, drawer
  if (cid != None):
    print(f"Light was already connected by `{cid}`")
    return
  cid = msg.payload.decode()
  print(f"Light was connected by `{cid}`")
  publish(client, f"{cid}-connected", uid)
  drawer.drawLight(isConnected(), state)

def on_disconnect(client, userdata, msg):
  global cid, state, drawer
  if (cid == None or cid != msg.payload.decode()):
    print(f"Light is not connected or is connected to other cid")
    return
  print(f"Light was disconnected by `{cid}`")
  cid = None
  state = False
  drawer.drawLight(isConnected(), state)


def on_turnOn(client, userdata, msg):
  global state, drawer
  if (cid == None or cid != msg.payload.decode()):
    print(f"Light is not connected or is connected to other cid")
    return
  state = True
  print(f"Light was turned on by `{cid}`")
  drawer.drawLight(isConnected(), state)

def on_turnOff(client, userdata, msg):
  global state, drawer
  if (cid == None or cid != msg.payload.decode()):
    print(f"Light is not connected or is connected to other cid")
    return
  state = False
  print(f"Light was turned off by `{cid}`")
  drawer.drawLight(isConnected(), state)


def start_mqtt():
  client = connect_mqtt()

  subscribe(client, f"{uid}-connect", on_connect)
  subscribe(client, f"{uid}-disconnect", on_disconnect)
  subscribe(client, f"{uid}-turnOn", on_turnOn)
  subscribe(client, f"{uid}-turnOff", on_turnOff)

  client.loop_start()

def start_drawer():
  global drawer
  pygame.init()
  
  print(type(uid))
  print(f"Starting vLight with uid `{uid}`")

  drawer = Drawer(f"vLight uid `{uid}`")
  drawer.drawLight(isConnected(), False)


if __name__ == '__main__':
  if (len(sys.argv) > 2):
    print("Usage: python3 vLightMqtt.py [uuid]")
    exit(1)
  elif (len(sys.argv) == 2):
    uid = sys.argv[1]
    
  start_drawer()
  start_mqtt()
  run = True
  while run:
    drawer.drawLight(isConnected(), state)
    for event in pygame.event.get():
      if event.type == pygame.QUIT:
        run = False
    time.sleep(0.1)
  pygame.quit()

    
