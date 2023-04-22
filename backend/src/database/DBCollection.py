from bson.objectid import ObjectId


class DBCollection:
    def __init__(self, collection: str, id: str or None):
        self._collection = collection
        self._id = id

    def _get_query(self, id):
        if self._id is None:
            return {"_id": ObjectId(id)}
        else:
            return {self._id: id}

    def find_all(self) -> list[dict]:
        return list(self._collection.find({}, {"_id": 0}))

    def find(self, id) -> dict:
        return self._collection.find_one(self._get_query(id), {"_id": 0})

    def add(self, props):
        if self._id is not None:
            if self.find(props[self._id]):
                return None  # Already exists
        result = self._collection.insert_one({**props})
        return str(result.inserted_id)

    def update(self, id, props):
        self._collection.update_one(self._get_query(id), {"$set": props})

    def delete(self, id):
        self._collection.delete_one(self._get_query(id))
