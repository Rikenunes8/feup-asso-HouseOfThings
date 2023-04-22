from flask import Blueprint, jsonify
from src.api.categories import categories
from src.api.devices import devices
from src.api.rules import rules
from src.api.divisions import divisions

api = Blueprint('api', __name__)

@api.get("/")
@api.get("/heartbeat")
def heartbeat():
  return jsonify({'status': 'ok'})


api.register_blueprint(categories)
api.register_blueprint(devices)
api.register_blueprint(rules)
api.register_blueprint(divisions)
