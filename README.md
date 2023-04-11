# House of Things

Welcome to the repository for the _House of Things_ project, developed in the context of the [ASSO/2022-23 course](https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=501938). Our product is a software system to monitor, control, and manage home automation devices and activities. We provide a user-friendly mobile frontend, as well as a robust backend capable of operating in contexts with multiple devices, including sensors, actuators and hubs.

<!-- Explain here in one or two sentences what are the goals of your product. --> 

## Features and usage

Our product currently permits:

    - Configuring the system visually with an intuitive and aesthetically pleasing mobile application.
    - Checking the system state live by opening the respective device in the application. For virtual devices, it is also possible to check its state from its virtual control panel.
    - Adding triggers and actions, so that based on a given condition the state of the devices is changed.
    - Grouping devices in divisions, which may or may not correspond to physical divisions in your house.
    - Using virtual devices. Moreover, our design is ready to extend to real devices and to new kinds of devices (with different state or protocol).
    - Discovering new devices that are available.
    - Integrating easily with other systems such as Discord or Whatsapp, provided that the integration program (i.e. Discord bot) communicates with our backend with the REST API we defined.
    - Easily deploying our backend to different kinds of hardware and infrastructure thanks to Docker, as well as our backend to different kinds of platforms (IOS, Android, Web) thanks to React Native.
    - Gracious exception handling.

<!-- Enumerate and describe the features (functional requirements) that your product currently provides -->

<!-- Briefly explain how to use your software from the standpoint of its users. This can include a short video, one or two screenshots, and a textual explanation.-->

## Getting started with development

<!-- Very briefly explain how to build, run the tests and run the application itself in a development environment. -->

In order to run the application, you need to run both the frontend and the backend. For the backend, you may use docker with the command `docker-compose up` in the `backend` folder. For more information, namely regarding environment variables, see the [backend README](backend/README.md). For the frontend you may run `npm expo start` in the `frontend` folder, and then scan the QR code in the console with your phone (provided you have installed [ExpoGo](https://expo.dev/client)).

You may want to connect virtual devices to test the application. For running virtual devices, refer to the [devices README](devices/README.md).

<!-- ## Packaging and deploying -->

<!-- Very briefly explain how to package, deploy and run the system to a production (or production-like) environment. -->

<!-- ... -->

## Design and architecture

 * [Domain analysis](docs/domain-analysis.md) <!-- Includes description of the domain, illustrated by a domain model (UML class diagram). -->
 * [Architectural overview](docs/architectural-overview.md) <!-- Includes description of the architecture, illustrated by architectural diagrams (UML component and/or deployment diagrams). The description should enumerate and describe the quality attributes (non-functional requirements) that your product currently provides, and how does that relate to the architecture. -->
 * [Pattern instances](docs/pattern-instances.md) <!-- See sample file for further instructions -->

## Group members

| Name                  | Number    |
| --------------------- | --------- |
| Henrique Nunes        | 201906852 |
| Margarida Ferreira    | 201905046 |
| Patrícia Oliveira     | 201905427 |
| Pedro Correia         | 201905348 |
| Sara Marinha          | 201906805 |
| Victor Nunes          | 201907226 |

