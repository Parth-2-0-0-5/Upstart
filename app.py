import streamlit as st
import requests

st.title("Startup Market Valuation Calculator")

industry = st.selectbox("Select Industry", ["Tech", "AI", "Finance", "Healthcare", "Education", "E-commerce", "Blockchain"])
revenue = st.number_input("Annual Revenue ($)", min_value=0, step=1000)
funding_stage = st.selectbox("Funding Stage", ["Pre-Seed", "Seed", "Series A", "Series B", "Series C", "IPO"])
investors_count = st.number_input("Number of Investors", min_value=0, step=1)
funding_received = st.number_input("Funding Received ($)", min_value=0, step=10000)

if st.button("Calculate Valuation"):
    api_url = "http://127.0.0.1:8000/calculate_valuation"  
    response = requests.get(api_url, params={
        "industry": industry,
        "revenue": revenue,
        "funding_stage": funding_stage,
        "investors_count": investors_count,
        "funding_received": funding_received
    })
    
    result = response.json()
    
    if result:
        st.success(f"📊 Estimated Market Valuation: **${result['estimated_valuation']:,}**")
    else:
        st.warning("Could not calculate valuation. Try again.")
