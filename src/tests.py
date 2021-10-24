import logging

import logging
from .nosql.service import find_last, persist as insert_in_mongo
from .spider.service import fetch
from .adapters import rest_response_to_normalized, transform_to_utc_datetime
from .sql.service import persist as insert_in_postgres, get
from datetime import datetime

from .rest.schemas import GasStationSchema
from flask import jsonify
from .app import app


def fetch_and_persist():
    logging.debug('Try to fetch and persist')
    last_mongo_response = find_last()
    if transform_to_utc_datetime(last_mongo_response.fecha).date() != datetime.utcnow().date():
        logging.info("Last response registered in mongo differs from today UTC")
        logging.info("Fetching remote data given by goverment")
        rest_response = fetch()
        logging.info("Fetching remote data given by goverment")
        insert_in_mongo(rest_response)
        logging.info("Persisting in postgres the data")


with app.app_context():
    gs = get(300)
    schema = GasStationSchema()
    print(jsonify(schema.dump(gs)))

__name__ == '__main__'
