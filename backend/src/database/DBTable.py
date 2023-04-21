from bson.objectid import ObjectId

class DBTable:
    def __init__(self, table, id=None):
        self._table = table
        self._id = id
    
    def _get_query(self, id):
        if self._id is None:
            return {'_id': ObjectId(id)}
        else:
            return {self._id: id}

    def find_all(self) -> list[dict]:
        return list(self._table.find({}, {'_id': 0}))

    def find(self, id) -> dict:
        return self._table.find_one(self._get_query(id), {'_id': 0})
    
    def add(self, props):
        if self._id is not None:
            if self.find(props[self._id]):
                return None # Already exists
        result = self._table.insert_one({**props})
        return str(result.inserted_id)
    
    def update(self, id, props):
        self._table.update_one(self._get_query(id), {'$set': props})
    
    def delete(self, id):
        self._table.delete_one(self._get_query(id))
