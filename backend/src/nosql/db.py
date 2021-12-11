from pymongo import MongoClient

client = MongoClient()
client = MongoClient('mongodb+srv://useratlas:UtNfq98Nv6pl6lnD@cluster0.1thdi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

raw_collection = client['gasolina']['raw']
gas_stations_collection = client['gasolina']['gasstations']