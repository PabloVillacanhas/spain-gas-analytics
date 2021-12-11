from flask_marshmallow.schema import Schema
from marshmallow.decorators import post_dump, pre_dump

from backend.extensions import ma
from backend.sql.models import GasStation, Prices
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


class BaseSQLAlchemyAutoSchema(ma.SQLAlchemyAutoSchema):

    @post_dump
    def remove_skip_values(self, data, **kwargs):
        return {
            key: value for key, value in data.items()
            if value is not None
        }


class PricesSchema(BaseSQLAlchemyAutoSchema):
    class Meta:
        model = Prices


class GasStationSchema(BaseSQLAlchemyAutoSchema):
    class Meta:
        model = GasStation
        include_fk = True
        model_converter = GeoConverter

    last_price = fields.Nested(PricesSchema, many=True)
    prices = fields.Nested(PricesSchema, many=True)
    coordinates = fields.Method('transform_to_geojson')

    def transform_to_geojson(self, obj):
        if obj.coordinates:
            return json.loads(dumps(Feature(to_shape(obj.coordinates))))
        return []