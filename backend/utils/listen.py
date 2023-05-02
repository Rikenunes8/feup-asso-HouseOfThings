import sseclient

messages = sseclient.SSEClient('http://localhost:5000/devices/listener')

for msg in messages:
    print(msg)