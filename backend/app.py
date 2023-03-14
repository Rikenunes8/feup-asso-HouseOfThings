from flask_swagger_ui import get_swaggerui_blueprint
from flask import Flask
from src.api import api

SWAGGER_URL = '/swagger'
API_URL = '/static/swagger.yaml'
SWAGGERUI_BLUEPRINT = get_swaggerui_blueprint(
  SWAGGER_URL,
  API_URL,
  config={
    'app_name': "House of Things"
  }
)

app = Flask(__name__)

app.register_blueprint(SWAGGERUI_BLUEPRINT, url_prefix=SWAGGER_URL)
app.register_blueprint(api)

if __name__ == '__main__':
  app.run(host='0.0.0.0', debug=True)