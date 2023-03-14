# House of Things - Virtual Devices

This repository contains the virtual devices used in the House of Things project.

## Requirements

To install the dependecies, you may run the following command:

```bash
pip install -r requirements.txt
```


## How to run

If you want to use a device that connects to the MQTT broker, make sure you have a `.env` file in the root of the virtual_devices directory. The `.env` file should contain the following variables:

```
MQTT_BROKER='broker.emqx.io'
MQTT_PORT=1883
MQTT_USERNAME='emqx'
MQTT_PASSWORD='DEFAULT_PASSWORD_DO_NOT_USE'
```

Then run the following command, where `<device>` can be any of the devices in the `virtual_devices` directory (e.g. `vLightMqtt`):

```bash
python3 <device>.py [uuid]
```
