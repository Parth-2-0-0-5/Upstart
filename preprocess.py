import pandas as pd

df = pd.read_csv("users_dataset.csv")

def find_matches(role, industry=None, min_experience=None, min_funding=None):
   
    filtered = df[df["role"] == role]

    if industry:
        filtered = filtered[filtered["industry"].str.contains(industry, case=False, na=False)]
    if min_experience:
        filtered = filtered[pd.to_numeric(filtered["experience"], errors='coerce').fillna(0) >= min_experience]
    if min_funding and role == "investor":
        filtered = filtered[pd.to_numeric(filtered["funding_available"], errors='coerce').fillna(0) >= min_funding]

    return filtered

filtered_df = find_matches("mentor", industry="Tech", min_experience=5)

filtered_df.to_csv("filtered_profiles.csv", index=False)

print("Filtered dataset saved as filtered_profiles.csv")