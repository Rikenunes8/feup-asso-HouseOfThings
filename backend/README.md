# House of Things - Server

An IoT server for the House of Things project. It provides a REST API for the House of Things client to interact with the server and with the house devices.

## Description

The server is a Flask application that uses the MQTT protocol to communicate with the devices. It uses the [paho-mqtt](https://pypi.org/project/paho-mqtt/) library to connect to the MQTT broker and to publish and subscribe to topics. The broker used is [EMQX](https://www.emqx.io/), a free and open source MQTT broker. To config the broker, you may change the variables in the `.env` file as described in [how to run](#how-to-run) section.

The server is a REST API that provides the following endpoints:
| Endpoint                  | Method  | Description |
|---------------------------|:------: |-------------|
| /heartbeat                | GET     | Checks the connection with the server |
| /devices                  | GET     | Returns a list of all the connected devices |
| /devices/{id}/connect     | POST    | Connects to a device using the {id} value |
| /devices/{id}/disconnect  | POST    | Disconnects from a device using the {id} value |
| /devices/{id}/action      | POST    | Action to apply in device {id} explicit in JSON body |

## How to run

You can conveniently run the backend server by simply running `docker-compose up`. You may feel the need to tweak some of the environment variables: for that you may just create a `.env` file in the `backend` folder and set the variables there. The variables are:

| Variable | Description | Default value |
|----------|-------------|---------------|
| MONGODB_USERNAME | Username for the MongoDB database | user |
| MONGODB_PASSWORD | Password for the MongoDB database. Only use the default for development! | DEFAULT_PASSWORD_DO_NOT_USE |
| MONGO_ROOT_USERNAME | MongoDB root username | user |
| MONGO_ROOT_PASSWORD | MongoDB root password. Only use the default for development! | DEFAULT_PASSWORD_DO_NOT_USE |
| MONGODB_DATABASE | Database name for the MongoDB database | HoT |
| MQTT_BROKER | MQTT broker address | broker.emqx.io |
| MQTT_PORT | MQTT broker port | 1883 |
| MQTT_USERNAME | MQTT broker username | emqx |
| MQTT_PASSWORD | MQTT broker password. Only use the default for development! | DEFAULT_PASSWORD_DO_NOT_USE |
