from sqlalchemy.orm.strategy_options import lazyload

from src.sql.models import GasStation, Prices
from . import db


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
    gs = db.session.query(GasStation).join(Prices).first()
    return gs
