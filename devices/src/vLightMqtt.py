import pygame
import time
import sys
from mqtt import connect_mqtt, subscribe, publish
from Drawer import Drawer

uid = "1"
cid = None # id of the controller that is connected to the light

def is_connected() -> bool: return cid != None
state : bool = False
drawer : Drawer = None

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


def on_turn_on(client, userdata, msg):
  global state
  if (cid == None or cid != msg.payload.decode()):
    print(f"Light is not connected or is connected to other cid")
    return
  state = True
  print(f"Light was turned on by `{cid}`")

def on_turn_off(client, userdata, msg):
  global state
  if (cid == None or cid != msg.payload.decode()):
    print(f"Light is not connected or is connected to other cid")
    return
  state = False
  print(f"Light was turned off by `{cid}`")

def on_available(client, userdata, msg):
  global cid
  if (cid != None):
    print(f"Light is not available")
    return
  cidTemp = msg.payload.decode()
  publish(client, f"{cidTemp}-light-available", uid)

  
def start_mqtt():
  client = connect_mqtt()

  subscribe(client, f"{uid}-connect", on_connect)
  subscribe(client, f"{uid}-disconnect", on_disconnect)
  subscribe(client, f"{uid}-turnOn", on_turn_on)
  subscribe(client, f"{uid}-turnOff", on_turn_off)
  subscribe(client, "light-available", on_available)

  client.loop_start()

def start_drawer():
  global drawer
  pygame.init()
  
  print(type(uid))
  print(f"Starting vLight with uid `{uid}`")

  drawer = Drawer(f"vLight uid `{uid}`")


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
    drawer.drawLight(is_connected(), state)
    time.sleep(0.1)
    for event in pygame.event.get():
      if event.type == pygame.QUIT:
        run = False
  pygame.quit()

    
