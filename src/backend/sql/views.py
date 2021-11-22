from . import db


class PriceEvolutionView(db.Model):
    __tablename__ = 'prices_evolution'

    date = db.Column(db.DateTime, nullable=True, primary_key=True)
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
