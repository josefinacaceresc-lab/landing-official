#!/usr/bin/env python3
"""
Email Regex Verification Test
Specifically tests that the email regex fix allows valid emails with 's' and '.' characters
"""

import requests
import json
import os
from dotenv import load_dotenv

load_dotenv('/app/.env')

BASE_URL = os.getenv('NEXT_PUBLIC_BASE_URL', 'https://nextjs-dbt-cl.preview.emergentagent.com')

print("=" * 80)
print("EMAIL REGEX FIX VERIFICATION")
print("Testing that emails with 's' and '.' are now accepted")
print("=" * 80)
print()

# Test emails that would have been rejected by the double-escaped regex
test_emails = [
    ("maria.perez@correo.cl", "Email with 's' and '.' - was broken before"),
    ("sebastian.silva@gmail.com", "Multiple 's' characters"),
    ("test.user@example.com", "Standard email with dot"),
    ("user@subdomain.example.com", "Email with subdomain"),
    ("simple@test.cl", "Simple Chilean email"),
    ("no.dots.here@nodots.com", "Multiple dots in local part"),
]

endpoint = f"{BASE_URL}/api/leads/idp4"

for email, description in test_emails:
    print(f"Testing: {email}")
    print(f"Description: {description}")
    
    payload = {
        "fullName": "Test User",
        "age": 30,
        "rut": "12345678-5",
        "email": email,
        "domainScores": {"a": 5},
        "responses": [1, 2, 3]
    }
    
    try:
        response = requests.post(endpoint, json=payload, timeout=10)
        if response.status_code == 200:
            print(f"✅ ACCEPTED - Status: {response.status_code}")
        else:
            print(f"❌ REJECTED - Status: {response.status_code}")
            print(f"   Response: {response.json()}")
    except Exception as e:
        print(f"❌ ERROR: {e}")
    
    print()

print("=" * 80)
print("VERIFICATION COMPLETE")
print("=" * 80)
