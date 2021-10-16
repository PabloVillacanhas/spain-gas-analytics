import requests

from src.types import RestResponse, restresponse_from_dict

URL = 'https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/'


def fetch() -> RestResponse:
    return restresponse_from_dict(requests.get(URL).json())
