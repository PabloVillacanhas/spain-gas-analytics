from marshmallow import fields
from ..extensions import ma
from ..sql.models import GasStation, Prices
from shapely_geojson import Feature, dumps
from geoalchemy2.shape import to_shape
from marshmallow_sqlalchemy import ModelConverter
from marshmallow import fields
from geoalchemy2.types import Geometry


class GeoConverter(ModelConverter):
    SQLA_TYPE_MAPPING = ModelConverter.SQLA_TYPE_MAPPING.copy()
    SQLA_TYPE_MAPPING.update({
        Geometry: fields.Str
    })


class GasStationSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = GasStation
        include_fk = True
        model_converter = GeoConverter

    coordinates = fields.Method('transform_to_geojson')

    def transform_to_geojson(self, obj):
        return dumps(Feature(to_shape(obj.coordinates)))


class Prices(ma.Schema):
    id = fields.Integer(dump_only=True)
    name = fields.String()
