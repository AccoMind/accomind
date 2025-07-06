from fastapi import APIRouter, HTTPException
from fastapi.params import Depends, Query
from sqlalchemy.orm import Session
from typing_extensions import Optional

from db.session import get_db
from models.company import Company, CompanyMetrics
from models.market_info import MarketInfo
from schemas.company import CompanySchema, CompanyCreateSchema, CompanyByIdSchema
from schemas.metrics import Metric

router = APIRouter()

@router.get("/", response_model=list[CompanySchema])
async def get_all_companies(
        db: Session = Depends(get_db),
        q: Optional[str] = Query(None, description="Search query"),
        page: int = Query(1, description="Page number"),
        page_size: int = Query(10, description="Page size")
):
    query = db.query(Company)

    if q:
        query = query.filter(Company.name.ilike(f"%{q}%"))

    query = query.offset((page - 1) * page_size).limit(page_size)

    return query.all()


@router.get("/{company_id}", response_model=CompanyByIdSchema)
async def get_company_by_id(company_id: int, db: Session = Depends(get_db)):
    company = db.query(Company).filter(Company.id == company_id).first()


    if not company:
        raise HTTPException(status_code=404, detail="Company not found")

    latest_market_info = db.query(MarketInfo).filter(MarketInfo.company_id==company_id).first()
    if latest_market_info:
        company.market_info = latest_market_info

    latest_metrics = db.query(CompanyMetrics).filter(CompanyMetrics.company_id==company_id).first()
    if latest_metrics:
        company.metrics = latest_metrics

    return company

@router.get("/{company_id}/metrics", response_model=list[Metric])
async def get_company_metrics(company_id: int, db: Session = Depends(get_db)):
    metrics = db.query(CompanyMetrics).filter(CompanyMetrics.company_id==company_id).order_by(CompanyMetrics.from_date).all()

    return metrics

@router.post("/", response_model=CompanySchema, status_code=201)
async def create_company(company: CompanyCreateSchema, db: Session = Depends(get_db)) -> CompanySchema:
    company = Company(**company.model_dump())
    db.add(company)
    db.commit()
    db.refresh(company)

    return CompanySchema.model_validate(company)