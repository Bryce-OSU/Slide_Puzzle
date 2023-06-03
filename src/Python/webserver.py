from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse
from urllib.parse import parse_qs
import json
import cgi
from client import Client

hostName = "localhost"
serverPort = 8080

class MyServer(BaseHTTPRequestHandler):
    _client = Client()
    
    def do_POST(self):
        self._client.flush()

        ctype, pdict = cgi.parse_header(self.headers.get('content-type'))
        
        if ctype == 'application/json':
            self.post_JSON()
        elif ctype == 'text/plain':
            self.post_STRING()
        else:
            self.send_response(400)
            self.end_headers()
            return

    def post_JSON(self):
        # read the message and convert it into a python dictionary
        length = int(self.headers.get('content-length'))
        json_object = json.loads(self.rfile.read(length))

        self._client.send(bytes(json.dumps(json_object), "utf8"))
        success = self._client.receive()

        if(success == False):
            print("error")
            self.send_response(400)
            self.end_headers()
            return
        
        # send the message back
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Content-type', 'text/plain')
        self.end_headers()
        self.wfile.write(bytes("Saved", "utf8"))

    def post_STRING(self):
        # read the message and convert it into a python dictionary
        length = int(self.headers.get('content-length'))
        message = self.rfile.read(length)

        self._client.send(message)
        success = self._client.receive()

        if(success == False):
            self.send_response(400)
            self.end_headers()
            return

        json_object = json.loads(success)
        
        # send the message back
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(bytes(json.dumps(json_object), "utf8"))

    def do_OPTIONS(self):
        self.send_response(200, "ok")
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header("Access-Control-Allow-Headers", "X-Requested-With")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

if __name__ == "__main__":        
    webServer = HTTPServer((hostName, serverPort), MyServer)
    print("Server started http://%s:%s" % (hostName, serverPort))

    try:
        webServer.serve_forever()
    except KeyboardInterrupt:
        pass

    webServer.server_close()
    print("Server stopped.")