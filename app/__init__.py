import os
from flask import Flask


application = Flask(__name__)


env = os.getenv('RUN_MODE', 'development')
application.config['RUN_MODE'] = env

if (env == 'development'):
    application.config.from_object('app.config.development.Config')
elif (env == 'test'):
    application.config.from_object('app.config.test.Config')
else:
    application.config.from_object('app.config.BaseConfig')

import app.views  # noqa: F401
