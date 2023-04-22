from src.model.Division import Division
from src.controller.managers.Manager import Manager
from src.controller.managers.DeviceManager import DeviceManager

class DivisionsManager(Manager):
    def __init__(self, cid, device_manager: DeviceManager):
        super().__init__(cid)
        self._divisions: dict[str, Division]= {}
        self._device_manager = device_manager

    def add(self, division_json) -> Division:
        division = Division(division_json['name'], division_json['icon'], division_json['devices'])
        self._divisions[division.get_id()] = division
        return self._divisions[division.get_id()]

    def remove(self, division_id):
        division = self._divisions.pop(division_id, None)
        if division == None: return "Division not found"
        else: division.delete()

    def rename(self, division_id, name):
        division = self._divisions.get(division_id)
        if division == None: return "Division not found"
        division.rename(name)
        return division

    def change_icon(self, division_id, icon):
        division = self._divisions.get(division_id)
        if division == None: return "Division not found"
        division.change_icon(icon)
        return division
    
    def add_device(self, division_id, device):
        division = self._divisions.get(division_id)
        if division == None: return "Division not found"
        division.add_device(device)
        return division
    
    def remove_device(self, division_id, device):
        division = self._divisions.get(division_id)
        if division == None: return "Division not found"
        division.remove_device(device)
        return division

    def get_all(self):
        return list(map(lambda division : division.to_json(), self._divisions.values()))
  

    def divisions(self):
        return self.get_all()
    
    def create_division(self, division : dict):
        return self.add(division).to_json()

    def delete_division(self, division_id : str):
        return self.remove(division_id)

    def rename_division(self, division_id: str, config: dict):
        name = config.get("name")
        if name == None:
            return "No name provided"
        division_updated = self.rename(division_id, name)
        if isinstance(division_updated, str): return division_updated
        return division_updated.to_json()
        
    def change_icon_division(self, division_id: str, config: dict):
        icon = config.get("icon")
        if icon == None:
            return "No icon provided"
        division_updated = self.change_icon(division_id, icon)
        if isinstance(division_updated, str): return division_updated
        return division_updated.to_json()
    
    def add_device_division(self, division_id: str, config: dict):
        uid = config.get("device")
        if uid == None:
            return "No device uid provided"
        adapter = self._device_manager.get_device(uid)
        if adapter == None:
            return "No device with uid " + uid
        device = adapter.get_model()
        division_updated = self.add_device(division_id, uid)
        device.add_division(division_id)
        if isinstance(division_updated, str): return division_updated
        return division_updated.to_json()
    
    def remove_device_division(self, division_id: str, config: dict):
        uid = config.get("device")
        if uid == None:
            return "No device uid provided"
        adapter = self._device_manager.get_device(uid)
        if adapter == None:
            return "No device with uid " + uid
        device = adapter.get_model()
        division_updated = self.remove_device(division_id, uid)
        device.remove_division(division_id)
        if isinstance(division_updated, str): return division_updated
        return division_updated.to_json()

