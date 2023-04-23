from src.api.ApiException import ApiException
from src.model.Division import Division
from src.controller.managers.CrudManager import CrudManager
from src.controller.managers.DeviceManager import DeviceManager


class DivisionsManager(CrudManager):
    def __init__(self, cid: str, device_manager: DeviceManager):
        super().__init__(cid)
        self._divisions: dict[str, Division] = {}
        self._device_manager = device_manager

    def all(self):
        return self._divisions.values()

    def get(self, division_id: str):
        division = self._divisions.get(division_id)
        if division == None:
            raise ApiException("Division not found")
        return division

    def create(self, division_json: dict) -> Division:
        division = Division(
            division_json["name"], division_json["icon"], division_json["devices"]
        )
        self._divisions[division.get_id()] = division
        return division

    def delete(self, division_id: str):
        division = self._divisions.pop(division_id, None)
        if division == None:
            raise ApiException("Division not found")
        division.delete()

    def update(self, division_id: str, config: dict):
        division = self.get(division_id)
        division.update(config)
        return division

    def add_device(self, division_id: str, config: dict):
        uid = config.get("device")
        if uid == None:
            raise ApiException("No device uid provided")

        adapter = self._device_manager.get(uid)
        if adapter == None:
            raise ApiException("No device with uid " + uid)

        division = self.get(division_id)
        division.add_device(uid)

        device = adapter.get_model()
        device.add_division(division_id)

        return division.to_json()

    def remove_device(self, division_id: str, config: dict):
        uid = config.get("device")
        if uid == None:
            raise ApiException("No device uid provided")

        adapter = self._device_manager.get(uid)
        if adapter == None:
            raise ApiException("No device with uid " + uid)

        division = self.get(division_id)
        division.remove_device(uid)

        device = adapter.get_model()
        device.remove_division(division_id)

        return division.to_json()
