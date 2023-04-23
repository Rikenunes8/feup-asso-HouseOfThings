from flask import request
from abc import abstractmethod
from src.controller.managers.CrudManager import CrudManager
from src.api.ApiException import ApiException
from src.api.BaseApi import BaseApi

class CrudApi(BaseApi):
    def __init__(self):
        super().__init__()
    
    def get_collection_name(self) -> str:
        return self.get_element_name() + 's'

    @abstractmethod
    def get_element_name(self) -> str:
        pass

    @abstractmethod
    def get_manager(self) -> CrudManager:
        pass

    @abstractmethod
    def validate(self, element) -> str or None:
        pass

    def all(self):
        def inner():
            elements = [element.to_json() for element in self.get_manager().all()]
            return {self.get_collection_name(): elements}
        return self.handle_request(inner)

    def get(self, id):
        def inner():
            element = self.get_manager().get(id)
            return {self.get_element_name(): element.to_json()}
        return self.handle_request(inner)

    def create(self):
        def inner(data):
            error = self.validate(data)
            if error:
                raise ApiException(error)
            element = self.get_manager().create(data)
            return {self.get_element_name(): element.to_json()}
        return self.handle_request_with_data(inner)

    def update(self, id):
        def inner(data):
            error = self.validate(data)
            if error:
                raise ApiException(error)
            element = self.get_manager().update(id, request.json)
            return {self.get_element_name(): element.to_json()}
        return self.handle_request_with_data(inner)

    def partial_update(self, id, fields):
        def inner(data):
            values = {}
            for f in fields:
                values[f] = data.get(f)
                if values[f] is None:
                    return f"Missing field {f}"

            element = self.get_manager().update(id, values)
            return {self.get_element_name(): element.to_json()}
        return self.handle_request_with_data(inner)
        
    def delete(self, id):
        def inner():
            self.get_manager().delete(id)
            return {}
        return self.handle_request(inner)
