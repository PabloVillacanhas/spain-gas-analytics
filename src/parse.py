import requests
import json
from pymongo import MongoClient
from models import gasolina_from_dict, gasolina_to_dict

URL = 'https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/'
client = MongoClient()
client = MongoClient('mongodb+srv://useratlas:UtNfq98Nv6pl6lnD@cluster0.1thdi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
db = client['gasolina']['raw']

response = requests.get(URL).json()
result = gasolina_from_dict(response)

db.insert_one(response)

__name__ == '__main__'