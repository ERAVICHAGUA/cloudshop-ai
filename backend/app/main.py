from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.database import Base, engine
from app.models.product import Product
from app.api.products import router as products_router


app = FastAPI(
    title="CloudShop AI API",
    version="0.1.0"
)
Base.metadata.create_all(bind=engine)

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:8080",
    "http://127.0.0.1:8080",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(products_router)


@app.get("/")
def root():
    return {
        "message": "CloudShop AI API"
    }


@app.get("/health")
def health():
    return {
        "status": "ok"
    }