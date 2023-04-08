from flask import Blueprint, jsonify
from src.HoT import HoT

categories = Blueprint('categories', __name__, url_prefix='/categories')

@categories.get("/")
def index():
  return jsonify({'categories': HoT().categories()})
