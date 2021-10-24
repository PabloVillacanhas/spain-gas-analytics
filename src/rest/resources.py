from flask import Blueprint
from flask_restful import Api, Resource
from .schemas import GasStationSchema
from ..sql.service import get

gasstations_v1_bp = Blueprint('gasstations_v1_0_bp', __name__)
api = Api(gasstations_v1_bp)
gas_station_schema = GasStationSchema()


class GasStationResource(Resource):
    def get(self, gasstation_id):
        gs = get(gasstation_id)
        result = gas_station_schema.dump(gs)
        return result


# class GasStationPricesResource(Resource):
#     def get(self, id):
#         films = get(id)
#
#         return result


api.add_resource(GasStationResource, '/api/v1/gasstations/<int:gasstation_id>', endpoint='gasstations')
# api.add_resource(FilmResource, '/api/v1/gasstations/<int:gasstation_id>', endpoint='film_resource')
