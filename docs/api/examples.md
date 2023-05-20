*POST http://localhost:5000/rules*
```
{
  "name": "Rule no 1",
  "operation": "or", // or, and
  "when": [
      { 
          "kind": "device",
          "device_id": "5",
          "comparator": "==",
          "attribute": "power",
          "state": true
      },
      { 
          "kind": "device",
          "device_id": "1",
          "comparator": "==",
          "attribute": power,
          "state": false
      },
      { 
          "kind": "device",
          "device_id": "5",
          "comparator": ">", // [>, <, ==]
          "attribute": brigthness,
          "state": 50
      },
      { 
          "kind": "device",
          "device_id": "5",
          "comparator": "<",
          "attribute": brigthness,
          "state": 50
      },
      { 
          "kind": "device",
          "device_id": "3",
          "comparator": "<",
          "attribute": temperature,
          "state": 20
      },
      { 
          "kind": "device",
          "device_id": "3",
          "comparator": ">",
          "attribute": temperature,
          "state": 10
      },
      { 
          "kind": "schedule",
          "time": "10:30",
          "days": [1, 3, 5]
      }
  ],
  "then": [
      {
          "kind": "device",
          "device_id": "1",
          "action": "turn_on"
      },
      {
          "kind": "device",
          "device_id": "1",
          "action": "turn_off"
      },
      {
          "kind": "device",
          "device_id": "5",
          "action": "set_color",
          "data": {
              "color": "#FF0000"
          }
      },
      {
          "kind": "device",
          "device_id": "5",
          "action": "set_brightness",
          "data": {
              "brightness": "50"
          }
      },
      {
          "kind": "message",
          "service": "discord",
          "data": {
              "url": "https://discord.com/api/webhooks/1108084159903178892/-wfJopfOfAmXNI-XYh2sZA20Q1CxMmgOYN9eEu0EoRJ69TatLzWaVoh89_mqunzP8RG6"
          }
      }
      {
          "kind": "message",
          "service": "whatsapp",
          "data": {
              "number": "xxxxxxxxx",
          }
      }
  ]
}
```