import pymongo
from dotenv import load_dotenv
import os

class DB():
  _name = 'HoT'

  def __new__(cls):
    if not hasattr(cls, 'instance'):
      cls.instance = super(DB, cls).__new__(cls)
    return cls.instance

  def __init__(self):
    load_dotenv('.env')
    mongo_uri = os.environ.get('MONGO_URI') or 'mongodb://localhost:27017/'
    self._client = pymongo.MongoClient(mongo_uri)
    dblist = self._client.list_database_names()
    if DB._name not in dblist:
      print(f"Creating database {DB._name}.")
    self._db = self._client[DB._name]
  
  def addDevice(self, uid, group, props):
    if not self.findDevice(uid):
      self._db['devices'].insert_one({'uid': uid, 'group': group, **props})

  def deleteDevice(self, uid):
    self._db['devices'].delete_one({'uid': uid})
  
  def updateDevice(self, uid, props):
    self._db['devices'].update_one({'uid': uid}, {'$set': props})

  def findDevice(self, uid) -> dict:
    return self._db['devices'].find_one({'uid': uid}, {'_id': 0})
  
  def findAllDevices(self) -> list[dict]:
    return list(self._db['devices'].find({}, {'_id': 0}))



  