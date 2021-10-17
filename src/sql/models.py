from sqlalchemy.types import Float, Integer, String, DateTime
from sqlalchemy.schema import Column
from sqlalchemy.orm import relationship
from geoalchemy2.types import Geometry
import src.sql.db as db
from sqlalchemy.sql.schema import ForeignKey


class GasStation(db.Base):
    __tablename__ = 'gasstations'

    id = Column(Integer, primary_key=True)
    cp = Column(String, nullable=False)
    direction = Column(String, nullable=False)
    labour_data = Column(String, nullable=False)
    coordinates = Column(Geometry('POINT'))
    margin = Column(String, nullable=False)
    id_adminzone1 = Column(Integer, nullable=False)
    id_adminzone2 = Column(Integer, nullable=False)
    id_adminzone3 = Column(Integer, nullable=False)
    remision = Column(String, nullable=False)
    name = Column(String, nullable=False)
    sale_type = Column(String, nullable=False)
    perc_bioeth = Column(Float, nullable=False)
    perc_metil_ester = Column(Float, nullable=False)
    prices = relationship("Prices", backref='gasstations', lazy='dynamic',
                          cascade='save-update, merge, delete, delete-orphan')

    def __init__(self, id, cp, direction, labour_data, coordinates, margin, id_adminzone1, id_adminzone2, id_adminzone3,
                 remision, name, sale_type, perf_bioeth, perc_metil_ester, prices):
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
        self.prices = prices

    def __str__(self):
        return self.name


class Prices(db.Base):
    __tablename__ = 'prices'

    date = Column(DateTime, nullable=True, primary_key=True)
    gasstation_id = Column(Integer, ForeignKey(GasStation.id), primary_key=True)
    biodiesel = Column(Float, nullable=True)
    bioethanol = Column(Float, nullable=True)
    compressed_natgas = Column(Float, nullable=True)
    liq_natgas = Column(Float, nullable=True)
    liq_gas_from_oil = Column(Float, nullable=True)
    diesel_a = Column(Float, nullable=True)
    diesel_b = Column(Float, nullable=True)
    diesel_prem = Column(Float, nullable=True)
    gasoline_95e10 = Column(Float, nullable=True)
    gasoline_95e5 = Column(Float, nullable=True)
    gasoline_95e5prem = Column(Float, nullable=True)
    gasoline_98e10 = Column(Float, nullable=True)
    gasoline_98e5 = Column(Float, nullable=True)
    h = Column(Float, nullable=True)

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
