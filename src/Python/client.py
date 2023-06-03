import zmq

class Client:
    
    def __init__(self) -> None:
        self._context = zmq.Context()
        self._socket = self._context.socket(zmq.REQ)
        self._socket.connect("tcp://localhost:5555")
        self._socket.setsockopt(zmq.RCVTIMEO, 1000)
        self._socket.setsockopt(zmq.LINGER, 0)

    def send(self, message: bytes):
        try:
            self._socket.send(message)
        except:
            print("send error")
            return False

    def receive(self):
        try:
            message: bytes = self._socket.recv()
            return message.decode()
        except zmq.ZMQError:
            print("receive error")
            return False
        
    def flush(self):
        try:
            for i in range(100):
                self._socket.recv()
                return False
        except zmq.ZMQError:
            return True