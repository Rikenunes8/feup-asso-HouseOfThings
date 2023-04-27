from flask import jsonify, request, Blueprint
from abc import ABC, abstractmethod
from src.api.utils import make_error, not_json_error, is_content_json
from src.api.ApiException import ApiException


class BaseApi(ABC):
    def __init__(self):
        super().__init__()

    @abstractmethod
    def get_blueprint(self) -> Blueprint:
        pass
    
    def handle_request_with_data(self, handler):
        if not is_content_json(request):
            return not_json_error()
        try:
            result = handler(request.json)
            return jsonify(result)
        except ApiException as e:
            return make_error(str(e), e.code)
        
    def handle_request(self, handler):
        try:
            result = handler()
            return jsonify(result)
        except ApiException as e:
            return make_error(str(e), e.code)
