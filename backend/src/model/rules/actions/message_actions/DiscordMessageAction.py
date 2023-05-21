from src.model.rules.actions.MessageAction import MessageAction
from src.model.devices.Device import Device
from discord import SyncWebhook

class DiscordMessageAction(MessageAction):
    def __init__(self, data: dict) -> None:
        super().__init__("discord", {"url": data.get("url")})
  
    def execute(self, data: dict) -> Device:
        rule_name = data.get("rule_name")
        message = f"Rule \"{rule_name}\" was triggered"
        webhook = SyncWebhook.from_url(self._data.get("url"))
        webhook.send(message)
    
    def to_json(self) -> dict:
        return super().to_json()
