from sqlalchemy import Column, Float, Integer, String

import db


class GasStation(db.Base):
    __tablename__ = 'producto'

    id = Column(Integer, primary_key=True)
    cp = Column(String, nullable=False)
    directions = Column(String, nullable=False)
    labour_data = Column(String, nullable=False)
    lat_lng = Column(String, nullable=False)
    margin = Column(String, nullable=False)
    id_adminzone1 = Column(Integer, nullable=False)
    id_adminzone2 = Column(Integer, nullable=False)
    id_adminzone3 = Column(Integer, nullable=False)
    remision = Column(String, nullable=False)
    name =Column(String, nullable=False)    
    sale_type = Column(String, nullable=False)
    perc_bioeth = Column(Float, nullable=False) 
    perc_metil_ester = Column(Float, nullable=False)    
    
    def __init__(self, id, cp, directions, labour_data, lat_lng, margin, id_adminzone1, id_adminzone2, id_adminzone3,
                 remision, name, sale_type, perf_bioeth, perc_metil_ester):
        self.id = id
        self.cp = cp
        self.directions = directions
        self.labour_data = labour_data
        self.lat_lng = lat_lng
        self.margin = margin
        self.id_adminzone1 = id_adminzone1
        self.id_adminzone2 = id_adminzone2
        self.id_adminzone3 = id_adminzone3
        self.remision = remision
        self.name = name
        self.sale_type = sale_type
        self.perc_bioeth = perf_bioeth
        self.perc_metil_ester = perc_metil_ester


    def __str__(self):
        return self.nombre
