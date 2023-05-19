import time
import sys
import json
try:    from sense_hat import SenseHat
except: from sense_emu import SenseHat

from utils.mqtt import connect_mqtt, subscribe, publish

sense = SenseHat()

color_pallete = {
  "black": (0, 0, 0),
  "red": (255, 0, 0),
  "green": (0, 255, 0),
  "blue": (0, 0, 255),
  "yellow": (255, 255, 0),
  "purple": (255, 0, 255),
  "cyan": (0, 255, 255),
  "white": (255, 255, 255)
}

start = time.time()


uid = "6"
cid = None # id of the controller that is connected to the light

def is_connected() -> bool: return cid != None
state = False
rgb = color_pallete["yellow"]
brightness = 100


def bright(component):
  return round(component * brightness / 100)

def fill(color):
  for x in range(8):
    for y in range(8):
      sense.set_pixel(x, y, (bright(color[0]), bright(color[1]), bright(color[2])))

def on_connect(client, userdata, msg):
  global cid
  if (cid != None):
    print(f"Light was already connected by `{cid}`")
    return
  cid = msg.payload.decode()
  fill(color_pallete["black"])
  print(f"Light was connected by `{cid}`")
  publish(client, f"{cid}-connected", uid)

def on_disconnect(client, userdata, msg):
  global cid, state, rgb, brightness
  if (cid == None or cid != msg.payload.decode()):
    print(f"Light is not connected or is connected to other cid")
    return
  print(f"Light was disconnected by `{cid}`")
  fill(color_pallete["black"])
  cid = None
  state = False
  rgb = color_pallete["yellow"]
  brightness = 100


def on_turn_on(client, userdata, msg):
  global state, rgb, brightness
  data = json.loads(msg.payload.decode())
  data_cid = data.get("cid")
  data_color = data.get("color")
  data_brightness = data.get("brightness")
  if (cid == None or cid != data_cid):
    print(f"Light is not connected or is connected to other cid")
    return
  state = True
  if data_color != None:
    color = color_pallete.get(data_color)
    if color != None: rgb = color
  if data_brightness != None and data_brightness >= 0 and data_brightness <= 100:
    brightness = data_brightness
  fill(rgb)
  print(f"Light was turned on by `{cid}`")

def on_turn_off(client, userdata, msg):
  global state
  if (cid == None or cid != msg.payload.decode()):
    print(f"Light is not connected or is connected to other cid")
    return
  state = False
  fill(color_pallete["black"])
  print(f"Light was turned off by `{cid}`")

def on_available(client, userdata, msg):
  global cid
  if (cid != None):
    print(f"Light is not available")
    return
  cidTemp = msg.payload.decode()
  publish(client, f"{cidTemp}-light-complex-available-pi", uid)

  
def start_mqtt():
  client = connect_mqtt()

  subscribe(client, f"{uid}-connect", on_connect)
  subscribe(client, f"{uid}-disconnect", on_disconnect)
  subscribe(client, f"{uid}-turnOn", on_turn_on)
  subscribe(client, f"{uid}-turnOff", on_turn_off)
  subscribe(client, "light-complex-available-pi", on_available)

  client.loop_start()
  return client

red_screen = False

if __name__ == '__main__':
  if (len(sys.argv) > 2):
    print("Usage: python3 vLightBulbPi.py [uuid]")
    exit(1)
  elif (len(sys.argv) == 2):
    uid = sys.argv[1]
    
  mqtt_client = start_mqtt()
  running = True
  while running:
    if mqtt_client == None: running = False
    if not is_connected():
        brightness = 100
        if red_screen and int(time.time() - start) % 2 == 0:
            fill(color_pallete["black"])
            red_screen = False
        elif not red_screen and int(time.time() - start) % 2 == 1:
            fill(color_pallete["red"])
            red_screen = True
    time.sleep(0.1)
