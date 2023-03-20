import time
import sys
try:    from sense_hat import SenseHat
except: from sense_emu import SenseHat

from mqtt import connect_mqtt, subscribe, publish

sense = SenseHat()

uid = "2"
cid = None # id of the controller that is connected to the light

def isConnected() -> bool: return cid != None
temp : float = sense.get_temperature()

def on_connect(client, userdata, msg):
  global cid
  if (cid != None):
    print(f"Thermostat was already connected by `{cid}`")
    return
  cid = msg.payload.decode()
  print(f"Thermostat was connected by `{cid}`")
  publish(client, f"{cid}-connected", uid)

def on_disconnect(client, userdata, msg):
  global cid, state
  if (cid == None or cid != msg.payload.decode()):
    print(f"Thermostat is not connected or is connected to other cid")
    return
  print(f"Thermostat was disconnected by `{cid}`")
  cid = None


def on_available(client, userdata, msg):
  global cid
  if (cid != None):
    print(f"Thermostat is not available")
    return
  cidTemp = msg.payload.decode()
  publish(client, f"{cidTemp}-thermostat-available", uid)

  
def start_mqtt():
  client = connect_mqtt()

  subscribe(client, f"{uid}-connect", on_connect)
  subscribe(client, f"{uid}-disconnect", on_disconnect)
  subscribe(client, "thermostat-available", on_available)

  client.loop_start()
  return client

if __name__ == '__main__':
  if (len(sys.argv) > 2):
    print("Usage: python3 vThermostatPI.py [uuid]")
    exit(1)
  elif (len(sys.argv) == 2):
    uid = sys.argv[1]
    
  mqtt_client = start_mqtt()
  running = True
  while running:
    if (mqtt_client == None): running = False
    if (isConnected()):
      temp = sense.get_temperature()
      print(temp)
      publish(mqtt_client, f"{uid}-temperature", temp)
    time.sleep(5)
  print("Exiting...")
