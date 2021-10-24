from src.sql.models import GasStation
from .db import session


def persist(gas_stations: list[GasStation]):
    for idx, gas_station in enumerate(gas_stations):
        gs = session.query(GasStation).get(gas_station.id)  # will give you either Parent or None
        if not (gs):
            session.add(gas_station)
            session.commit()
            continue
        gs.prices.extend(gas_station.new_prices)
        print(idx, "--",len(gas_stations))
    session.commit()


def get(gas_station_id):
    return session.query(GasStation).get(gas_station_id)
