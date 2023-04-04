from flask import Blueprint, jsonify
from src.api.devices import devices
from src.api.categories import categories

api = Blueprint('api', __name__)

@api.get("/")
@api.get("/heartbeat")
def heartbeat():
  return jsonify({'status': 'ok'})


api.register_blueprint(categories)
api.register_blueprint(devices)
