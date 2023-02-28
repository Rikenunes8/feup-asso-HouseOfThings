# Architecture Envisionment

## Several subsystems and how they are connected

We have two main subsystems, UI and Server that communicate through Rest API.

In the context of the project, devices will be mainly virtual (mocks) and will communicate with the Server through MQTT.

## Main architectural and design challenges

1. How will the data from the sensors be filtered?
2. How will the rules of the system be defined?
3. How to deal with the different configurations of the devices (even in devices of the same type)
4. How to make our system fault-prone?
5. How to store the history of devices for later analysis?
6. How to design our system to be able to extend to work in real-world mode, connecting to real devices?
7. How to make our system to be easily extendend to different types of devices?
8. How to detect new devices in the network (plug and play)?
9. How to ensure our system is secure? 

## Patterns we plan on using to address those challenges

1. Pipes and Filters Architecture: for processing the data received from the sensors, performing data filtering (e.g. remove data that is outside a certain range) and/or data transformation (e.g. transform data from different sources into a standardize format). 
2. Rule-based Architecture: to define the behavior of the system based on the data collected from the IoT devices making it easier to maintain and modify as the rules can be updated or added without requiring changes to the underlying code.
7. Microservices Architecture (Independent Components style): services/modules developed and deployed independently, making it easier to scale and maintain the system.