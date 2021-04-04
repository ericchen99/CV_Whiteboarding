from cv_whiteboarding.main_app import app, socketio
from flask.cli import with_appcontext
from flask_cors import CORS

CORS(app, supports_credentials=True)
#not sure

# Read settings from config module (insync/config.py)
app.config.from_pyfile('config.py')


# @socketio.on('connected')
# def connected(message):
#     print(message)
#     if message["from_refresh_receiver"] == True:
#         initial_refresh_sender_helper(message["request_id"], message["zoom_link"])
#         initial_refresh_receiver_helper(message["request_id"], message["zoom_link"], message["receiver_name"])
#     elif message["from_refresh_receiver"] == False:
#         initial_refresh_sender_helper(message["request_id"], message["zoom_link"])
#         initial_refresh_receiver_helper(message["request_id"], message["zoom_link"], "DoesNotMatter")
    
# @socketio.on('disconnect')
# def disconnect(message):
#     print("disconnected")
#     print(message)

# def initial_refresh_sender_helper(request_id, zoom_link):
#     # if request_id ack is True 
#     filter_by_condition = {
#         "request_id": request_id
#     }
    
#     sender_request = db.session.query(sender_requests).filter_by(**filter_by_condition)
#     sender_request = sender_request.all()
#     db.session.commit()
#     parsed_sender_request = sender_request_sql_data(sender_request[0])

#     if parsed_sender_request["receiver_ack"] == True:
#         data = {"zoom_link": zoom_link, "request_id": request_id}
#         socketio.emit('message', data)

# def initial_refresh_receiver_helper(request_id, zoom_link, receiver_name):
#     # if request_id ack is True 
#     filter_by_condition = {
#         "request_id": request_id
#     }
    
#     sender_request = db.session.query(sender_requests).filter_by(**filter_by_condition)
#     sender_request = sender_request.all()
#     db.session.commit()
#     parsed_sender_request = sender_request_sql_data(sender_request[0])

#     if parsed_sender_request["receiver_ack"] == True:
#         data = {"zoom_link": zoom_link, "request_id": request_id, "receiver_name": receiver_name}
#         socketio.emit('message', data)

if __name__ == '__main__':
    socketio.run(app, debug=True, port=5000)