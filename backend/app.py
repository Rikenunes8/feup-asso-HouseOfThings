import os
from flask_swagger_ui import get_swaggerui_blueprint
from flask import Flask
from src.api.Api import Api
from dotenv import load_dotenv
from logging.config import dictConfig

load_dotenv(".env")
debug_mode = os.environ.get("APP_ENV") != "production"

dictConfig(
    {
        "version": 1,
        "disable_existing_loggers": True,
        "formatters": {
            "default": {
                "format": "[%(asctime)s] %(levelname)s in %(module)s: %(message)s",
            },
        },
        "handlers": {
            "console": {
                "level": "INFO",
                "class": "logging.StreamHandler",
                "formatter": "default",
                "stream": "ext://sys.stdout",
            },
            "file": {
                "class": "logging.handlers.RotatingFileHandler",
                "formatter": "default",
                "filename": "logs/server.log",
                "maxBytes": 31457280,
                "backupCount": 10,
                "delay": "True",
            },
        },
        "loggers": {
            "HoT": {
                "handlers": [],
                "level": "DEBUG" if debug_mode else "INFO",
            },
        },
        "root": {
            "level": "DEBUG" if debug_mode else "INFO",
            "handlers": ["console", "file"],
        },
    }
)


SWAGGER_URL = "/swagger"
API_URL = "/static/swagger.yaml"
SWAGGERUI_BLUEPRINT = get_swaggerui_blueprint(
    SWAGGER_URL, API_URL, config={"app_name": "House of Things"}
)

app = Flask(__name__)

app.register_blueprint(SWAGGERUI_BLUEPRINT, url_prefix=SWAGGER_URL)
app.register_blueprint(Api().get_api())

if __name__ == "__main__":
    if debug_mode:
        print(
            """
            You are running the app in debug mode. This is not recommended for production environments.

            For production environments, please set the environment variable APP_ENV to 'production'
            before starting the server.
        """
        )

        app.run(host="0.0.0.0", debug=True)
    else:
        # Only import waitress if we are running in production mode
        from waitress import serve

        print("Server starting in production mode.")
        serve(app, host="0.0.0.0", port=5000)
