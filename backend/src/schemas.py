from marshmallow.decorators import post_dump, pre_dump

from extensions import ma
from sql.models import GasStation, Prices
from shapely_geojson import Feature, dumps
from geoalchemy2.shape import to_shape
from marshmallow_sqlalchemy import ModelConverter
from flask_marshmallow.fields import fields
from geoalchemy2.types import Geometry
import json


class PagedListSchema(ma.Schema):
    pages = fields.Integer(dump_to='numPages', dump_only=True)
    per_page = fields.Integer(dump_to='perPage', dump_only=True)
    total = fields.Integer(dump_to='totalItems', dump_only=True)


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


class GasStationSchemaQuery(ma.Schema):
    near = fields.Str(required=False)


class GasStationSchemaPagination(PagedListSchema):
    items = fields.Nested(GasStationSchema, many=True, exclude=['prices', 'id_adminzone1', 'id_adminzone2', 'id_adminzone3', 'cp',
                                                    'perc_metil_ester', 'remision', 'perc_bioeth', 'margin'])
