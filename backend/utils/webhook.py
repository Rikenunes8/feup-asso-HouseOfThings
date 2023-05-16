from discord import SyncWebhook

webhook = SyncWebhook.from_url("https://discord.com/api/webhooks/1108084159903178892/-wfJopfOfAmXNI-XYh2sZA20Q1CxMmgOYN9eEu0EoRJ69TatLzWaVoh89_mqunzP8RG6")
webhook.send("Hello World")