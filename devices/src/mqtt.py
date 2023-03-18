import os
import time
import random
from dotenv import load_dotenv
from paho.mqtt import client as mqtt_client


load_dotenv('.env')

broker = os.environ.get('MQTT_BROKER')
port = int(os.environ.get('MQTT_PORT'))
username = os.environ.get('MQTT_USERNAME')
password = os.environ.get('MQTT_PASSWORD')

def connect_mqtt() -> mqtt_client.Client:
  def on_connect(client, userdata, flags, rc):
    if rc == 0:
      print("Connected to MQTT Broker!")
    else:
      print("Failed to connect, return code %d\n", rc)

  client_id = f'python-mqtt-{random.randint(0, 1000)}'
  
  client = mqtt_client.Client(client_id)
  client.username_pw_set(username, password)
  client.on_connect = on_connect
  client.connect(broker, port)
  return client

def disconnect_mqtt(client: mqtt_client.Client):
  client.disconnect()


def publish(client : mqtt_client.Client, topic : str, msg : str):
  while True:
    time.sleep(1)
    result = client.publish(topic, msg)
    # result: [0, 1]
    status = result[0]
    if status == 0:
      print(f"Successfully sent `{msg}` to topic `{topic}`")
      break
    else:
      print(f"Failed to send message to topic {topic}")

def subscribe(client: mqtt_client.Client, topic: str, on_message: callable):
  client.subscribe(topic)
  client.message_callback_add(topic, on_message) 
