from backend.extensions import ma
from ..sql.models import GasStation, Prices
from shapely_geojson import Feature, dumps
from geoalchemy2.shape import to_shape
from marshmallow_sqlalchemy import ModelConverter
from flask_marshmallow.fields import fields
from geoalchemy2.types import Geometry
import json


class GeoConverter(ModelConverter):
    SQLA_TYPE_MAPPING = ModelConverter.SQLA_TYPE_MAPPING.copy()
    SQLA_TYPE_MAPPING.update({
        Geometry: fields.Str
    })


class PricesSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Prices


class GasStationSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = GasStation
        include_fk = True
        model_converter = GeoConverter

    prices = fields.Nested(PricesSchema, many=True)
    coordinates = fields.Method('transform_to_geojson')

    def transform_to_geojson(self, obj):
        return json.loads(dumps(Feature(to_shape(obj.coordinates))))
