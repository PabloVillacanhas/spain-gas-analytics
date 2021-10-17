from src.sql.models import GasStation
from .db import session


def persist(gas_stations: list[GasStation]):
    session.add_all(gas_stations)
    session.commit()
