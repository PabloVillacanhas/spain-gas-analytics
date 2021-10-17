from src.sql.models import GasStation, Prices
from src.types import RestResponse
from datetime import datetime
import pytz


def transform_to_float(value):
    return float(value.replace(',', '.')) if bool(value) else None


def transform_to_utc_datetime(value):
    timezone = pytz.timezone("Europe/Madrid")
    date_aware = timezone.localize(datetime.strptime(value, '%d/%m/%Y %H:%M:%S'))
    return date_aware.astimezone(pytz.utc)


def rest_response_to_normalized(data: RestResponse) -> list[GasStation]:
    gas_stations = []
    for x in data.lista_eess_precio:
        prices = Prices(transform_to_float(x.precio_biodiesel),
                        transform_to_float(x.precio_bioetanol),
                        transform_to_float(x.precio_gas_natural_comprimido),
                        transform_to_float(x.precio_gas_natural_licuado),
                        transform_to_float(x.precio_gases_licuados_del_petróleo),
                        transform_to_float(x.precio_gasoleo_a),
                        transform_to_float(x.precio_gasoleo_b),
                        transform_to_float(x.precio_gasoleo_premium),
                        transform_to_float(x.precio_gasolina_95_e10),
                        transform_to_float(x.precio_gasolina_95_e5),
                        transform_to_float(x.precio_gasolina_95_e5_premium),
                        transform_to_float(x.precio_gasolina_98_e10),
                        transform_to_float(x.precio_gasolina_95_e5),
                        transform_to_float(x.precio_hidrogeno),
                        transform_to_utc_datetime(data.fecha),
                        x.ideess)
        gas_stations.append(
            GasStation(x.ideess, x.c_p, x.dirección, x.horario,
                       f'SRID=4269;POINT({transform_to_float(x.longitud_wgs84)} {transform_to_float(x.latitud)})',
                       x.margen, x.id_municipio, x.id_provincia, x.idccaa, x.remisión, x.rótulo, x.tipo_venta,
                       transform_to_float(x.bio_etanol),
                       transform_to_float(x.éster_metílico), [prices]))
    return gas_stations
