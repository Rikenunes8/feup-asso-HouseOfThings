from src.model.Division import Division
from src.model.devices.ConcreteDevice import ConcreteDevice
from src.controller.managers.Manager import Manager
from src.controller.managers.DeviceManager import DeviceManager

class DivisionsManager(Manager):
    def __init__(self, cid: str, device_manager: DeviceManager):
        super().__init__(cid)
        self._divisions: dict[str, Division] = {}
        self._device_manager = device_manager

    def get_all(self):
        return list(map(lambda division : division.to_json(), self._divisions.values()))

    def add(self, division_json: dict) -> Division:
        division: Division = Division(division_json['name'], division_json['icon'], division_json['devices'])
        self._divisions[division.get_id()] = division
        return division.to_json()

    def remove(self, division_id: str):
        division = self._divisions.pop(division_id, None)
        if division == None: return "Division not found"
        else: division.delete()

    def rename(self, division_id: str, config: dict[str, str]):
        name = config.get("name")
        if name == None: return "No name provided"
        division = self._divisions.get(division_id)
        if division == None: return "Division not found"
        division.rename(name)
        return division.to_json()

    def change_icon(self, division_id: str, config: dict[str, str]):
        icon = config.get("icon")
        if icon == None: return "No icon provided"
        division = self._divisions.get(division_id)
        if division == None: return "Division not found"
        division.change_icon(icon)
        return division.to_json()


    def add_device(self, division_id: str, config: dict):
        uid = config.get("device")
        if uid == None: return "No device uid provided"

        device = self._device_manager.get_device(uid)
        if device == None: return "No device with uid " + uid

        division = self._divisions.get(division_id)
        if division == None: return "Division not found"
        division.add_device(uid)

        concrete_device: ConcreteDevice = device.get()
        concrete_device.add_division(division_id)

        return division.to_json()


    def remove_device(self, division_id: str, config: dict):
        uid = config.get("device")
        if uid == None: return "No device uid provided"

        device = self._device_manager.get_device(uid)
        if device == None: return "No device with uid " + uid

        division = self._divisions.get(division_id)
        if division == None: return "Division not found"
        division.remove_device(uid)

        concrete_device: ConcreteDevice = device.get()
        concrete_device.remove_division(division_id)
        
        return division.to_json()
