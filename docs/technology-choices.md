# Technology Choices

## What programming languages to use?
* Backend/Server: Python was chosen for its simplicity and readability, extensive libraries and frameworks, and seamless integration capabilities with databases and third-party APIs.
* Frontend/UI: React Native (JS) was selected to take advantage of code reusability across platforms (iOS and Android), native-like user interface, hot-reloading for real-time development, increased productivity, and a large developer community with abundant resources and libraries.

## What kind of UI? Web-based, other?
* Cross-platform using React Native
* Simple and user-friendly

React Native allows you to build mobile applications with a native-like user experience. It provides access to device-specific features and native components, resulting in an app that feels and performs like a native application. It also can provide a superior user experience compared to web applications, leveraging the full potential of mobile devices for enhanced functionality and interactivity in the "House of Things" application.

## What kind of data storage?
* MongoDB: We have choosen to use a non-relational database, such as MongoDB, to store data like login information, rules, configurations, and other heterogeneous IoT protocol-related data. Given the diverse nature of IoT protocols and the custom rules users can create, a non-relational database offers flexibility and scalability to accommodate varying data structures and handle large volumes of data efficiently. MongoDB's document-oriented approach allows us to store and retrieve data in a schema-less manner, making it well-suited for our project's requirements.

## What kind of communication protocols?
* MQTT (Message Queuing Telemetry Transport) was chosen as the communication protocol for IoT devices. MQTT is lightweight and efficient, making it well-suited for IoT applications with constrained devices and low-bandwidth networks. Its publish-subscribe model enables devices to publish data to specific topics and subscribe to relevant topics, facilitating efficient and asynchronous communication.

* RESTful APIs (Representational State Transfer) were chosen for communication between the frontend and backend components of the system. RESTful APIs provide a standardized and scalable approach for communication over HTTP. They enable the frontend to make HTTP requests to specific endpoints on the backend, allowing data retrieval, updates, and other operations.

## Additional Choices:
* Virtual devices, since they offer the convenience of quick and easy creation, enabling faster testing and development cycles. By eliminating the need for physical hardware, virtual devices significantly reduce costs associated with device acquisition and maintenance.