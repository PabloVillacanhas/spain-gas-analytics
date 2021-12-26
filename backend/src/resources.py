from flask import Blueprint, request
from flask_restful import Api, Resource

from schemas import GasStationSchema, PricesSchema, GasStationSchemaQuery, GasStationSchemaPagination
from sql.service import get, get_all, get_price_evolution, get_prices, find_closest_gasstations

gasstations_v1_bp = Blueprint('gasstations_v1_0_bp', __name__)
api = Api(gasstations_v1_bp)
gas_station_schema = GasStationSchema()
gas_stations_schema = GasStationSchema(many=True)
min_gas_stations_schema = GasStationSchema(many=True,
                                           exclude=['prices', 'id_adminzone1', 'id_adminzone2', 'id_adminzone3', 'cp',
                                                    'perc_metil_ester', 'remision', 'perc_bioeth', 'margin'])
paginated_gasstations_schema = GasStationSchemaPagination()
gasstation_schema_query = GasStationSchemaQuery()
price_evolution = PricesSchema(many=True)
rawprices = PricesSchema(many=True, exclude=['date'])


class GasStationResource(Resource):
    def get(self, gas_station_id):
        gs = get(gas_station_id)
        result = gas_station_schema.dump(gs)
        return result


class GasStationsResource(Resource):
    def get(self):
        gasstation_schema_query.validate(request.args)
        if len(request.args):
            gs = find_closest_gasstations(
                request.args.get('near'), int(request.args.get('page')))
            result = paginated_gasstations_schema.dump(gs)
        else:
            gs = get_all()
            result = min_gas_stations_schema.dump(gs)
        return result


class PriceEvolutionResource(Resource):
    def get(self):
        gs = get_price_evolution()
        result = price_evolution.dump(gs)
        return result


class PricesResource(Resource):
    def get(self):
        gs = get_prices()
        result = rawprices.dump(gs)
        return result


api.add_resource(GasStationResource,
                 '/api/v1/gas_stations/<int:gas_station_id>', endpoint='gas_station')
api.add_resource(GasStationsResource, '/api/v1/gas_stations/',
                 endpoint='gas_stations')
api.add_resource(PriceEvolutionResource,
                 '/api/v1/analytics/prices_evolution', endpoint='price_evolution')
api.add_resource(PricesResource, '/api/v1/analytics/prices', endpoint='prices')
