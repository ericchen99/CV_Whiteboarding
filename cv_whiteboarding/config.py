"""whiteboard development configuration."""

import os
from dotenv import load_dotenv

load_dotenv()

# Root of this application, useful if it doesn't occupy an entire domain
APPLICATION_ROOT = '/'

SERVER_URL = os.environ.get('SERVER_URL')