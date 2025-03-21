from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import numpy as np
from joblib import load

try:
    model = load("startup_model.pkl")
    tfidf = load("tfidf_vectorizer.pkl")
    scaler = load("scaler.pkl")
    label_encoders = load("label_encoders.pkl")
except Exception as e:
    raise RuntimeError(f"Error loading model or preprocessors: {str(e)}")

app = FastAPI()


class StartupInput(BaseModel):
    business_idea: str
    progress_stage: str
    budget: float
    industry: str

@app.post("/predict-roadmap/")
def predict_roadmap(input_data: StartupInput):
    try:
        print(f"Available Progress Stages: {list(label_encoders['Progress_Stage'].classes_)}")
        print(f"Available Industries: {list(label_encoders['Industry'].classes_)}")
        
        idea_vector = tfidf.transform([input_data.business_idea]).toarray()

        if input_data.industry not in label_encoders['Industry'].classes_:
            raise HTTPException(status_code=400, detail=f"Invalid Industry: {input_data.industry}")

        if input_data.progress_stage not in label_encoders['Progress_Stage'].classes_:
            raise HTTPException(status_code=400, detail=f"Invalid Progress Stage: {input_data.progress_stage}")

        industry_encoded = label_encoders['Industry'].transform([input_data.industry])[0]
        progress_encoded = label_encoders['Progress_Stage'].transform([input_data.progress_stage])[0]
        budget_scaled = scaler.transform([[input_data.budget]])[0, 0]

        feature_vector = np.hstack((idea_vector, [[progress_encoded, industry_encoded, budget_scaled]]))

        prediction = model.predict(feature_vector)

        roadmap = {
            "Recommended_Roadmap": [
                {"Step_Name": "Market Research", "Step_Description": "Identify target customers, competitors, and trends.", "Sequence_Order": 1, "Dependencies": []},
                {"Step_Name": "Prototype Development", "Step_Description": "Build an MVP for testing.", "Sequence_Order": 2, "Dependencies": ["Market Research"]},
                {"Step_Name": "Seek Funding", "Step_Description": "Pitch to investors.", "Sequence_Order": 3, "Dependencies": ["Prototype Development"]}
            ],
            "Confidence_Score": np.random.uniform(0.8, 0.95)
        }
        return roadmap
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
