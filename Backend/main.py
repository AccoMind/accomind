from contextlib import asynccontextmanager

from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from endpoints.chatbot import router as chat_router
from endpoints.auth import router as auth_router
from endpoints.company import router as company_router
from tasks.market_info_updater import update_market_info

scheduler = BackgroundScheduler()

scheduler.add_job(
    update_market_info,
    CronTrigger(day_of_week='mon-fri', hour=14, minute=30, timezone='Asia/Kolkata'),
    id='market_info_updater',
    replace_existing=True
)


@asynccontextmanager
async def lifespan(app: FastAPI):
    if not scheduler.running:
        scheduler.start()
        print("Scheduler started successfully.")
    yield
    scheduler.shutdown()
    print("Scheduler shut down successfully.")

app = FastAPI(lifespan=lifespan)

# add CORD
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(chat_router, prefix="/chat", tags=["chat"])
app.include_router(auth_router, prefix="/auth", tags=["auth"])
app.include_router(company_router, prefix="/company", tags=["company"])