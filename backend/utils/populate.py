from dotenv import load_dotenv
import os
import pymongo

categories = 'categories'

def main():
  load_dotenv('.env')
  user = os.environ.get('MONGODB_USERNAME')
  password = os.environ.get('MONGODB_PASSWORD')
  host = os.environ.get('MONGODB_HOSTNAME')
  port = os.environ.get('MONGODB_PORT')
  database = os.environ.get('MONGODB_DATABASE')
  mongo_uri = f"mongodb://{user}:{password}@{host}:{port}"
  print(mongo_uri)
  print(os.environ.get('NOT_CONTAINERIZED'))
  if os.environ.get('NOT_CONTAINERIZED'):  
    mongo_uri = f"mongodb://localhost:27017"
    database = 'HoT'
  client = pymongo.MongoClient(mongo_uri)
  if categories not in client[database].list_collection_names():
    buildCategories(client[database][categories])
    

def buildCategories(db):
  addLights(db)
  addSensors(db)
  addSecurity(db)
  addSockets(db)
  addAppliances(db)
  addOthers(db)

def addLights(db):
  db.insert_one({
    'name': 'light',
    'subcategories': [
      'light bulb'
    ]
  })

def addSensors(db):
  db.insert_one({
    'name': 'sensor',
    'subcategories': [
      'motion sensor',
      'temperature sensor',
      'humidity sensor'
    ]
  })

def addSecurity(db):
  db.insert_one({
    'name': 'security',
    'subcategories': [
      'camera',
      'door lock'
    ]
  })

def addSockets(db):
  db.insert_one({
    'name': 'socket',
    'subcategories': [
      'extension socket',
      'power socket'
    ]
  })

def addAppliances(db):
  db.insert_one({
    'name': 'appliance',
    'subcategories': [
      'fan',
      'tv',
      'ac',
      'heater',
      'oven',
      'washer',
      'dryer'
    ]
  })

def addOthers(db):
  db.insert_one({
    'name': 'other',
    'subcategories': [
      'door bell',
      'tv'
    ]
  })



if __name__ == '__main__':
  main()
