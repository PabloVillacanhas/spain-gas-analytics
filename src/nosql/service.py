from .db import raw_collection
from ..types import RestResponse, restresponse_from_dict


def find_by_date():
    # TODO
    return None

def find_last() -> RestResponse:
    return restresponse_from_dict(raw_collection.find_one())

def persist(data: RestResponse):
    raw_collection.pe