from src.api.ApiException import ApiException
from src.model.Division import Division

from src.controller.managers.CrudManager import CrudManager
from src.controller.managers.DevicesManager import DevicesManager
from src.controller.Logger import Logger
from src.model.devices.ConcreteDevice import ConcreteDevice


class DivisionsManager(CrudManager):
    def __init__(self, cid: str, device_manager: DevicesManager):
        super().__init__(cid)
        self._divisions: dict[str, Division] = {}
        self._device_manager = device_manager

    def all(self):
        return self._divisions.values()

    def get(self, id: str):
        division = self._divisions.get(id)
        if division == None:
            raise ApiException("Division not found")
        return division

    def create(self, data: dict) -> Division:
        division = Division(
            data["name"], data["icon"], data["devices"]
        )
        self._divisions[division.get_id()] = division
        Logger().info(f"Division '{data['name']}' created")
        return division

    def delete(self, id: str):
        division = self._divisions.pop(id, None)
        if division == None:
            raise ApiException("Division not found")
        Logger().info(f"Division '{division.get_name()}' removed")
        division.delete()

    def update(self, id: str, config: dict):
        division = self.get(id)
        division.update(config)
        return division

    def add_device(self, division_id: str, device_uid: str):
        device = self._device_manager.get(device_uid).get()
        division = self.get(division_id)

        division.add_device(device_uid)
        device.add_division(division_id)

        return division

    def remove_device(self, division_id: str, device_uid: str):
        device = self._device_manager.get(device_uid).get()
        division = self.get(division_id)
        
        division.remove_device(device_uid)
        device.remove_division(division_id)

        return division
