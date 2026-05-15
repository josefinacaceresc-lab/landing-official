#!/usr/bin/env python3
"""
Backend API Testing for Instituto DBT Chile Lead Capture Endpoints
Tests the email regex fix and MongoDB persistence for all lead-capture endpoints.
"""

import requests
import json
from pymongo import MongoClient
from datetime import datetime
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv('/app/.env')

BASE_URL = os.getenv('NEXT_PUBLIC_BASE_URL', 'https://nextjs-dbt-cl.preview.emergentagent.com')
MONGO_URL = os.getenv('MONGO_URL', 'mongodb://localhost:27017')
DB_NAME = os.getenv('DB_NAME', 'institutodbt')

print(f"🔧 Configuration:")
print(f"   BASE_URL: {BASE_URL}")
print(f"   MONGO_URL: {MONGO_URL}")
print(f"   DB_NAME: {DB_NAME}")
print()

# Connect to MongoDB
try:
    mongo_client = MongoClient(MONGO_URL)
    db = mongo_client[DB_NAME]
    print(f"✅ Connected to MongoDB database: {DB_NAME}")
    print()
except Exception as e:
    print(f"❌ Failed to connect to MongoDB: {e}")
    exit(1)


def generate_valid_rut():
    """Generate a valid Chilean RUT with proper check digit using mod-11 algorithm"""
    # Use a real-looking RUT number
    body = "12345678"
    
    # Calculate verification digit using the same algorithm as the server
    sum_val = 0
    multiplier = 2
    
    for i in range(len(body) - 1, -1, -1):
        sum_val += int(body[i]) * multiplier
        multiplier = 2 if multiplier == 7 else multiplier + 1
    
    calculated_dv = 11 - (sum_val % 11)
    
    if calculated_dv == 11:
        dv = '0'
    elif calculated_dv == 10:
        dv = 'K'
    else:
        dv = str(calculated_dv)
    
    return f"{body}-{dv}"


