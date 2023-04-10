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

:: papeis, o que representa esses papeis nessa implementacao em python

## Database Connection: Singleton

### Context

: the design problem to solve + why was this one selected

<!-- Describe the design context that justifies the selection of the pattern. -->

When accessing the database, we need to be able to keep a single connection that we access in the different endpoints of our application.

#### Problem in Context

We want to ensure that there is a single database connection opened in our application at any time, and that this same connection can be used in any part of the application. We desire that establishing this connection is abstracted away from its use.

<!-- Describe the wider design context and the concrete problem to be solved. This must be as complete as possible, someone else other than the original designer should be able to read and understand why it was important (and not trivial) to solve this problem. -->

#### The Pattern

<!-- Identify the pattern that you applied, why it was selected and how it is a good fit considering the existing design context and the problem at hand. -->

We have selected the Singleton pattern to solve this problem, since it provides the following advantages:

- provides consistency, in the way that it ensures there is only one database connection that is reused accross the application, reducing overhead.
- provides a global point of access to the database connection, which can be used in any endpoint.

### Mapping

<!-- Explain how are mapped the pattern's roles, operations and associations to the concrete design classes. -->

<!--
Must include:
   * An enumeration and brief description of how the pattern _roles_, _operations_ and _associations_ were mapped to your concrete implementation.
   * Links to the corresponding source code blocks on your implementation.
   * Figure(s) illustrating your implementation of the pattern (e.g., class diagram, activity diagram).
-->

### Consequences

This pattern has some downsides, as it violates the Single Responsibility Principle by solving two problems at the same time and making it difficult to unit test the code associated with the Singleton. However, since we limit the code of this class to establish the connection to the Mongo database, which we don't need to test thoroughly (as we would basically be testing Mongo itself), we think that this pattern's benefits outweight its liabilities.

As an alternative to this pattern, we could encapsulate the connection to the database as a regular class and instanciate it. Although being able to instanciate this class would facilitate its unit testing, it would require that we passed an instance

<!-- Explain the benefits and the liabilities of instantiating the pattern, eventually in comparison with other alternatives. -->

<!--
Benefits and liabilities (pros and cons) of the design after pattern instantiation, and comparison of these consequences with those of alternative solutions. This section should _not_ describe generic consequences of the pattern, but the specific ones of applying the pattern in your system.
-->

---

## PyMongo Abstraction: Facade

### Context

PyMongo is the Python distribution containing tools for working with MongoDB and it offers a large amount of tools not necessary for the development of House of Things.

#### Problem in Context

We start using PyMongo to interact with the MongoDB database on the server side of the House of Things. The library offers many tools, since the simpler ones, like creating collections and inserting documents, until the most complex ones, like indexes and replication.
However, the use of the library in the House of Things project is very restrict and focused on the basic operations of a database and having so many operations available can be messy.
Beyond that, it is needed to ensure the connection between the aplication and the database before each operation executed on the database.

These two problems together can lead to a greater difficulty in development and make the code become more confused and complex.

#### The Pattern

We have selected the Facade pattern to solve this problem, since it offers the collowing advantages:

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

This pattern also have downsides like being a "god instance" wich every class the access the database must know. It also violates the Single Responsability Principle since it knows how to interact with device, categories, rules, divisions and all other future collections in the database.

This last problem, could be minimize by using Additional Facade classes to prevent polluting a single facade with unrelated features.

---

## Devices Creation: Factory Method

### Context

: the design problem to solve + why was this one selected

<!-- Describe the design context that justifies the selection of the pattern. -->

Problem to solve: the creation, instaciation and management of different kind of devices ?

#### Problem in Context

<!-- Describe the wider design context and the concrete problem to be solved. This must be as complete as possible, someone else other than the original designer should be able to read and understand why it was important (and not trivial) to solve this problem. -->

Devices can have different communication protocols, data formats, and capabilities. When a new device is added, the server needs to know how to communicate with it and how to interpret its data.

#### The Pattern

<!-- Identify the pattern that you applied, why it was selected and how it is a good fit considering the existing design context and the problem at hand. -->

- provides a flexible and extensible way of managing devices, since in IoT

### Mapping

<!-- Explain how are mapped the pattern's roles, operations and associations to the concrete design classes. -->

<!-- Must include:
   * An enumeration and brief description of how the pattern _roles_, _operations_ and _associations_ were mapped to your concrete implementation.
   * Links to the corresponding source code blocks on your implementation.
   * Figure(s) illustrating your implementation of the pattern (e.g., class diagram, activity diagram). -->

### Consequences

<!-- Explain the benefits and the liabilities of instantiating the pattern, eventually in comparison with other alternatives. -->

<!-- Benefits and liabilities (pros and cons) of the design after pattern instantiation, and comparison of these consequences with those of alternative solutions. This section should _not_ describe generic consequences of the pattern, but the specific ones of applying the pattern in your system. -->

The application becomes dependent on the factory to create the devices, which can create a bottleneck if the factory becomes overloaded or fails to perform as expected.

---
