from flask import Blueprint, jsonify
from src.api.categories import CategoriesApi
from src.api.devices import DevicesApi
from src.api.rules import RulesApi
from src.api.divisions import DivisionsApi
from src.api.logs import LogsApi

api = Blueprint('api', __name__)

@api.get("/")
@api.get("/heartbeat")
def heartbeat():
  return jsonify({'status': 'ok'})


api.register_blueprint(CategoriesApi().get_blueprint())
api.register_blueprint(DevicesApi().get_blueprint())
api.register_blueprint(RulesApi().get_blueprint())
api.register_blueprint(DivisionsApi().get_blueprint())
api.register_blueprint(LogsApi().get_blueprint())
