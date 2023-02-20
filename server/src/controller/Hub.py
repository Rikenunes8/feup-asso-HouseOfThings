import socket

class Hub:
  def connect(self, port) -> socket.socket:
    host = socket.gethostname()  # as both code is running on same pc

    client_socket = socket.socket()  # instantiate
    client_socket.connect((host, port))  # connect to the server

    message = "connect"
    client_socket.send(message.encode())  # send message
    data = client_socket.recv(1024).decode()  # receive response

    print('Received from server: ' + data)  # show in terminal

    return client_socket

  def disconnect(self, client_socket : socket.socket) -> None :
    client_socket.close()  # close the connection
  