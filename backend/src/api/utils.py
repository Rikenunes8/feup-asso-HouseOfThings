from flask import jsonify, make_response


def make_error(error, code=400):
    return make_response(jsonify({"error": error}), code)


def not_json_error():
    return make_error("Content-Type not supported!", 400)


def is_content_json(request):
    return request.headers.get("Content-Type") == "application/json"


def format_sse(data: str, event=None) -> str:
    msg = f"data: {data}\n\n"
    if event is not None:
        msg = f"event: {event}\n{msg}"
    return msg
