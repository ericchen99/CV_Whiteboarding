"""REST API index."""
import flask
import cv_whiteboarding

class InvalidUsage(Exception):
    """Invalid Usage Class."""
    status_code = 400

    def __init__(self, message, status_code=None, payload=None):
        """Init invalid usage."""
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        """Convert message to dict."""
        r_v = dict(self.payload or ())
        r_v['message'] = self.message
        return r_v


@cv_whiteboarding.app.errorhandler(InvalidUsage)
def handle_invalid_usage(error):
    """Handle invalid usage."""
    response = flask.jsonify(error.to_dict())
    response.status_code = error.status_code
    return response

@cv_whiteboarding.app.route('/testapi/', methods=["GET"])
def testapi():
    """A handler for testing."""
    # check_login()
    context = {
        "test": "convo_starter_backend is running!",
    }
    return flask.jsonify(**context)

@cv_whiteboarding.app.route('/', methods=["GET"])
def home():
    context = {
        "Home": "This is the convo_starter_backend home page. 2",
    }
    return flask.jsonify(**context)
