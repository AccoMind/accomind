from pydantic import BaseModel


class Metric(BaseModel):
    net_income: float
    revenue: float
    earnings_per_share: float