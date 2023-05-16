from src.model.rules.Action import Action
from src.model.devices.Device import Device
from src.controller.managers.DevicesManager import DevicesManager
from discord import SyncWebhook



class DiscordMessageAction(Action):
    def __init__(self, data: dict) -> None:
        self._url = data.get("url")
  
    def execute(self, data: dict) -> Device:
        webhook = SyncWebhook.from_url("https://discord.com/api/webhooks/1108084159903178892/-wfJopfOfAmXNI-XYh2sZA20Q1CxMmgOYN9eEu0EoRJ69TatLzWaVoh89_mqunzP8RG6")
        webhook.send("Hello World")

    def to_json(self) -> dict:
        return {"kind": "message", "device_id": self._device_id, "action": self._action}
