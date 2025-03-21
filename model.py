
import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder, MinMaxScaler
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from joblib import dump

# Load dataset
df = pd.read_csv("case_study.csv")

# TF-IDF Vectorization
tfidf = TfidfVectorizer(max_features=100)
business_idea_tfidf = tfidf.fit_transform(df['Business_Idea']).toarray()

# Encode Categorical Features
label_encoders = {}
for col in ['Progress_Stage', 'Industry']:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col])
    label_encoders[col] = le

# Handle Non-Numeric Budget Values
def convert_budget(value):
    try:
        return float(value)  # Convert if it's a valid number
    except ValueError:
        return np.nan  # Assign NaN if conversion fails

# Apply Conversion
df['Budget'] = df['Budget'].apply(convert_budget)

# Fill Missing Values with Median Budget
df['Budget'].fillna(df['Budget'].median(), inplace=True)

# Normalize Budget
scaler = MinMaxScaler()
df['Budget'] = scaler.fit_transform(df[['Budget']])

# Concatenate Features
X = np.hstack((business_idea_tfidf, df[['Progress_Stage', 'Industry', 'Budget']].values))
y = df['Final_Outcome']

# Train-Test Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train Model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Save Model and Preprocessing Objects
dump(model, "startup_model.pkl")
dump(tfidf, "tfidf_vectorizer.pkl")
dump(scaler, "scaler.pkl")
dump(label_encoders, "label_encoders.pkl")

print("Model training complete. Files saved.")
