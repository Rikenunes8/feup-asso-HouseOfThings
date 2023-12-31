import sys
import json
import time
import pygame

from utils.mqtt import connect_mqtt, subscribe, publish
from utils.Drawer import Drawer
from PIL import ImageColor

drawer: Drawer = None

turned_off_color = ImageColor.getrgb("#9D9FA4")
initial_color = ImageColor.getrgb("#FFFF00")
color_red = (255, 0, 0)

start = time.time()


uid = "5"
cid = None  # id of the controller that is connected to the light


def is_connected() -> bool:
    return cid != None


state = False
rgb = initial_color
brightness = 100


def bright(component):
    return round(component * brightness / 100)


COLOR = [bright(c) for c in rgb]


def fill(color):
    global COLOR
    COLOR = [bright(c) for c in color]


def on_connect(client, userdata, msg):
    global cid
    if cid != None:
        print(f"Light was already connected by `{cid}`")
        return
    cid = msg.payload.decode()
    fill(turned_off_color)
    print(f"Light was connected by `{cid}`")
    publish(client, f"{cid}-connected", uid)


def on_disconnect(client, userdata, msg):
    global cid, state, rgb, brightness
    if cid == None or cid != msg.payload.decode():
        print(f"Light is not connected or is connected to other cid")
        return
    print(f"Light was disconnected by `{cid}`")
    fill(turned_off_color)
    cid = None
    state = False
    rgb = initial_color
    brightness = 100


def on_turn_on(client, userdata, msg):
    global state, rgb, brightness
    data = json.loads(msg.payload.decode())
    data_cid = data.get("cid")
    data_color = data.get("color")
    data_brightness = data.get("brightness")
    if cid == None or cid != data_cid:
        print(f"Light is not connected or is connected to other cid")
        return
    state = True
    if data_color != None:
        color = ImageColor.getrgb(data_color)
        if color != None:
            rgb = color
    if data_brightness != None and data_brightness >= 0 and data_brightness <= 100:
        brightness = data_brightness
    fill(rgb)
    print(f"Light was turned on by `{cid}`")


def on_turn_off(client, userdata, msg):
    global state
    if cid == None or cid != msg.payload.decode():
        print(f"Light is not connected or is connected to other cid")
        return
    state = False
    fill(turned_off_color)
    print(f"Light was turned off by `{cid}`")


def on_available(client, userdata, msg):
    global cid
    if cid != None:
        print(f"Light is not available")
        return
    publish(client, "light-complex-virtual-is-available", uid)


def start_mqtt():
    client = connect_mqtt()

    subscribe(client, f"{uid}-connect", on_connect)
    subscribe(client, f"{uid}-disconnect", on_disconnect)
    subscribe(client, f"{uid}-turnOn", on_turn_on)
    subscribe(client, f"{uid}-turnOff", on_turn_off)
    subscribe(client, "is-light-complex-virtual-available", on_available)

    client.loop_start()
    return client


def start_drawer():
    global drawer
    pygame.init()

    print(f"Starting ComplexLightBulbVirtual with uid `{uid}`")

    drawer = Drawer(f"ComplexLightBulbVirtual uid `{uid}`")


red_screen = False

if __name__ == "__main__":
    if len(sys.argv) > 2:
        print("Usage: python3 ComplexLightBulbVirtual.py [uuid]")
        exit(1)
    elif len(sys.argv) == 2:
        uid = sys.argv[1]

    mqtt_client = start_mqtt()
    publish(mqtt_client, "light-virtual-is-available", uid)
    start_drawer()

    fill(turned_off_color)

    running = True
    while running:
        if mqtt_client == None:
            running = False
        if not is_connected():
            brightness = 100
            if red_screen and int(time.time() - start) % 2 == 0:
                fill(turned_off_color)
                red_screen = False
            elif not red_screen and int(time.time() - start) % 2 == 1:
                fill(color_red)
                red_screen = True
        drawer.drawLight(is_connected(), state, COLOR)
        time.sleep(0.1)
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
    pygame.quit()
