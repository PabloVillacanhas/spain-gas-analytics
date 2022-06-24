from flask_caching import Cache
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy

ma = Marshmallow()
db = SQLAlchemy()
cache = Cache(config={'CACHE_TYPE': 'SimpleCache'})
