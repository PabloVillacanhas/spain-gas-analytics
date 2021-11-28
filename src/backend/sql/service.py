from sqlalchemy.sql.elements import and_

from backend.sql.models import GasStation, Prices
from . import db
from .views import PriceEvolutionView


def persist(gas_stations: list[GasStation]):
    for idx, gas_station in enumerate(gas_stations):
        gs = db.session.query(GasStation).get(gas_station.id)
        if not (gs):
            db.session.add(gas_station)
            db.session.commit()
            continue
        gs.prices.extend(gas_station.new_prices)
        print(idx, "--", len(gas_stations))
    db.session.commit()


def get(gas_station_id):
    gs = db.session.query(GasStation).join(Prices). \
        where(GasStation.id == gas_station_id) \
        .first()
    db.session.commit()
    return gs


def get_all():
    result = db.session.query(GasStation).join(Prices) \
        .filter(and_(GasStation.coordinates != None, GasStation.prices != None))
    db.session.commit()
    return result.all()


def get_price_evolution():
    result = db.session.query(PriceEvolutionView)
    db.session.commit()
    return result.all()
