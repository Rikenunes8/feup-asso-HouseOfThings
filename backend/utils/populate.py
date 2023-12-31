from dotenv import load_dotenv
import os
import pymongo

categories = "categories"


def _get_uri(
    user: str or None, password: str or None, host: str, port: str or None
) -> str:
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


def main():
    load_dotenv(".env")
    user = os.environ.get("MONGODB_USERNAME")
    password = os.environ.get("MONGODB_PASSWORD")
    host = os.environ.get("MONGODB_HOSTNAME")
    port = os.environ.get("MONGODB_PORT")
    database = os.environ.get("MONGODB_DATABASE")
    mongo_uri = _get_uri(user, password, host, port)
    client = pymongo.MongoClient(mongo_uri)
    if categories not in client[database].list_collection_names():
        build_categories(client[database][categories])


def build_categories(db):
    add_lights(db)
    add_sensors(db)
    # add_security(db)
    # add_sockets(db)
    # add_appliances(db)
    # add_others(db)


def add_lights(db):
    db.insert_one({"name": "light", "subcategories": ["light bulb", "light bulb rgb"]})


def add_sensors(db):
    db.insert_one(
        {
            "name": "sensor",
            "subcategories": [
                # 'motion sensor',
                "thermometer",
                # 'humidity sensor'
            ],
        }
    )


def add_security(db):
    db.insert_one({"name": "security", "subcategories": ["camera", "door lock"]})


def add_sockets(db):
    db.insert_one(
        {"name": "socket", "subcategories": ["extension socket", "power socket"]}
    )


def add_appliances(db):
    db.insert_one(
        {
            "name": "appliance",
            "subcategories": ["fan", "tv", "ac", "heater", "oven", "washer", "dryer"],
        }
    )


def add_others(db):
    db.insert_one({"name": "other", "subcategories": ["door bell", "tv"]})


if __name__ == "__main__":
    main()
