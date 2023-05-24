# House of Things - Server

An IoT server for the House of Things project. It provides a REST API for the House of Things client to interact with the server and with the house devices.

## Description

The server is a Flask application that uses the MQTT protocol to communicate with the devices. It uses the [paho-mqtt](https://pypi.org/project/paho-mqtt/) library to connect to the MQTT broker and to publish and subscribe to topics. The broker used is [EMQX](https://www.emqx.io/), a free and open source MQTT broker. To config the broker, you may change the variables in the `.env` file as described in [how to run](#how-to-run) section.

The swagger documentation for the REST API of the server is available at `/swagger` endpoint when the server is running.

## How to run

You can conveniently run the backend server by simply running `docker-compose up`. Logs for MongoDB, Flask and MQTT may be found in the `backend/logs` folder. You may feel the need to tweak some of the environment variables: for that you may just create a `.env` file in the `backend` folder and set the variables there. The variables are:

| Variable              | Description                                                              | Default value                       |
| --------------------- | ------------------------------------------------------------------------ | ----------------------------------- |
| APP_ENV               | Application environment (production or development)                      | development                         |
| MONGODB_ROOT_USERNAME | MongoDB root username                                                    | admin                               |
| MONGODB_ROOT_PASSWORD | MongoDB root password. Only use the default for development!             | DEFAULT_PASSWORD_DO_NOT_USE         |
| MONGODB_USERNAME      | Username for the MongoDB database                                        | user                                |
| MONGODB_PASSWORD      | Password for the MongoDB database. Only use the default for development! | DEFAULT_PASSWORD_DO_NOT_USE         |
| MONGODB_HOSTNAME      | MongoDB hostname                                                         | localhost, mongodb inside container |
| MONGODB_PORT          | MongoDB port                                                             | 27017                               |
| MONGODB_DATABASE      | Database name for the MongoDB database                                   | HoT                                 |
| MQTT_BROKER           | MQTT broker address                                                      | localhost, mqtt inside container    |
| MQTT_PORT             | MQTT broker port                                                         | 1883                                |
| MQTT_USERNAME         | MQTT broker username                                                     | emqx                                |
| MQTT_PASSWORD         | MQTT broker password. Only use the default for development!              | DEFAULT_PASSWORD_DO_NOT_USE         |
| MQTT_SECRET           | MQTT broker secret cookie                                                | DEFAULT_SECRET_DO_NOT_USE           |

Note: if you intend to use this server in production, it is **strongly recomended** that you set `APP_ENV`, `MONGODB_PASSWORD`, `MONGO_ROOT_PASSWORD`, `MQTT_PASSWORD`, and `MQTT_SECRET` for safety reasons. 

You will need to set up the user in the MQTT broker (unless you set `MQTT_BROKER` to `broker.emqx.io` for testing purposes). For that, open `http://127.0.0.1:18083/#/` and login to the MQTT Dashboard using `admin` username and `public` password (you will be prompted to set a safer password), so that you can create a user with the username and password you set in the `.env` file for MQTT.

If you are not a docker fan, you can alternatively still create the `.env` file, install the dependecies with `pip install -r requirements.txt`, and run `python3 app.py`.

An example of an `.env` for development:

```
APP_ENV=development
MONGODB_HOSTNAME=localhost
MONGODB_PORT=27017
MONGODB_DATABASE=HoT

MQTT_BROKER='broker.emqx.io'
MQTT_PORT=1883
MQTT_USERNAME='emqx'
MQTT_PASSWORD='DEFAULT_PASSWORD_DO_NOT_USE'
```
