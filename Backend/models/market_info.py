from sqlalchemy.orm import relationship

from db.base import Base
from sqlalchemy import Column, Integer, ForeignKey, DateTime, Numeric
import datetime

class MarketInfo(Base):
    __tablename__ = "market_info"
    id = Column(Integer, primary_key=True)
    company_id = Column(Integer, ForeignKey("company.id"))
    stock_price = Column(Numeric(10, 2))
    price_change = Column(Numeric(10, 2))
    market_cap = Column(Numeric(18, 2))
    turnover = Column(Numeric(18, 2))
    share_volume = Column(Integer)
    trade_volume = Column(Integer)
    hi_trade = Column(Numeric(8, 2))
    low_trade = Column(Numeric(8, 2))
    beta = Column(Numeric(5, 2))
    created_at = Column(
        DateTime, default=datetime.datetime.now(datetime.timezone.utc))
    updated_at = Column(
        DateTime, default=datetime.datetime.now(datetime.timezone.utc))

    company = relationship("Company", back_populates="market_infos")