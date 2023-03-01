from paho.mqtt import client as mqtt_client
from mqtt import connect_mqtt, subscribe
import random

broker = 'broker.emqx.io'
port = 1883
client_id = f'python-mqtt-{random.randint(0, 1000)}'
username = 'emqx'
password = 'public'

topic = "mqtt-light-connect"


def run():
    def on_message(client, userdata, msg):
        print(f"Connected `{msg.payload.decode()}` from `{msg.topic}` topic")
    client = connect_mqtt()
    subscribe(client, topic, on_message)
    client.loop_forever()


if __name__ == '__main__':
    run()