def test_idp4_endpoint():
    """Test POST /api/leads/idp4 - CRITICAL endpoint that was completely broken"""
    print("=" * 80)
    print("TEST 1: POST /api/leads/idp4 (IDP-4 Assessment Lead Capture)")
    print("=" * 80)
    
    endpoint = f"{BASE_URL}/api/leads/idp4"
    
    # Get initial count
    initial_count = db.leads.count_documents({'source': 'idp4'})
    print(f"📊 Initial IDP-4 leads count: {initial_count}")
    
    # Test 1a: Valid payload with real-looking Chilean email
    print("\n--- Test 1a: Valid payload with Chilean email ---")
    valid_rut = generate_valid_rut()
    print(f"Generated valid RUT: {valid_rut}")
    
    valid_payload = {
        "fullName": "María Pérez González",
        "age": 28,
        "rut": valid_rut,
        "email": "maria.perez@correo.cl",
        "domainScores": {
            "emotional": 7,
            "interpersonal": 4,
            "behavioral": 6
        },
        "responses": [1, 2, 3, 4, 5, 2, 3, 4, 1, 2]
    }
    
    try:
        response = requests.post(endpoint, json=valid_payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 200:
            data = response.json()
            if 'lakairaToken' in data and 'lakairaExpiresAt' in data:
                print("✅ Valid payload accepted - lakairaToken and lakairaExpiresAt present")
                
                # Verify MongoDB persistence
                new_count = db.leads.count_documents({'source': 'idp4'})
                if new_count > initial_count:
                    print(f"✅ Document persisted to MongoDB - count increased from {initial_count} to {new_count}")
                    
                    # Verify document structure
                    lead = db.leads.find_one({'email': 'maria.perez@correo.cl', 'source': 'idp4'})
                    if lead:
                        print(f"✅ Lead document found with:")
                        print(f"   - fullName: {lead.get('fullName')}")
                        print(f"   - email: {lead.get('email')}")
                        print(f"   - source: {lead.get('source')}")
                        print(f"   - status: {lead.get('status')}")
                        print(f"   - lakairaToken: {lead.get('lakairaToken')[:20]}...")
                        print("✅ TEST 1a PASSED")
                    else:
                        print("❌ Lead document not found in database")
                else:
                    print(f"❌ Document NOT persisted - count still {new_count}")
            else:
                print("❌ Response missing lakairaToken or lakairaExpiresAt")
        else:
            print(f"❌ Expected 200, got {response.status_code}")
            print(f"❌ TEST 1a FAILED")
    except Exception as e:
        print(f"❌ Request failed: {e}")
        print(f"❌ TEST 1a FAILED")
    
    # Test 1b: Invalid email (should reject)
    print("\n--- Test 1b: Invalid email (should return 400) ---")
    invalid_email_payload = {
        "fullName": "Test User",
        "age": 30,
        "rut": valid_rut,
        "email": "not-an-email",
        "domainScores": {"a": 5},
        "responses": [1, 2, 3]
    }
    
    try:
        response = requests.post(endpoint, json=invalid_email_payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 400:
            print("✅ Invalid email correctly rejected with 400")
            print("✅ TEST 1b PASSED")
        else:
            print(f"❌ Expected 400, got {response.status_code}")
            print(f"❌ TEST 1b FAILED")
    except Exception as e:
        print(f"❌ Request failed: {e}")
        print(f"❌ TEST 1b FAILED")
    
    # Test 1c: Invalid RUT (should reject)
    print("\n--- Test 1c: Invalid RUT (should return 400) ---")
    invalid_rut_payload = {
        "fullName": "Test User",
        "age": 30,
        "rut": "12345678-9",  # Wrong check digit (should be 5, not 9)
        "email": "test@example.com",
        "domainScores": {"a": 5},
        "responses": [1, 2, 3]
    }
    
    try:
        response = requests.post(endpoint, json=invalid_rut_payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 400:
            print("✅ Invalid RUT correctly rejected with 400")
            print("✅ TEST 1c PASSED")
        else:
            print(f"❌ Expected 400, got {response.status_code}")
            print(f"❌ TEST 1c FAILED")
    except Exception as e:
        print(f"❌ Request failed: {e}")
        print(f"❌ TEST 1c FAILED")
    
    # Test 1d: Missing required field (should reject)
    print("\n--- Test 1d: Missing fullName (should return 400) ---")
    missing_field_payload = {
        "age": 30,
        "rut": valid_rut,
        "email": "test@example.com",
        "domainScores": {"a": 5},
        "responses": [1, 2, 3]
    }
    
    try:
        response = requests.post(endpoint, json=missing_field_payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 400:
            print("✅ Missing field correctly rejected with 400")
            print("✅ TEST 1d PASSED")
        else:
            print(f"❌ Expected 400, got {response.status_code}")
            print(f"❌ TEST 1d FAILED")
    except Exception as e:
        print(f"❌ Request failed: {e}")
        print(f"❌ TEST 1d FAILED")
    
    print()


def test_bsl23_endpoint():
    """Test POST /api/leads/bsl23 - Same regex fix applied"""
    print("=" * 80)
    print("TEST 2: POST /api/leads/bsl23 (BSL-23 Assessment Lead Capture)")
    print("=" * 80)
    
    endpoint = f"{BASE_URL}/api/leads/bsl23"
    
    # Get initial count
    initial_count = db.leads.count_documents({'source': 'bsl23'})
    print(f"📊 Initial BSL-23 leads count: {initial_count}")
    
    # Generate valid RUT
    valid_rut = generate_valid_rut()
    print(f"Generated valid RUT: {valid_rut}")
    
    valid_payload = {
        "fullName": "Juan Soto Ramírez",
        "rut": valid_rut,
        "email": "juan.soto@example.com",
        "phone": "+56912345678",
        "totalScore": 25,
        "meanScore": 1.2,
        "subscaleScores": {
            "self_perception": 5,
            "affect_regulation": 8,
            "self_destruction": 12
        },
        "responses": [1, 2, 1, 3, 2, 1, 2, 3, 1, 2, 1, 3, 2, 1, 2, 3, 1, 2, 1, 3, 2, 1, 2]
    }
    
    try:
        response = requests.post(endpoint, json=valid_payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 200:
            data = response.json()
            if 'lakairaToken' in data and 'lakairaExpiresAt' in data:
                print("✅ Valid payload accepted - lakairaToken and lakairaExpiresAt present")
                
                # Verify MongoDB persistence
                new_count = db.leads.count_documents({'source': 'bsl23'})
                if new_count > initial_count:
                    print(f"✅ Document persisted to MongoDB - count increased from {initial_count} to {new_count}")
                    
                    # Verify document structure
                    lead = db.leads.find_one({'email': 'juan.soto@example.com', 'source': 'bsl23'})
                    if lead:
                        print(f"✅ Lead document found with:")
                        print(f"   - fullName: {lead.get('fullName')}")
                        print(f"   - email: {lead.get('email')}")
                        print(f"   - source: {lead.get('source')}")
                        print(f"   - totalScore: {lead.get('totalScore')}")
                        print("✅ TEST 2 PASSED")
                    else:
                        print("❌ Lead document not found in database")
                else:
                    print(f"❌ Document NOT persisted - count still {new_count}")
            else:
                print("❌ Response missing lakairaToken or lakairaExpiresAt")
        else:
            print(f"❌ Expected 200, got {response.status_code}")
            print(f"❌ TEST 2 FAILED")
    except Exception as e:
        print(f"❌ Request failed: {e}")
        print(f"❌ TEST 2 FAILED")
    
    print()


def test_fast_capture_endpoint():
    """Test POST /api/leads/fast-capture - Regression check"""
    print("=" * 80)
    print("TEST 3: POST /api/leads/fast-capture (Fast WhatsApp Capture)")
    print("=" * 80)
    
    endpoint = f"{BASE_URL}/api/leads/fast-capture"
    
    # Get initial count
    initial_count = db.leads.count_documents({'source': 'whatsapp-fast-capture'})
    print(f"📊 Initial fast-capture leads count: {initial_count}")
    
    # Test 3a: Business-hours mode (name only)
    print("\n--- Test 3a: Business-hours mode (name only) ---")
    business_hours_payload = {
        "fullName": "Ana Soto Martínez",
        "source": "hero",
        "mode": "business-hours",
        "timestamp": "2026-05-14T18:00:00Z"
    }
    
    try:
        response = requests.post(endpoint, json=business_hours_payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get('success') and data.get('mode') == 'business-hours':
                print("✅ Business-hours mode accepted")
                
                # Verify MongoDB persistence
                new_count = db.leads.count_documents({'source': 'whatsapp-fast-capture'})
                if new_count > initial_count:
                    print(f"✅ Document persisted to MongoDB - count increased from {initial_count} to {new_count}")
                    
                    # Verify document
                    lead = db.leads.find_one({'fullName': 'Ana Soto Martínez', 'mode': 'business-hours'})
                    if lead:
                        print(f"✅ Lead document found with mode: {lead.get('mode')}")
                        print("✅ TEST 3a PASSED")
                        initial_count = new_count  # Update for next test
                    else:
                        print("❌ Lead document not found in database")
                else:
                    print(f"❌ Document NOT persisted - count still {new_count}")
            else:
                print("❌ Response missing success or mode field")
        else:
            print(f"❌ Expected 200, got {response.status_code}")
            print(f"❌ TEST 3a FAILED")
    except Exception as e:
        print(f"❌ Request failed: {e}")
        print(f"❌ TEST 3a FAILED")
    
    # Test 3b: After-hours mode (name + phone + email required)
    print("\n--- Test 3b: After-hours mode (name + phone + email) ---")
    after_hours_payload = {
        "fullName": "Carlos Díaz López",
        "phone": "+56987654321",
        "email": "carlos.diaz@correo.cl",
        "source": "footer",
        "mode": "after-hours",
        "timestamp": "2026-05-14T22:00:00Z"
    }
    
    try:
        response = requests.post(endpoint, json=after_hours_payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get('success') and data.get('mode') == 'after-hours':
                print("✅ After-hours mode accepted")
                
                # Verify MongoDB persistence
                new_count = db.leads.count_documents({'source': 'whatsapp-fast-capture'})
                if new_count > initial_count:
                    print(f"✅ Document persisted to MongoDB - count increased from {initial_count} to {new_count}")
                    
                    # Verify document
                    lead = db.leads.find_one({'email': 'carlos.diaz@correo.cl', 'mode': 'after-hours'})
                    if lead:
                        print(f"✅ Lead document found with:")
                        print(f"   - mode: {lead.get('mode')}")
                        print(f"   - phone: {lead.get('phone')}")
                        print(f"   - email: {lead.get('email')}")
                        print("✅ TEST 3b PASSED")
                    else:
                        print("❌ Lead document not found in database")
                else:
                    print(f"❌ Document NOT persisted - count still {new_count}")
            else:
                print("❌ Response missing success or mode field")
        else:
            print(f"❌ Expected 200, got {response.status_code}")
            print(f"❌ TEST 3b FAILED")
    except Exception as e:
        print(f"❌ Request failed: {e}")
        print(f"❌ TEST 3b FAILED")
    
    print()


def test_idp4_consent_endpoint():
    """Test POST /api/leads/idp4-consent - Regression check"""
    print("=" * 80)
    print("TEST 4: POST /api/leads/idp4-consent (IDP-4 Consent Registration)")
    print("=" * 80)
    
    endpoint = f"{BASE_URL}/api/leads/idp4-consent"
    
    # Get initial count
    initial_count = db.idp4_consents.count_documents({})
    print(f"📊 Initial consent records count: {initial_count}")
    
    valid_payload = {
        "consentAccepted": True,
        "consentedAt": "2026-05-14T18:00:00Z",
        "legalFramework": "Ley 19.628 / 21.331 / 20.584"
    }
    
    try:
        response = requests.post(endpoint, json=valid_payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get('success') and 'registeredAt' in data:
                print("✅ Consent accepted and registered")
                
                # Verify MongoDB persistence
                new_count = db.idp4_consents.count_documents({})
                if new_count > initial_count:
                    print(f"✅ Document persisted to MongoDB - count increased from {initial_count} to {new_count}")
                    
                    # Verify document structure
                    consent = db.idp4_consents.find_one({'consentedAt': '2026-05-14T18:00:00Z'})
                    if consent:
                        print(f"✅ Consent document found with:")
                        print(f"   - consentAccepted: {consent.get('consentAccepted')}")
                        print(f"   - consentedAt: {consent.get('consentedAt')}")
                        print(f"   - legalFramework: {consent.get('legalFramework')}")
                        print("✅ TEST 4 PASSED")
                    else:
                        print("❌ Consent document not found in database")
                else:
                    print(f"❌ Document NOT persisted - count still {new_count}")
            else:
                print("❌ Response missing success or registeredAt field")
        else:
            print(f"❌ Expected 200, got {response.status_code}")
            print(f"❌ TEST 4 FAILED")
    except Exception as e:
        print(f"❌ Request failed: {e}")
        print(f"❌ TEST 4 FAILED")
    
    print()


def main():
    """Run all backend tests"""
    print("\n" + "=" * 80)
    print("INSTITUTO DBT CHILE - BACKEND API TESTING")
    print("Email Regex Fix Verification & MongoDB Persistence Check")
    print("=" * 80)
    print()
    
    # Run all tests
    test_idp4_endpoint()
    test_bsl23_endpoint()
    test_fast_capture_endpoint()
    test_idp4_consent_endpoint()
    
    print("=" * 80)
    print("ALL TESTS COMPLETED")
    print("=" * 80)
    print()
    
    # Close MongoDB connection
    mongo_client.close()


if __name__ == "__main__":
    main()
