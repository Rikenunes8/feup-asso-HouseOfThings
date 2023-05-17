import time
import sys
try:    from sense_hat import SenseHat
except: from sense_emu import SenseHat

from utils.mqtt import connect_mqtt, subscribe, publish

sense = SenseHat()

uid = "4"
cid = None # id of the controller that is connected to the light

def is_connected() -> bool: return cid != None
temp : float = sense.get_temperature()

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
  publish(client, f"{cidTemp}-thermometer-available-pi", uid)

  
def start_mqtt():
  client = connect_mqtt()

  subscribe(client, f"{uid}-connect", on_connect)
  subscribe(client, f"{uid}-disconnect", on_disconnect)
  subscribe(client, "thermometer-available-pi", on_available)

  client.loop_start()
  return client

if __name__ == '__main__':
  if (len(sys.argv) > 2):
    print("Usage: python3 ThermometerPI.py [uuid]")
    exit(1)
  elif (len(sys.argv) == 2):
    uid = sys.argv[1]
    
  mqtt_client = start_mqtt()
  running = True
  while running:
    if (mqtt_client == None): running = False
    if (is_connected()):
      temp = sense.get_temperature()
      print(temp)
      publish(mqtt_client, f"{uid}-temperature", temp)
    time.sleep(5)
  print("Exiting...")
