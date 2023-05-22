from src.api.ApiException import ApiException
from src.model.Division import Division
from src.controller.managers.CrudManager import CrudManager
from src.controller.managers.DevicesManager import DevicesManager
from src.controller.Logger import Logger
from src.controller.observer.DeviceConnectionSubscriber import (
    DeviceConnectionSubscriber,
)
from src.database.DB import DB
from src.database.CollectionTypes import Collection


class DivisionsManager(CrudManager, DeviceConnectionSubscriber):
    def __init__(self, cid: str, device_manager: DevicesManager):
        super().__init__(cid)
        self._divisions: dict[str, Division] = {}
        self._device_manager = device_manager
        self._device_manager.subscribe_all(self)

    def all(self):
        return self._divisions.values()

    def get(self, id: str):
        division = self._divisions.get(id)
        if division == None:
            raise ApiException("Division not found")
        return division

    def load(self) -> None:
        divisions = DB().get(Collection.DIVISIONS).find_all()
        for division in divisions:
            try:
                self._create(division, division["id"])
            except ApiException as e:
                continue

    def _create(self, data: dict, division_id: str = None) -> Division:
        division = Division(data["name"], data["icon"], data["devices"], division_id)
        self._divisions[division.get_id()] = division

        actual_devices = []
        for device_uid in data["devices"]:
            try:
                device = self._device_manager.get(device_uid).get()
                device.add_division(division.get_id())
                actual_devices.append(device_uid)
            except ApiException:
                # No problem: device will not be appended
                Logger().warn(
                    f"Did not assign division '{data['name']}' to device with uid '{device_uid}' because it does not exist."
                )
                continue
        division.update({"devices": actual_devices})
        return division

    def create(self, data: dict) -> Division:
        division = self._create(data)
        Logger().info(f"Division '{data['name']}' created.")
        return division

    def delete(self, id: str):
        division = self._divisions.pop(id, None)
        if division == None:
            raise ApiException("Division not found")
        Logger().info(f"Division '{division.get_name()}' removed.")
        for device_uid in division.get_devices():
            try:
                device = self._device_manager.get(device_uid).get()
                device.remove_division(id)
            except ApiException:
                # No problem: just remove all other divisions
                continue
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

    def on_device_connect(self, data: dict = None):
        device = data["device"]
        device_data = device.find()
        actual_divisions = []
        for division_id in device_data["divisions"]:
            try:
                division = self.get(division_id)
                division.add_device(device.get_id())
                actual_divisions.append(division_id)
            except ApiException:
                # No problem: division will not be appended
                Logger().warn(
                    f"Did not assign device '{device_data['name']}' to division with id '{division_id}' because it does not exist."
                )
                continue
        device.get().set_divisions(actual_divisions)
        return True

    def on_device_disconnect(self, data: dict = None):
        device = data["device"]
        for division_id in device.find()["divisions"]:
            try:
                division = self.get(division_id)
                division.remove_device(device.get_id())
            except ApiException:
                # No problem: just remove all other devices
                continue
