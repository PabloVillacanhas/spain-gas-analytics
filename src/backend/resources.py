from flask import Blueprint
from flask_restful import Api, Resource

from .schemas import GasStationSchema
from backend.sql.service import get, get_all

gasstations_v1_bp = Blueprint('gasstations_v1_0_bp', __name__)
api = Api(gasstations_v1_bp)
gas_station_schema = GasStationSchema()
gas_stations_schema = GasStationSchema(many=True)
min_gas_stations_schema = GasStationSchema(many=True,
                                           exclude=['prices', 'id_adminzone1', 'id_adminzone2', 'id_adminzone3', 'cp',
                                                    'perc_metil_ester', 'remision', 'perc_bioeth', 'margin'])


class GasStationResource(Resource):
    def get(self, gas_station_id):
        gs = get(gas_station_id)
        result = gas_station_schema.dump(gs)
        return result


class GasStationsResource(Resource):
    def get(self):
        gs = get_all()
        result = min_gas_stations_schema.dump(gs)
        return result


api.add_resource(GasStationResource, '/api/v1/gas_stations/<int:gas_station_id>', endpoint='gas_station')
api.add_resource(GasStationsResource, '/api/v1/gas_stations/', endpoint='gas_stations')
