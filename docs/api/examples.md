*POST http://localhost:5000/rules*
```
{
  "name": "Rule no 1",
  "operation": "or", // or, and
  "when": [
      { 
          "kind": "device",
          "device_id": "5",
          "data": {
              "comparator": "equal",
              "state": {
                  "power": true
              }
          }
      },
      { 
          "kind": "device",
          "device_id": "1",
          "data": {
              "comparator": "equal",
              "state": {
                  "power": false
              }
          }
      },
      { 
          "kind": "device",
          "device_id": "5",
          "data": {
              "comparator": "greater", // [greater, less, equal]
              "state": {
                  "brigthness": 50
              }
          }
      },
      { 
          "kind": "device",
          "device_id": "5",
          "data": {
              "comparator": "less",
              "state": {
                  "brigthness": 50
              }
          }
      },
      { 
          "kind": "device",
          "device_id": "3",
          "data": {
              "comparator": "less",
              "state": {
                  "temperature": 20
              }
          }
      },
      { 
          "kind": "device",
          "device_id": "3",
          "data": {
              "comparator": "greater",
              "state": {
                  "temperature": 10
              }
          }
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