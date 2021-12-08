from dataclasses import dataclass
from geoalchemy2.types import Geometry
from datetime import datetime

from . import db


@dataclass
class GasStation(db.Model):
    __tablename__ = 'gasstations'

    today = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0).isoformat()

    id = db.Column(db.Integer, primary_key=True)
    cp = db.Column(db.String, nullable=False)
    direction = db.Column(db.String, nullable=False)
    labour_data = db.Column(db.String, nullable=False)
    coordinates = db.Column(Geometry('POINT'))
    margin = db.Column(db.String, nullable=False)
    id_adminzone1 = db.Column(db.Integer, nullable=False)
    id_adminzone2 = db.Column(db.Integer, nullable=False)
    id_adminzone3 = db.Column(db.Integer, nullable=False)
    remision = db.Column(db.String, nullable=False)
    name = db.Column(db.String, nullable=False)
    sale_type = db.Column(db.String, nullable=False)
    perc_bioeth = db.Column(db.Float, nullable=False)
    perc_metil_ester = db.Column(db.Float, nullable=False)
    prices = db.relationship("Prices", backref='gasstations', lazy='dynamic')
    last_price = db.relationship("Prices", lazy='joined', viewonly=True,
                                 primaryjoin=f"and_(GasStation.id==Prices.gasstation_id,Prices.date>'{today}')")

    new_prices = []

    def __init__(self, id, cp, direction, labour_data, coordinates, margin, id_adminzone1, id_adminzone2, id_adminzone3,
                 remision, name, sale_type, perf_bioeth, perc_metil_ester):
        self.id = id
        self.cp = cp
        self.direction = direction
        self.labour_data = labour_data
        self.coordinates = coordinates
        self.margin = margin
        self.id_adminzone1 = id_adminzone1
        self.id_adminzone2 = id_adminzone2
        self.id_adminzone3 = id_adminzone3
        self.remision = remision
        self.name = name
        self.sale_type = sale_type
        self.perc_bioeth = perf_bioeth
        self.perc_metil_ester = perc_metil_ester


@dataclass
class Prices(db.Model):
    __tablename__ = 'prices'

    date = db.Column(db.DateTime, nullable=True, primary_key=True)
    gasstation_id = db.Column(db.Integer, db.ForeignKey(GasStation.id), primary_key=True)
    biodiesel = db.Column(db.Float, nullable=True)
    bioethanol = db.Column(db.Float, nullable=True)
    compressed_natgas = db.Column(db.Float, nullable=True)
    liq_natgas = db.Column(db.Float, nullable=True)
    liq_gas_from_oil = db.Column(db.Float, nullable=True)
    diesel_a = db.Column(db.Float, nullable=True)
    diesel_b = db.Column(db.Float, nullable=True)
    diesel_prem = db.Column(db.Float, nullable=True)
    gasoline_95e10 = db.Column(db.Float, nullable=True)
    gasoline_95e5 = db.Column(db.Float, nullable=True)
    gasoline_95e5prem = db.Column(db.Float, nullable=True)
    gasoline_98e10 = db.Column(db.Float, nullable=True)
    gasoline_98e5 = db.Column(db.Float, nullable=True)
    h = db.Column(db.Float, nullable=True)

    def __init__(self, biodiesel, bioethanol, compressed_natgas, liq_natgas, liq_gas_from_oil, diesel_a, diesel_b,
                 diesel_prem, gasoline_95e10, gasoline_95es, gasoline_95esprem, gasoline_98e10, gasoline_98es,
                 h, date, gasstation_id) -> None:
        self.biodiesel = biodiesel
        self.bioethanol = bioethanol
        self.compressed_natgas = compressed_natgas
        self.liq_natgas = liq_natgas
        self.liq_gas_from_oil = liq_gas_from_oil
        self.diesel_a = diesel_a
        self.diesel_b = diesel_b
        self.diesel_prem = diesel_prem
        self.gasoline_95e10 = gasoline_95e10
        self.gasoline_95e5 = gasoline_95es
        self.gasoline_95e5prem = gasoline_95esprem
        self.gasoline_98e10 = gasoline_98e10
        self.gasoline_98e5 = gasoline_98es
        self.h = h
        self.date = date
        self.gasstation_id = gasstation_id


def create_schema():
    db.Base.metadata.create_all(db.engine)
