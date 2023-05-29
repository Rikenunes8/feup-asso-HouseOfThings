<!--
Why document pattern instances

Documenting pattern instances helps other developers understand a system, with its concrete classes, attributes and methods, and the design decisions behind them. This provides a level of abstraction higher than the class level, highlighting commonalities and thus promoting the understandability, conciseness and consistency of the documentation. At the same time, the documentation of pattern instances help developers to certify themselves that they're taking the right decisions. In general terms, this results in better communication in the development team and, consequently, in less bugs.

The documentation of pattern instances, allows other designers to learn from them and makes it possible to trace the design path from the problem to the implementation of the solution. It can easily reflect the similarities and differences between the several problems encountered during analysis and design, and contribute to eventually finding common compositions of patterns that are particular to the problem domain at hand, thus promoting the understandability, conciseness and consistency of the documentation, and preserving development knowledge.
-->

<!-- How to write pattern instance documentation

To formally document a pattern instance we must describe the design context, the design problem to solve, why the pattern was selected given the context and problem, how the pattern roles, operations and associations are mapped to the concrete design classes and the consequences of instantiating the pattern. You can find an example of this kind of documentation in the third section of ["JUnit: A Cook's Tour"](https://web.archive.org/web/20221128004056/junit.sourceforge.net/doc/cookstour/cookstour.htm).

Likewise, in this document each section should describe a different pattern instance. Name the sections according to the design problems that you have solved, and structure them according to the following sub-sections:

 * **Problem in Context.** Describe the wider design context and the concrete problem to be solved. This must be as complete as possible, someone else other than the original designer should be able to read and understand why it was important (and not trivial) to solve this problem.
 * **The Pattern.** Identify the pattern that you applied, why it was selected and how it is a good fit considering the existing design context and the problem at hand. Must include:
   * An enumeration and brief description of how the pattern _roles_, _operations_ and _associations_ were mapped to your concrete implementation.
   * Links to the corresponding source code blocks on your implementation.
   * Figure(s) illustrating your implementation of the pattern (e.g., class diagram, activity diagram).
 * **Consequences.** Benefits and liabilities (pros and cons) of the design after pattern instantiation, and comparison of these consequences with those of alternative solutions. This section should _not_ describe generic consequences of the pattern, but the specific ones of applying the pattern in your system.
-->

# House of Things – Pattern Instances

## Database Connection: Singleton [OUTDATED, TODO: UPDATE]

### Context

When accessing the database, we need to be able to keep a single connection that we access in the different endpoints of our application.

#### Problem in Context

We want to ensure that there is a single database connection opened in our application at any time, and that this same connection can be used in any part of the application. This last requisite isn't so trivial to solve given that each endpoint to our REST API is a Flask view, so it doesn't receive parameters other than the URL parameters. This makes passing objects around more difficult.

Moreover, we desire that establishing the connection to the database is abstracted away from its use, since it should be established only once and the code that uses the database shouldn't have to worry about whether the connection has already been established or not.

#### The Pattern

We have selected the Singleton pattern to solve this problem, since it provides the following advantages:

- provides consistency, in the way that it ensures there is only one database connection that is reused accross the application, reducing overhead.
- provides a global point of access to the database connection, which can be used in any endpoint.

### Mapping

Due to the specificities of Python, namely the fact that there is no way to declare a constructor private, the Singleton pattern acquires a slightly different form than usual. The method we adopted makes use of metaclasses.

The class [`DB`](https://github.com/FEUP-MEIC-ASSO-2023/G5/blob/develop/backend/src/database/DB.py) is the Singleton, of which only one instance may exist. Its metaclass, [`DBMeta`](https://github.com/FEUP-MEIC-ASSO-2023/G5/blob/develop/backend/src/database/DB.py) overrides the `__call__` method, which takes the role of getting the instance to `DB`, creating one if needed (tradicionally, this role would have been fulfilled by a `getInstance()` method in the Singleton class). Overriding the `__call__` method of the metaclass also has the side effect of hiding the constructor of the Singleton class, which is a good thing, since it effectively has a similar effect to making the constructor private. The metaclass also holds the set of instances of Singleton classes that use it as a metaclass. In our current implementation, only `DB` uses it as its metaclass, so there may only be one instance.

<div align="center">
  <img src="./img/patterns/Singleton.png" alt="SingletonPattern">
  <p style="margin-top:10px"><i>Figure 1: HoT Singleton Pattern</i></p>
</div>

### Consequences

Although it provides the aforementioned advantages, this pattern has some downsides, as it promotes tight coupling between the components of the application and makes it difficult to unit test the code associated with the Singleton. However, if we limit the code of this class to establish and use the connection to the Mongo database, which we don't need to test thoroughly (as we would basically be testing Mongo itself), we think that this pattern's benefits outweight its liabilities.

Since with this implementation of the pattern the Singleton's lifecycle is managed by the metaclass, contrary to the tradicional implementation, it does not violate the Single Responsibility Principle. In fact, the Singleton class itself is only responsible for establishing and using the connection to the database, and doesn't have to worry about whether it is a Singleton. It only needs to specify its metaclass.

As an alternative to this pattern, we could encapsulate the connection to the database as a regular class and instanciate it. Although being able to instanciate this class would facilitate its unit testing, it would be harder to pass this instance around the application, especially to the Flask views. There is also the possibility of using a global variable to store the database connection, but this would be even more difficult to unit test and also be more easy to misuse in a way that causes unintended side effects, such as rewriting the contents of the variable.

---

## PyMongo Abstraction: Facade [OUTDATED, TODO: UPDATE]

### Context

PyMongo is the Python distribution containing tools for working with MongoDB and it offers a large amount of tools not necessary for the development of House of Things.

#### Problem in Context

We start using PyMongo to interact with the MongoDB database on the server side of the House of Things. The library offers many tools, since the simpler ones, like creating collections and inserting documents, until the most complex ones, like indexes and replication.
However, the use of the library in the House of Things project is very restrict and focused on the basic operations of a database and having so many operations available can be messy.
Beyond that, it is needed to ensure the connection between the aplication and the database before each operation executed on the database.

These two problems together can lead to a greater difficulty in development and make the code become more confusing and complex.

#### The Pattern

We have selected the Facade pattern to solve this problem, since it offers the following advantages:

- provides a single way to connect the database and avoid it to be called everytime it is need to make a database operation.
- provides specific methods, only the ones required for the context of House Of Things, abstracting the entire application of the PyMongo library but a single a class.

### Mapping

The class [`DB`](https://github.com/FEUP-MEIC-ASSO-2023/G5/blob/develop/backend/src/database/DB.py) is the Facade class which depends on **PyMongo**.
This class is associated with every class that needs to access the Database ([`Device`](https://github.com/FEUP-MEIC-ASSO-2023/G5/blob/develop/backend/src/model/devices/Device.py), [`Rule`](https://github.com/FEUP-MEIC-ASSO-2023/G5/blob/develop/backend/src/model/rules/Rule.py), [`HoT`](https://github.com/FEUP-MEIC-ASSO-2023/G5/blob/develop/backend/src/HoT.py#L82))

<div align="center">
  <img src="./img/patterns/Facade.png" alt="FacadePattern">
  <p style="margin-top:10px"><i>Figure 2: HoT Facade Pattern</i></p>
</div>

### Consequences

This pattern revealed to be very useful to reduce the quantity of code needed to interact with the database and keep them consistent. It allowed to have a single spot where the schema of the documents in the database are defined for each collection. It also allowed to have a dozen of simple and concise methods instead of having to choose between many more by choosing to interact directly with PyMongo.

This pattern also have downsides like being a "god instance", in which every class that accesses the database must know. It also violates the Single Responsability Principle since it knows how to interact with device, categories, rules, divisions and all other future collections in the database.

This last problem, could be minimized by using Additional Facade classes to prevent polluting a single facade with unrelated features.

---

## Devices Creation: Factory Method [OUTDATED, TODO: REMOVE]

### Context

There are different models that can be created according to a specific input. Each model has its specific state and behavior.

#### Problem in Context

Devices can have different data formats, and capabilities. When a new device is added, the server needs to create the model of the device in order to save it in the database. This leads to a problem where each device model needs to be treated in a different way and with a different data structure.

#### The Pattern

The pattern **Factory Method** is a creational pattern that provides an interface for creating objects in a superclass, but allows subclasses to alter the type of objects that will be created. The pattern is used to create objects without specifying the exact class to create, while this responsability is delegated to the Factory subclasses.

### Mapping

The class [`DeviceAdapter`](https://github.com/FEUP-MEIC-ASSO-2023/G5/blob/develop/backend/src/controller/adapter/DeviceAdapter.py) is the Creator/Factory class that as an abstract method `create_model` that is implemented by the subclasses of `DeviceAdapter` ([`LightBulbPiAdapter`](https://github.com/FEUP-MEIC-ASSO-2023/G5/blob/develop/backend/src/controller/adapter/LightBulbPiAdapter.py), [`ThermometerPiAdapter`](https://github.com/FEUP-MEIC-ASSO-2023/G5/blob/develop/backend/src/controller/adapter/ThermometerPiAdapter.py), and others). In this context the factory method is the `create_model` method and it does not returns the model class as most known one, but instead it assigns it to the `model` attribute of the `DeviceAdapter` class to be used later in the flow.

<div align="center">
  <img src="./img/patterns/FactoryMethod.png" alt="FactoryMethodPattern">
  <p style="margin-top:10px"><i>Figure 4: HoT Factory Method Pattern</i></p>
</div>

### Consequences

This pattern has a big advantage, since it allows the creation of new device models without the need to change the `DeviceAdapter` class. However, it may lead to a lot of subclasses of `DeviceAdapter` that can be hard to maintain. Since we expect to have multiple adapters for each single device model, we expect that we will not run into the parallel hierarchy problem.

---

## Real Devices Interaction: Strategy

### Problem in Context
Each real world device has its own way of being controlled and its own way of sending data. This means that each device has its own communication protocol, including the discoverabilty, connection and action protocols. Therefore, it is necessary to have a way to interact with each device in a different way, what would lead to a lot of dependencies between the classes that interact with the devices and the classes that represent the devices.

### The Pattern
In order to make the device class unaware of the specific protocol used to communicate with the device, we have used the Strategy pattern. This pattern allows the device to simple know an interface that it can use to communicate with the device, and the specific protocol is implemented in a class that implements that interface. This way, the device class is not aware of the specific protocol used to communicate with the device.

Since the device connector is attached to the device class on its creation, every time the device needs to communicate with the real device, it simply calls the methods of the connector, without knowing the specific protocol used to communicate with the device, but knowing that somehow the connector will be able to communicate with the device, independently of the protocol used.

<div align="center">
  <img src="./img/patterns/Strategy.svg" alt="RealDeviceInteraction_Strategy">
  <p style="margin-top:10px"><i>Figure x: HoT Real Device Interaction - Strategy Pattern</i></p>
</div>


### Consequences

This pattern allows the device class to be unaware of the specific protocol used to communicate with the device, which is a big advantage, since it allows the device class to be independent of the specific protocol used to communicate with the device.

Devices manager must be aware of the different strategies to be able to select a proper one for a device.

---

## Devices Connector Creation: Simple Factory

### Problem in Context

The model and controller class to be instanciated when a device is added is determined by a JSON object sent by the client in the request. This leads to a problem where those classes can't be instanciated _a priori_, so they need to be created dynamically, according to a certain input.

Devices can have different communication protocols, data formats, and capabilities. When a new device is added, the server needs to know how to communicate with it and how to interpret its data. However, the server should determine the connector to be used to communicate with the device, serving as the bridge between the real device and the one represented by the application, according to the device's category and communication protocol sent by the client in a JSON object as strings.

### The Pattern

The pattern corresponds to the existence of a factory class that has a single creational method and is able to create classes of a certain parent dynamically, according to the input.

The class [`DevicesManager`](https://github.com/FEUP-MEIC-ASSO-2023/G5/blob/master/backend/src/controller/managers/DevicesManager.py) is the factory class responsible to create the device connector classes (entities that know how to communicate to a physical device), according to the input received from the client. On the factory perspective, it has a single method `make_connector` that receives the configuration details of the connector to be created and returns the device connector class or any of its sub classes ([`DeviceConnector`](https://github.com/FEUP-MEIC-ASSO-2023/G5/blob/master/backend/src/controller/device_connectors/DeviceConnector.py)).

<div align="center">
  <img src="./img/patterns/SimpleFactory.png" alt="SimpleFactoryPattern">
  <p style="margin-top:10px"><i>Figure 3: HoT Simple Factory Pattern</i></p>
</div>

### Consequences

This pattern has a big disadvantage, since it forces the `make_connector` method of the class `DevicesManager` to be updated every time there is a new device connector class responsible for deal with a new real device. However, there aren't many alternatives to solve this problem, since the device adapter classes are created dynamically and the factory class needs to know the classes to be created.

The `Builder` pattern could be used to minimize the changes needed to be done since it would be possible to reuse, at least, parts of the communication protocol like the discoverability methods or connect and disconnect protocols. However, we would still not avoid the bad switch case.

Despite that, there is a solution that can be further explored to solve this problem consisting on metaprograming to determine what DeviceConnector classes could be feasible to be created from the configuration details received from the client.

---

## Device Structure: Decorator

### Problem in Context
There are almost infinite devices in the world and each one has its own capabilities and combination of funcionalities. This means that it would be necessary to create a class for each device, which would be impossible to maintain, and would lead to a lot of duplicated code. Although, each device has a finite set of capabilities like turning it on or off, getting the environment temperature, etc, and these capabilities may be reused among different devices.

### The Pattern
In order to solve this problem, we have used the Decorator pattern. This pattern allows us to create a class for each capability, and then combine them to create an object that has all the capabilities of the device and represent it. This way, we can reuse the capabilities among different devices, and we can create a class for each device by combining the capabilities that the device has.

Beyond the device capabilities, it also has some specific attributes like the name of the device, the divisions that it belongs to and the knowledge of how to communicate with the real device (through the `DeviceConnector`). Therefore, the `Device` class is the decorator class that combines the capabilities and the concrete device (`ConcreteDevice`), the one that has the other attributes. Each capability is represented by a class that inherits from the `Device` class, the `BaseCapability`. The `BaseCapability` must contain another `Device` object, which is another capability or the concrete device. Each subclass of `BaseCapability` must be a single and small capability, like a Power capability or a Temperature capability. Each capability has its own state and its own way of being updated.

The final representation of a device will consist on `BaseCapability` on top of other `BaseCapability` until the concrete device is reached. This way, the concrete device will be always reachable as well as all the capabilities of the device.

<div align="center">
  <img src="./img/patterns/Decorator.svg" alt="DeviceStructure_Decorator">
  <p style="margin-top:10px"><i>Figure x: HoT Device Structure - Decorator Pattern</i></p>
</div>


### Consequences
This pattern allows us to reuse the capabilities among different devices and create an instance of a device from any capabilities combination.

The creation of the device could become very complex, since it is necessary to create a lot of objects and combine them. However, the solution to this problem was figured out and it is explained in the next section.

As a disadvantage, any `Device` is aware of the concrete device through the `get` method that, from any point of the stack of `BaseCapability`, returns the concrete device by calling the `get` method of the `Device` object that it contains until the concrete device is reached and returns itself. This makes the methods of the `ConcreteDevice` being accessible from any `BaseCapability` without overload the `Device` class with methods not needed for a simple capability class, however it makes a bidirectional dependecy, even though it is not severe.

This structure ended by not being very helpfull since it made the decisions fall on a chain of responsabilities through all the `Device`s stacked very often.

An other possibility to address this problem would be to use the `Composite` pattern, which associate the capabiilities to a device without making them a `Device`. It would be probably simpler, although it would not eliminate all the problems with the chain of responsabilities previously mentioned.

---

## Device Creation: ? TODO: is there a name for what we did?

### Problem in Context

### The Pattern

### Consequences

---

## Device Actions: Chain of Responsibility

### Problem in Context
There is a specific command (e.g. turn_on, set_color, ...) to make an action in a device but only a respective capability has the capacity to understand the request and execute it. Therefore, the server needs to know which capability is responsible for the action requested by the client and send the request to the respective capability. It would be very hard to get the correct handler _à priori_.

### The Pattern
The solution to this problem was to use the Chain of Responsibility pattern. This pattern consists on a chain of objects - already implicit due to the Decorator structure used to represent devices - that can handle a action request. If it can handle the request, it executes the action, either way it passes the request to the next object in the chain. The request transmission is not stoped when it is handled because it needs to achieve the `ConcreteDevice` to execute the action in the real device, as only this one knows the connector. This way, the server only needs to send the request to the first object of the chain, and the request will be passed through the chain until it reaches the correct handlers.

<div align="center">
  <img src="./img/patterns/ChainOfResponsibility.svg" alt="Device Actions - Chain of Responsibility">
  <p style="margin-top:10px"><i>Figure x: HoT Device Actions - Chain of Responsibility Pattern</i></p>
</div>

### Consequences
This pattern is very suitable together with the Decorator pattern already in use and explianed before, as it is already a chain of objects.

The main advantage of this pattern is that the server does not need to know which capability is responsible for the action requested by the client, it only needs to send the request to the first object of the chain. This way, the server is decoupled from the capabilities and the capabilities are decoupled from each other.

The main disadvantage of this pattern is that the request is passed through the chain until it reaches the final handler, which means that the request is passed through all the capabilities of the device. This can be a problem when the chain of responsibilities is long, since it is passed through all the capabilities of the device. However, we are not counting with a long chain of responsibilities, since the devices use to be simple and have a few capabilities so this issue may not be a problem on practice.

---

## Devics Self Updated: Observer

## Device State Update: Template Method

## Division Devices Management: Observer

## Rule Execution: Command

## Rules Different Actions: Template Method

## Device Bridge To Notify Rules: Bridge And Observer

## Rule Automated Execution: Observer and Chain of Responsibility
