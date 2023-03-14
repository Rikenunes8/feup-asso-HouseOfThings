import os
import pymongo
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
  
  def addDevice(self, uid, props):
    if not self.findDevice(uid):
      self._db['devices'].insert_one({'uid': uid, **props})

  def deleteDevice(self, uid):
    self._db['devices'].delete_one({'uid': uid})
  
  def updateDevice(self, uid, props):
    self._db['devices'].update_one({'uid': uid}, {'$set': props})

  def findDevice(self, uid) -> dict:
    return self._db['devices'].find_one({'uid': uid}, {'_id': 0})
  
  def findAllDevices(self) -> list[dict]:
    return list(self._db['devices'].find({}, {'_id': 0}))
  
  def findAllCategories(self) -> list[dict]:
    return list(self._db['categories'].find({}, {'_id': 0}))
