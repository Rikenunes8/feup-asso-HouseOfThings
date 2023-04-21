import os
import pymongo
from bson.objectid import ObjectId
from dotenv import load_dotenv
from src.database.DBCollection import DBCollection
from src.database.CollectionTypes import Collection


class DBMeta(type):
    _instances = {}

    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            instance = super().__call__(*args, **kwargs)
            cls._instances[cls] = instance
        return cls._instances[cls]


class DB(metaclass=DBMeta):
    def __init__(self):
        load_dotenv(".env")
        user = os.environ.get("MONGODB_USERNAME")
        password = os.environ.get("MONGODB_PASSWORD")
        host = os.environ.get("MONGODB_HOSTNAME")
        port = os.environ.get("MONGODB_PORT")
        database = os.environ.get("MONGODB_DATABASE")

        mongo_uri = self._get_uri(user, password, host, port)

        self._client = pymongo.MongoClient(mongo_uri)
        self._db = self._client[database]
    
    def _get_uri(self, user: str or None, password: str or None, host: str, port: str or None) -> str:
        if password:
            credentials = f"{user}:{password}"
        else:
            credentials = user
        
        if port:
            address = f"{host}:{port}"
        else:
            address = host

        if credentials:
            mongo_uri = f"mongodb://{credentials}@{address}"
        else:
            mongo_uri = f"mongodb://{address}"

        return mongo_uri

    def _get_collection(self, collection: str, id: str or None) -> DBCollection:
        return DBCollection(self._db[collection], id)

    def get(self, collection: Collection) -> DBCollection:
        return self._get_collection(*collection)
