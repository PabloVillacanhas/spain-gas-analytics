from src.sql.models import GasStation
from .db import session


def persist(gas_stations: list[GasStation]):
    for idx, gas_station in enumerate(gas_stations):
        session.merge(gas_station)
        print(f"{idx}/{len(gas_stations)}")
    session.commit()


def get(gas_station_id):
    return session.query(GasStation).filter(GasStation.id == gas_station_id)[0]
