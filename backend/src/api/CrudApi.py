from flask import request
from abc import abstractmethod
from src.controller.managers.CrudManager import CrudManager
from src.api.ApiException import ApiException
from src.api.BaseApi import BaseApi


class CrudApi(BaseApi):
    def __init__(self, manager: CrudManager):
        super().__init__()
        self._manager = manager

    def get_collection_name(self) -> str:
        return self.get_element_name() + "s"

    @abstractmethod
    def get_element_name(self) -> str:
        pass

    @abstractmethod
    def validate(self, element) -> str or None:
        pass

    def all(self):
        def inner():
            elements = [element.to_json() for element in self._manager.all()]
            return {self.get_collection_name(): elements}

        return self.handle_request(inner)

    def get(self, id):
        def inner():
            element = self._manager.get(id)
            return {self.get_element_name(): element.to_json()}

        return self.handle_request(inner)

    def create(self, id=None):
        def inner(data):
            error = self.validate(data)
            if error:
                raise ApiException(error)
            if id is None:
                element = self._manager.create(data)
            else:
                element = self._manager.create(data, id)
            return {self.get_element_name(): element.to_json()}

        return self.handle_request_with_data(inner)

    def update(self, id):
        def inner(data):
            error = self.validate(data)
            if error:
                raise ApiException(error)
            element = self._manager.update(id, request.json)
            return {self.get_element_name(): element.to_json()}

        return self.handle_request_with_data(inner)

    def partial_update(self, id, fields):
        def inner(data):
            values = {}
            for f in fields:
                values[f] = data.get(f)
                if values[f] is None:
                    raise ApiException(f"Missing field {f}")

            element = self._manager.update(id, values)
            return {self.get_element_name(): element.to_json()}

        return self.handle_request_with_data(inner)

    def delete(self, id):
        def inner():
            self._manager.delete(id)
            return {}

        return self.handle_request(inner)
