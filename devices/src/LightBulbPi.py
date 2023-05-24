import time
import sys

try:
    from sense_hat import SenseHat
except:
    from sense_emu import SenseHat

from utils.mqtt import connect_mqtt, subscribe, publish

sense = SenseHat()
black = (0, 0, 0)
yellow = (255, 255, 0)
red = (255, 0, 0)


def fill(color):
    for x in range(8):
        for y in range(8):
            sense.set_pixel(x, y, color)


start = time.time()


uid = "2"
cid = None  # id of the controller that is connected to the light


def is_connected() -> bool:
    return cid != None


state: bool = False


def on_connect(client, userdata, msg):
    global cid
    if cid != None:
        print(f"Light was already connected by `{cid}`")
        return
    cid = msg.payload.decode()
    fill(black)
    print(f"Light was connected by `{cid}`")
    publish(client, f"{cid}-connected", uid)


def on_disconnect(client, userdata, msg):
    global cid, state
    if cid == None or cid != msg.payload.decode():
        print(f"Light is not connected or is connected to other cid")
        return
    print(f"Light was disconnected by `{cid}`")
    fill(black)
    cid = None
    state = False


def on_turn_on(client, userdata, msg):
    global state
    if cid == None or cid != msg.payload.decode():
        print(f"Light is not connected or is connected to other cid")
        return
    state = True
    fill(yellow)
    print(f"Light was turned on by `{cid}`")


def on_turn_off(client, userdata, msg):
    global state
    if cid == None or cid != msg.payload.decode():
        print(f"Light is not connected or is connected to other cid")
        return
    state = False
    fill(black)
    print(f"Light was turned off by `{cid}`")


def on_available(client, userdata, msg):
    global cid
    if cid != None:
        print(f"Light is not available")
        return
    publish(client, "light-pi-is-available", uid)


def start_mqtt():
    client = connect_mqtt()

    subscribe(client, f"{uid}-connect", on_connect)
    subscribe(client, f"{uid}-disconnect", on_disconnect)
    subscribe(client, f"{uid}-turnOn", on_turn_on)
    subscribe(client, f"{uid}-turnOff", on_turn_off)
    subscribe(client, "is-light-pi-available", on_available)

    client.loop_start()
    return client


red_screen = False

if __name__ == "__main__":
    if len(sys.argv) > 2:
        print("Usage: python3 LightBulbPi.py [uuid]")
        exit(1)
    elif len(sys.argv) == 2:
        uid = sys.argv[1]

    mqtt_client = start_mqtt()
    publish(mqtt_client, "light-pi-is-available", uid)

    running = True
    while running:
        if mqtt_client == None:
            running = False
        if not is_connected():
            if red_screen and int(time.time() - start) % 2 == 0:
                fill(black)
                red_screen = False
            elif not red_screen and int(time.time() - start) % 2 == 1:
                fill(red)
                red_screen = True
        time.sleep(0.1)
