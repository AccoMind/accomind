from sqlalchemy.orm import relationship

from db.base import Base
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Numeric


class Company(Base):
    __tablename__ = 'company'
    id = Column(Integer, primary_key=True)
    name = Column(String(255))
    stock_symbol = Column(String(50))
    logo_url = Column(String(255))
    industry = Column(String(50))
    location = Column(String(100))
    description = Column(String(800))
    founded = Column(Integer)
    website = Column(String(100))

    market_infos = relationship("MarketInfo", back_populates="company")
    company_metrics = relationship("CompanyMetrics", back_populates="company")

class CompanyMetrics(Base):
    __tablename__ = 'company_metrics'
    id = Column(Integer, primary_key=True)
    company_id = Column(Integer, ForeignKey("company.id"))
    pe_ratio = Column(Numeric(10, 2))
    beta = Column(Numeric(5, 2))
    dividend_yield = Column(Numeric(5, 2))
    revenue = Column(Numeric(18, 2))
    net_income = Column(Numeric(18, 2))
    earnings_per_share = Column(Numeric(18, 2))
    financial_year = Column(String(9))
    from_date = Column(DateTime)
    to_date = Column(DateTime)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)

    company = relationship("Company", back_populates="company_metrics")