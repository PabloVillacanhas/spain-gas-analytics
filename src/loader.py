import logging

from .nosql.service import find_last, persist as insert_in_mongo
from .sql.service import persist as insert_in_postgres
from .spider.service import fetch
from .adapters import transform_to_utc_datetime, rest_response_to_normalized
from datetime import datetime


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
        insert_in_postgres(rest_response_to_normalized(find_last()))


insert_in_postgres(rest_response_to_normalized(find_last()))

# fetch_and_persist()

__name__ == '__main__'
