# House of Things - Client

An IoT client for the House of Things project. It is a cross-platform application for the House of Things to interact with the server and with the house devices.

## Description

The client is a react-native application that uses the server REST API to communicate with the server and with the devices.

## How to run

You can conveniently run the client by simply installing Node.js and running `npm install` and `npm start`. If you want to run as if it were in production mode, run `npm start --no-dev --minify` instead. You may feel the need to tweak some of the environment variables: for that you may just create a `.env` file in the `frontend` folder and set the variables there. The variables are:

| Variable | Description | Default value |
| --- | --- | --- |
| REACT_APP_SERVER_IP | Server IP address | localhost |
| REACT_APP_SERVER_PORT | Server port | 5000 |
