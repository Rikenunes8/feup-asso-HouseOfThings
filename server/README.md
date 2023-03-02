# House of Things - Server

An IoT server for the House of Things project. It provides a REST API for the House of Things client to interact with the server and with the house devices.

## Description

The server is a Flask application that uses the MQTT protocol to communicate with the devices. It uses the [paho-mqtt](https://pypi.org/project/paho-mqtt/) library to connect to the MQTT broker and to publish and subscribe to topics. The broker used is [EMQX](https://www.emqx.io/), a free and open source MQTT broker. To config the broker, you may change the variables in the `.env` file as described in [how to run](#how-to-run) section.

The server is a REST API that provides the following endpoints:
| Endpoint                  | Method  | Description |
|---------------------------|:------: |-------------|
| /heartbeat                | GET     | Checks the connection with the server |
| /devices                  | GET     | Returns a list of all the connected devices |
| /devices/{id}/connect     | GET     | Connects to a device using the {id} value | <!--this should be POST in the future and the body should send any information about the kind of the device -->
| /devices/{id}/disconnect  | GET     | Disconnects from a device using the {id} value | <!-- same here -->

## Requirements

To install the dependecies, you may run the following command:

```bash
pip install -r requirements.txt
```


## How to run

Make sure you have a `.env` file in the root of the server directory. The `.env` file should contain the following variables:

```
BROKER='broker.emqx.io'
PORT=1883
USERNAME='emqx'
PASSWORD='public'
```

Then run the following command:

```bash
flask -A src/api.py run
```
