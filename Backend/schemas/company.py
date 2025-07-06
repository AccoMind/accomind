import datetime
from decimal import Decimal
from typing import Optional

from pydantic import BaseModel, PastDatetime

class CompanyCreateSchema(BaseModel):
    name: str
    description: str

class MarketInfoSchema(BaseModel):
    market_cap: Decimal
    price_change: Decimal
    stock_price: float
    created_at: PastDatetime

class MetricsSchema(BaseModel):
    pe_ratio: Decimal
    dividend_yield: Decimal
    beta: Optional[Decimal]


class CompanySchema(BaseModel):
    id: int
    name: str
    description: str
    stock_symbol: str
    logo_url: str
    industry: str
    location: str | None
    founded: int | None
    # market_info: Optional[MarketInfoSchema]

    class Config:
        from_attributes = True

class CompanyByIdSchema(CompanySchema):
    market_info: Optional[MarketInfoSchema]
    metrics: Optional[MetricsSchema]