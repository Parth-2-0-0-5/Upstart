from fastapi import FastAPI
import pandas as pd

app = FastAPI()

industry_multiples = {
    "Tech": 7,
    "AI": 10,
    "Finance": 6,
    "Healthcare": 8,
    "Education": 5,
    "E-commerce": 4,
    "Blockchain": 12
}

@app.get("/calculate_valuation")
def calculate_valuation(
    industry: str,
    revenue: int,
    funding_stage: str,
    investors_count: int,
    funding_received: int
):
    
    multiple = industry_multiples.get(industry, 5)

    valuation = revenue * multiple
    
    return {
        "industry": industry,
        "revenue": revenue,
        "funding_stage": funding_stage,
        "investors_count": investors_count,
        "funding_received": funding_received,
        "estimated_valuation": valuation
    }

