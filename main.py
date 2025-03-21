from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from fastapi.responses import FileResponse
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

df = pd.read_csv("try.csv")

downloads_dir = os.path.join(os.getcwd(), "downloads")
os.makedirs(downloads_dir, exist_ok=True)

@app.get("/match")
def match_profiles(
    user_role: str,
    industry: str = Query(None),
    min_experience: int = Query(None),
    min_funding: int = Query(None)
):
    if not df.empty:
        matches = df.copy()
    else:
        matches = pd.DataFrame()
    
    if user_role.lower() == "newbie":
        matches = matches[matches["role"].isin(["newbie", "mentor", "entrepreneur", "investor"])]
    elif user_role.lower() == "entrepreneur":
        matches = matches[matches["role"].isin(["mentor", "investor"])]
    elif user_role.lower() == "investor":
        matches = matches[matches["role"] == "entrepreneur"]
    elif user_role.lower() == "mentor":
        # Updated to include other mentors
        matches = matches[matches["role"].isin(["newbie", "entrepreneur", "mentor"])]
    
    if industry and isinstance(industry, str):
        matches = matches[matches["industry"].str.contains(industry, case=False, na=False)]
    
    if min_experience is not None:
        matches = matches[pd.to_numeric(matches["experience"], errors="coerce").fillna(0) >= min_experience]
    
    if min_funding and user_role.lower() == "investor":
        matches = matches[pd.to_numeric(matches["funding_needed"], errors="coerce").fillna(0) <= min_funding]
    
    return matches[["name", "role", "industry", "experience", "funding_needed", "email", "phone", "linkedin"]].to_dict(orient="records")

@app.get("/download_matches")
def download_matches(
    user_role: str,
    industry: str = Query(None),
    min_experience: int = Query(None),
    min_funding: int = Query(None)
):
    filtered_df = match_profiles(user_role, industry, min_experience, min_funding)
    
   
    filename = os.path.join(downloads_dir, f"{user_role}_matches.csv")
    
    pd.DataFrame(filtered_df).to_csv(filename, index=False)
    return FileResponse(filename, media_type="text/csv", filename=f"{user_role}_matches.csv")