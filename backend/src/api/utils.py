from flask import jsonify, make_response


def make_error(error, code=400):
  return make_response(jsonify({'error': error}), code)

def not_json_error():
  return make_error("Content-Type not supported!", 400)

def is_content_json(request):
  return request.headers.get('Content-Type') == 'application/json'
