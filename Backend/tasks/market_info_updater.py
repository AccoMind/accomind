# app/tasks/market_updater.py

from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger
from sqlalchemy.orm import Session
from db.session import SessionLocal
from models.market_info import MarketInfo
from models.company import Company
import requests

# Setup your session once, reuse it
session = requests.Session()

API_URL = "https://www.cse.lk/pages/company-profile/company-profile.component.html?symbol=ABAN.N0000"

class MarketInfoUpdater:

    def __init__(self):
        self.session = requests.Session()
        self.db: Session = SessionLocal()

    def fetch_market_data_by_symbol(self, symbol: str):

        url = "https://www.cse.lk/api/companyInfoSummery"
        data = {"symbol": symbol}
        print(data)
        response = self.session.post(url, data=data)

        response.raise_for_status()
        return response.json()

    def update_market_info_by_symbol(self, company_id: int, symbol: str):
        market_data = self.fetch_market_data_by_symbol(symbol)

        info = market_data.get('reqSymbolInfo')

        print(info)

        if not company_id or not info:
            return

        market_info = MarketInfo(
            company_id=company_id,
            stock_price=info.get('lastTradedPrice'),
            price_change=info.get('change'),
            market_cap=info.get('marketCap'),
            turnover=info.get('tdyTurnover'),
            share_volume=info.get('tdyShareVolume'),
            trade_volume=info.get('tdyTradeVolume'),
            hi_trade=info.get('hiTrade'),
            low_trade=info.get('lowTrade'),
        )

        self.db.add(market_info)

    def update_market_data(self):
        try:
            companies = self.db.query(Company).all()

            for company in companies:
                self.update_market_info_by_symbol(company.id, company.stock_symbol)

            self.db.commit()
            print(f"[Market Update] Successfully updated market info for {len(companies)} companies.")

        except Exception as e:
            print(f"[Market Update Error]: {e}")
            self.db.rollback()
        finally:
            self.db.close()

def update_market_info():
    market_update = MarketInfoUpdater()
    market_update.update_market_data()


scheduler = BackgroundScheduler()

def start_scheduler():
    scheduler.add_job(
        update_market_info,
        CronTrigger(day_of_week='mon-fri', hour=14, minute=30, timezone='Asia/Kolkata'),
        id='market_info_updater',
        replace_existing=True
    )

    if not scheduler.running:
        scheduler.start()
        print("Scheduler started successfully.")
    else:
        print("Scheduler is already running.")

if __name__ == "__main__":
    start_scheduler()