from enum import Enum

class Collection(tuple[str, str or None], Enum):
    CATEGORIES = 'categories', None
    DEVICES = 'devices', 'uid'
    RULES = 'rules', None
    DIVISIONS = 'divisions', None
    LOGS = 'logs', None
