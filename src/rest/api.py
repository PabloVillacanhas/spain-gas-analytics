from flask import request, Blueprint
from flask_restful import Api, Resource
from src.sql.service import get


gasstations_v1_0_bp = Blueprint('gasstations_v1_0_bp', __name__)

api = Api(gasstations_v1_0_bp)

gas_station_schema = GasStationSchema()

class GasStationResource(Resource):
    def get(self):
        films = Film.get_all()
        result = film_schema.dump(films, many=True)
        return result

class GasStationPricesResource(Resource):
    def get(self, id):
        films = get(id)

        return result

api.add_resource(GasStationResource, '/api/v1/gasstations/', endpoint='gasstations')
api.add_resource(FilmResource, '/api/v1/gasstations/<int:gasstation_id>', endpoint='film_resource')
