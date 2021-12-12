from .db import raw_collection, gas_stations_collection

from mytypes import RestResponse, restresponse_from_dict, restresponse_to_dict


def find_by_date() -> RestResponse:
    raw_collection.find_one()


def find_last() -> RestResponse:
    return restresponse_from_dict(raw_collection.find_one(sort=[('_id', -1)]))


def persist(data: RestResponse):
    raw_collection.insert_one(restresponse_to_dict(data))
