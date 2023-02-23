import socket
from controller.adapter.DeviceAdapter import DeviceAdapter
from model.devices.LightDevice import LightDevice


class LightSocketAdapter(DeviceAdapter):

  def __init__(self):
    super().__init__()
    self._socket = None

  def connect(self, id) -> bool:
    host = socket.gethostname()  # as both code is running on same pc

    client_socket = socket.socket()  # instantiate
    client_socket.connect((host, int(id)))  # connect to the server

    message = "CONNECT"
    client_socket.send(message.encode())
    data = client_socket.recv(1024).decode()

    print('Received from server: ' + data)  
    
    # TODO get a better protocol
    if data == "ACK":
      self._socket = client_socket
      self._model = LightDevice(id)
      return True
    else:
      print('Failed to connect device')
      return False
    

  def disconnect(self) -> None:
    self._socket.close()
    self._socket = None