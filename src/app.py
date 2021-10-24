from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_BIND'] = "engine"
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:password@localhost:5432/gas'
db = SQLAlchemy(app)
ma = Marshmallow(app)

app_context = app.app_context()


# class GasStationResource(Resource):
#     def get(self):
#         films = Film.get_all()
#         result = film_schema.dump(films, many=True)
#         return result
#
# class GasStationPricesResource(Resource):
#     def get(self, id):
#         films = get(id)
#         return result
#
# api.add_resource(GasStationResource, '/api/v1/gasstations/', endpoint='gasstations')
# api.add_resource(GasStationPricesResource, '/api/v1/gasstations/<int:gasstation_id>/prices',
#                  endpoint='gas_station_prices_resource')

