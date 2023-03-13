from dotenv import load_dotenv
import os
import pymongo

name = 'HoT'

def main():
  load_dotenv('.env')
  mongo_uri = os.environ.get('MONGO_URI') or 'mongodb://localhost:27017/'
  client = pymongo.MongoClient(mongo_uri)
  buildCategories(client[name]['categories'])

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
