from flask import Blueprint, jsonify, make_response, request
from src.HoT import HoT

api = Blueprint('api', __name__)


def make_error(error, code=400):
    return make_response(jsonify({'error': error}), code)


def not_json_error():
    return make_error("Content-Type not supported!", 400)


def is_content_json(request):
    return request.headers.get('Content-Type') == 'application/json'


@api.get("/heartbeat")
def heartbeat():
    return jsonify({'status': 'ok'})


@api.get("/categories")
def categories():
    return jsonify({'categories': HoT().categories()})


@api.post("/devices/<id>/connect")
def connect(id):
    if (not is_content_json(request)):
        return not_json_error()
    error = HoT().connect(id, request.json)
    if error:
        return make_error(error, 404)
    else:
        return jsonify({})


@api.post("/devices/<id>/disconnect")
def disconnect(id):
    error = HoT().disconnect(id)
    if error:
        return make_error(error, 404)
    else:
        return jsonify({})


@api.post("/devices/<id>/action")
def action(id):
    if (not is_content_json(request)):
        return not_json_error()
    HoT().action(id, request.json)
    return jsonify({})


@api.post("/devices/<id>/rename")
def rename(id):
    if (not is_content_json(request)):
        return not_json_error()
    error = HoT().rename(id, request.json)
    if error:
        return make_error(error)
    else:
        return jsonify({})


@api.get("/devices")
def connected_devices():
    devices = HoT().devices()
    return jsonify({'devices': list(map(lambda device: device.to_json() if device != None else {}, devices))})


@api.get("/devices/available")
def available():
    devices = HoT().available(request.args.to_dict())
    return jsonify({'devices': devices})
