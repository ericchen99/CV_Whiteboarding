import flask
from flask_socketio import SocketIO, send, emit, join_room, leave_room 
from flask import request

# app is a single object used by all the code modules in this package
app = flask.Flask(__name__)  # pylint: disable=invalid-name
socketio = SocketIO(app, cors_allowed_origins="*", ping_interval=5)
clients = []