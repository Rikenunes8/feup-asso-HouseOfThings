import pygame
import time
import sys

from utils.mqtt import connect_mqtt, subscribe, publish
from utils.Drawer import Drawer


uid = "3"
cid = None # id of the controller that is connected to the light

def is_connected() -> bool: return cid != None
temp : float = 25.0
drawer : Drawer = None

def on_connect(client, userdata, msg):
  global cid
  if (cid != None):
    print(f"Thermometer was already connected by `{cid}`")
    return
  cid = msg.payload.decode()
  print(f"Thermometer was connected by `{cid}`")
  publish(client, f"{cid}-connected", uid)

def on_disconnect(client, userdata, msg):
  global cid, state
  if (cid == None or cid != msg.payload.decode()):
    print(f"Thermometer is not connected or is connected to other cid")
    return
  print(f"Thermometer was disconnected by `{cid}`")
  cid = None


def on_available(client, userdata, msg):
  global cid
  if (cid != None):
    print(f"Thermometer is not available")
    return
  cidTemp = msg.payload.decode()
  publish(client, f"{cidTemp}-thermometer-available-virtual", uid)

  
def start_mqtt():
  client = connect_mqtt()

  subscribe(client, f"{uid}-connect", on_connect)
  subscribe(client, f"{uid}-disconnect", on_disconnect)
  subscribe(client, "thermometer-available-virtual", on_available)

  client.loop_start()
  return client

def start_drawer():
  global drawer
  pygame.init()
  
  print(f"Starting ThermometerVirtual with uid `{uid}`")

  drawer = Drawer(f"ThermometerVirtual uid `{uid}`")

if __name__ == '__main__':
  if (len(sys.argv) > 2):
    print("Usage: python3 ThermometerVirtual.py [uuid]")
    exit(1)
  elif (len(sys.argv) == 2):
    uid = sys.argv[1]
    
  mqtt_client = start_mqtt()
  start_drawer()

  running = True
  counter = 0
  while running:
    if (mqtt_client == None): running = False
    drawer.drawThermometer(temp)
    if (is_connected() and counter == 0):
      publish(mqtt_client, f"{uid}-temperature", temp)
    time.sleep(0.1)
    counter = (counter + 1) % 50
    for event in pygame.event.get():
      if event.type == pygame.QUIT:
        running = False
      elif event.type == pygame.KEYDOWN:
        if event.key == pygame.K_UP:
          temp += 1.5
        elif event.key == pygame.K_DOWN:
          temp -= 1.5

  pygame.quit()
  print("Exiting...")
