# House of Things - Domain Analysis

## Domain Description

Home IoT (House of Things) is a system that groups multiple devices of different types with which a user interacts. In addition, the devices are also able to interact with each other.

A device can be considered a sensor, an actuator, or both. Within these groups the possibilities are limitless, however their easy extension must be ensured. Furthermore, devices are of a certain type that fall into a category and, more specifically, a subcategory. A device can still be associated with divisions (groups created by the user not necessarily associated with a physical space).

The system is fully configurable through the definition of rules, where actions are defined for one or more triggers. Both actions and triggers can be of different natures. Conditions may be based on the state of a device or on the current time and date. Actions may affect a device or notify the user.

Viewing and managing the status of a device live are essential tasks. It is therefore possible to know what is happening at any moment as well as to have access to the history of changes, in order to be able to find possible inconsistencies. For that, events in the system are stored as logs.

## Domain Model

The domain described in the previous section is illustrated by the UML diagram below.

<div align="center">
  <img src="./img/HoT-domain_model.png" alt="UML_Class_Diagram_Domain_Model">
  <p style="margin-top:10px"><i>Figure 1: House of Things Domain Model</i></p>
</div>

### Entities

The HoT domain model contains the following main entities:

- **House**: central logic entity
- **Device**: virtual or physical entity that has intelligent capabilities
- **Sensor**: device that collects data from the world
- **Actuator**: device that interacts with the world, moving and controlling a mechanism or system
- **Category**: generic aggregator of different types of devices (eg.: lights, sensor...)
- **SubCategory**: specific types of devices (eg.: thermometer)
- **Division**: virtual aggregation of several devices of one or more kind, defined by the user
- **Rule**: statement that defines the conditions that must be met for a certain action to be performed
- **Condition**: statement that is verified to trigger an action
- **Device Condition**: condition based on the state of a device
- **Schedule Condition**: condition based on the current time or date
- **Action**: statement that is executed upon a condition being met
- **Device Action**: action that affects a device
- **Notification Action**: action that notifies the user
- **Log**: entry in the history of the system's past events
- **User**: person that interacts with the system

### Relationships

In this diagram, the problem is schematized from a more abstract and conceptual point of view.

A user lives and interacts with a given house, while each house can have multiple users associated with it.

The house connects several devices, both sensors and actuators. Each device is belongs to a sub-category, which in turn belongs to a category. In addition, a set of devices may be aggregated as a division. Each category must be composed of at least one sub category, but each sub category or division may have 0 devices.

A house has a set of rules associated with it. Rules are composed of conditions and actions. Conditions can be associated with a device or the current time/date. Actions can be associated with a device or a notify the user.

A home also stores the history of changes in the state of a device, in the form of a list of log entries.
