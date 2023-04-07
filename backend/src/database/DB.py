import os
import pymongo
from bson.objectid import ObjectId
from dotenv import load_dotenv


class DBMeta(type):
    _instances = {}

    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            instance = super().__call__(*args, **kwargs)
            cls._instances[cls] = instance
        return cls._instances[cls]


class DB(metaclass=DBMeta):
    def __init__(self):
        load_dotenv('.env')
        user = os.environ.get('MONGODB_USERNAME')
        password = os.environ.get('MONGODB_PASSWORD')
        host = os.environ.get('MONGODB_HOSTNAME')
        port = os.environ.get('MONGODB_PORT')
        database = os.environ.get('MONGODB_DATABASE')
        mongo_uri = f"mongodb://{user}:{password}@{host}:{port}"
        if os.environ.get('NOT_CONTAINERIZED'):
            mongo_uri = f"mongodb://localhost:27017"
            database = 'HoT'

        self._client = pymongo.MongoClient(mongo_uri)
        self._db = self._client[database]
        self._categories = self._db['categories']
        self._devices = self._db['devices']
        self._rules = self._db['rules']

    def find_all_categories(self) -> list[dict]:
        return list(self._categories.find({}, {'_id': 0}))


    def add_device(self, uid, props):
        if not self.find_device(uid):
            self._devices.insert_one({'uid': uid, **props})

    def delete_device(self, uid):
        self._devices.delete_one({'uid': uid})

    def update_device(self, uid, props):
        self._devices.update_one({'uid': uid}, {'$set': props})

    def find_device(self, uid) -> dict:
        return self._devices.find_one({'uid': uid}, {'_id': 0})

    def find_all_devices(self) -> list[dict]:
        return list(self._devices.find({}, {'_id': 0}))


    def add_rule(self, props):
      result = self._rules.insert_one({**props})
      return str(result.inserted_id)
    
    def update_rule(self, id, props):
      self._rules.update_one({'_id': ObjectId(id)}, {'$set': props})
    
    def delete_rule(self, id):
      self._rules.delete_one({'_id': ObjectId(id)})

    def find_rule(self, id) -> dict:
      return self._rules.find_one({'_id': ObjectId(id)}, {'_id': 0})
    
    def find_all_rules(self) -> list[dict]:
      return list(self._rules.find({}, {'_id': 0}))
