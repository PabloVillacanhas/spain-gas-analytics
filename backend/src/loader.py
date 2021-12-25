import logging
import os
from dotenv.main import load_dotenv

from nosql.service import find_last, persist as insert_in_mongo
from sql.service import persist as insert_in_postgres
from spider.service import fetch
from adapters import transform_to_utc_datetime, rest_response_to_normalized
from datetime import datetime
from flask import Flask
from config import initConfiguration
from extensions import db


def fetch_and_persist():
    logging.debug('Try to fetch and persist')
    last_mongo_response = find_last()
    if transform_to_utc_datetime(last_mongo_response.fecha).date() != datetime.utcnow().date() or True:
        logging.info(
            "Last response registered in mongo differs from today UTC")
        logging.info("Fetching remote data given by government")
        rest_response = fetch()
        logging.info("Fetching remote data given by government")
        # insert_in_mongo(rest_response)
        logging.info("Persisting in postgres the data")
        insert_in_postgres(rest_response_to_normalized(find_last()))
    else:
        logging.info("Database is updated")


if __name__ == '__main__':
    load_dotenv()
    app = Flask(__name__)
    print(os.environ.get('DATABASE_URL'))
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = {
        os.environ.get('SQLALCHEMY_TRACK_MODIFICATIONS')}
    # app.config['SQLALCHEMY_BINDS'] = os.environ.get('DATABASE_URL')
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
    db.init_app(app)
    initConfiguration()
    with app.app_context():
        fetch_and_persist()
