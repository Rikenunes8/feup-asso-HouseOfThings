import time
import requests

while True:
    requests.get('http://localhost:5000/devices/sse/test')
    time.sleep(1)