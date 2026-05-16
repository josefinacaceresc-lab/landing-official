#!/usr/bin/env python3
"""
Admin Panel Backend API Testing for Instituto DBT Chile
Tests all admin endpoints with cookie-based authentication.
"""

import requests
import json
from pymongo import MongoClient
from datetime import datetime
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv('/app/.env')

# CRITICAL: Use localhost:3000 as specified in review request
BASE_URL = 'http://localhost:3000'
MONGO_URL = os.getenv('MONGO_URL', 'mongodb://localhost:27017')
DB_NAME = os.getenv('DB_NAME', 'institutodbt')
ADMIN_PASSWORD = os.getenv('ADMIN_PASSWORD', 'Elcoihue3776')

print(f"🔧 Configuration:")
print(f"   BASE_URL: {BASE_URL}")
print(f"   MONGO_URL: {MONGO_URL}")
print(f"   DB_NAME: {DB_NAME}")
print(f"   ADMIN_PASSWORD: {ADMIN_PASSWORD}")
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

# Create a session to persist cookies
session = requests.Session()


def test_admin_login():
    """Test POST /api/admin/login"""
    print("=" * 80)
    print("TEST 1: POST /api/admin/login")
    print("=" * 80)
    
    endpoint = f"{BASE_URL}/api/admin/login"
    
    # Test 1a: Valid password
    print("\n--- Test 1a: Login with correct password ---")
    try:
        response = session.post(endpoint, json={"password": ADMIN_PASSWORD}, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        print(f"Set-Cookie header: {response.headers.get('Set-Cookie', 'NOT PRESENT')}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get('success') and 'expiresAt' in data:
                print("✅ Login successful with success=true and expiresAt")
                
                # Check for Set-Cookie header
                set_cookie = response.headers.get('Set-Cookie', '')
                if 'admin_session=' in set_cookie and 'HttpOnly' in set_cookie:
                    print(f"✅ Set-Cookie header present with admin_session and HttpOnly")
                    
                    # Extract token from cookie
                    token = None
                    for part in set_cookie.split(';'):
                        if 'admin_session=' in part:
                            token = part.split('=')[1].strip()
                            break
                    
                    if token:
                        print(f"✅ Session token extracted: {token[:20]}...")
                        
                        # Verify session in MongoDB
                        admin_session = db.admin_sessions.find_one({'token': token})
                        if admin_session:
                            print(f"✅ Session stored in MongoDB admin_sessions collection:")
                            print(f"   - token: {admin_session.get('token')[:20]}...")
                            print(f"   - expiresAt: {admin_session.get('expiresAt')}")
                            print(f"   - createdAt: {admin_session.get('createdAt')}")
                            print("✅ TEST 1a PASSED")
                        else:
                            print("❌ Session NOT found in MongoDB")
                    else:
                        print("❌ Could not extract token from Set-Cookie")
                else:
                    print(f"❌ Set-Cookie header missing or invalid: {set_cookie}")
            else:
                print("❌ Response missing success or expiresAt")
        else:
            print(f"❌ Expected 200, got {response.status_code}")
            print(f"❌ TEST 1a FAILED")
    except Exception as e:
        print(f"❌ Request failed: {e}")
        print(f"❌ TEST 1a FAILED")
    
    # Test 1b: Wrong password
    print("\n--- Test 1b: Login with wrong password ---")
    try:
        response = requests.post(endpoint, json={"password": "WRONG"}, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 401:
            data = response.json()
            if 'error' in data and 'incorrecta' in data['error'].lower():
                print("✅ Wrong password correctly rejected with 401 and 'Contraseña incorrecta'")
                print("✅ TEST 1b PASSED")
            else:
                print(f"❌ Expected error message with 'incorrecta', got: {data}")
        else:
            print(f"❌ Expected 401, got {response.status_code}")
            print(f"❌ TEST 1b FAILED")
    except Exception as e:
        print(f"❌ Request failed: {e}")
        print(f"❌ TEST 1b FAILED")
    
    # Test 1c: Empty body
    print("\n--- Test 1c: Login with empty body ---")
    try:
        response = requests.post(endpoint, json={}, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 400:
            print("✅ Empty body correctly rejected with 400")
            print("✅ TEST 1c PASSED")
        else:
            print(f"❌ Expected 400, got {response.status_code}")
            print(f"❌ TEST 1c FAILED")
    except Exception as e:
        print(f"❌ Request failed: {e}")
        print(f"❌ TEST 1c FAILED")
    
    print()


def test_admin_me():
    """Test GET /api/admin/me"""
    print("=" * 80)
    print("TEST 2: GET /api/admin/me")
    print("=" * 80)
    
    endpoint = f"{BASE_URL}/api/admin/me"
    
    # Test 2a: Without cookie (should fail)
    print("\n--- Test 2a: GET /api/admin/me without cookie ---")
    try:
        response = requests.get(endpoint, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 401:
            print("✅ Request without cookie correctly rejected with 401")
            print("✅ TEST 2a PASSED")
        else:
            print(f"❌ Expected 401, got {response.status_code}")
            print(f"❌ TEST 2a FAILED")
    except Exception as e:
        print(f"❌ Request failed: {e}")
        print(f"❌ TEST 2a FAILED")
    
    # Test 2b: With valid cookie (should succeed)
    print("\n--- Test 2b: GET /api/admin/me with valid cookie ---")
    try:
        response = session.get(endpoint, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get('authenticated') and 'expiresAt' in data:
                print("✅ Authenticated request successful with authenticated=true and expiresAt")
                print("✅ TEST 2b PASSED")
            else:
                print(f"❌ Response missing authenticated or expiresAt: {data}")
        else:
            print(f"❌ Expected 200, got {response.status_code}")
            print(f"❌ TEST 2b FAILED")
    except Exception as e:
        print(f"❌ Request failed: {e}")
        print(f"❌ TEST 2b FAILED")
    
    print()


def test_admin_leads():
    """Test GET /api/admin/leads"""
    print("=" * 80)
    print("TEST 3: GET /api/admin/leads")
    print("=" * 80)
    
    endpoint = f"{BASE_URL}/api/admin/leads"
    
    # Test 3a: Without cookie (should fail)
    print("\n--- Test 3a: GET /api/admin/leads without cookie ---")
    try:
        response = requests.get(endpoint, timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 401:
            print("✅ Request without cookie correctly rejected with 401")
            print("✅ TEST 3a PASSED")
        else:
            print(f"❌ Expected 401, got {response.status_code}")
            print(f"❌ TEST 3a FAILED")
    except Exception as e:
        print(f"❌ Request failed: {e}")
        print(f"❌ TEST 3a FAILED")
    
    # Test 3b: With valid cookie (should succeed)
    print("\n--- Test 3b: GET /api/admin/leads with valid cookie ---")
    try:
        response = session.get(endpoint, timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            if 'leads' in data and 'stats' in data:
                print(f"✅ Response contains leads array ({len(data['leads'])} leads) and stats")
                
                # Check stats structure
                stats = data['stats']
                required_stats = ['total', 'today', 'week', 'month', 'afterHours', 'contacted', 'count']
                missing_stats = [s for s in required_stats if s not in stats]
                if not missing_stats:
                    print(f"✅ Stats object contains all required fields:")
                    print(f"   - total: {stats['total']}")
                    print(f"   - today: {stats['today']}")
                    print(f"   - week: {stats['week']}")
                    print(f"   - month: {stats['month']}")
                    print(f"   - afterHours: {stats['afterHours']}")
                    print(f"   - contacted: {stats['contacted']}")
                    print(f"   - count: {stats['count']}")
                else:
                    print(f"❌ Stats missing fields: {missing_stats}")
                
                # Check that each lead has an 'id' field
                if data['leads']:
                    leads_without_id = [i for i, lead in enumerate(data['leads']) if 'id' not in lead]
                    if not leads_without_id:
                        print(f"✅ All leads have 'id' field")
                        print("✅ TEST 3b PASSED")
                    else:
                        print(f"❌ {len(leads_without_id)} leads missing 'id' field at indices: {leads_without_id[:5]}")
                else:
                    print("⚠️  No leads in database, but response structure is correct")
                    print("✅ TEST 3b PASSED")
            else:
                print(f"❌ Response missing leads or stats: {list(data.keys())}")
        else:
            print(f"❌ Expected 200, got {response.status_code}")
            print(f"❌ TEST 3b FAILED")
    except Exception as e:
        print(f"❌ Request failed: {e}")
        print(f"❌ TEST 3b FAILED")
    
    # Test 3c: Filter by mode=after-hours
    print("\n--- Test 3c: GET /api/admin/leads?mode=after-hours ---")
    try:
        response = session.get(f"{endpoint}?mode=after-hours", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            leads = data.get('leads', [])
            
            # Check that all returned leads have mode='after-hours'
            non_after_hours = [l for l in leads if l.get('mode') != 'after-hours']
            if not non_after_hours:
                print(f"✅ Filter working: all {len(leads)} leads have mode='after-hours'")
                print("✅ TEST 3c PASSED")
            else:
                print(f"❌ Filter not working: {len(non_after_hours)} leads don't have mode='after-hours'")
        else:
            print(f"❌ Expected 200, got {response.status_code}")
            print(f"❌ TEST 3c FAILED")
    except Exception as e:
        print(f"❌ Request failed: {e}")
        print(f"❌ TEST 3c FAILED")
    
    # Test 3d: Filter by status=new
    print("\n--- Test 3d: GET /api/admin/leads?status=new ---")
    try:
        response = session.get(f"{endpoint}?status=new", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            leads = data.get('leads', [])
            
            # Check that all returned leads have status='new'
            non_new = [l for l in leads if l.get('status') != 'new']
            if not non_new:
                print(f"✅ Filter working: all {len(leads)} leads have status='new'")
                print("✅ TEST 3d PASSED")
            else:
                print(f"❌ Filter not working: {len(non_new)} leads don't have status='new'")
        else:
            print(f"❌ Expected 200, got {response.status_code}")
            print(f"❌ TEST 3d FAILED")
    except Exception as e:
        print(f"❌ Request failed: {e}")
        print(f"❌ TEST 3d FAILED")
    
    print()


def test_create_test_lead():
    """Test POST /api/leads/fast-capture to create a test lead for PATCH testing"""
    print("=" * 80)
    print("TEST 4: POST /api/leads/fast-capture (create test lead)")
    print("=" * 80)
    
    endpoint = f"{BASE_URL}/api/leads/fast-capture"
    
    payload = {
        "fullName": "Test Lead Admin Panel",
        "phone": "+56912345678",
        "email": "testadmin@admin.cl",
        "source": "admin-test",
        "mode": "after-hours",
        "timestamp": datetime.now().isoformat()
    }
    
    try:
        response = session.post(endpoint, json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get('success') and 'leadId' in data:
                print(f"✅ Test lead created successfully")
                
                # Find the lead in MongoDB by email to get the UUID 'id' field
                lead = db.leads.find_one({'email': 'testadmin@admin.cl'})
                if lead and 'id' in lead:
                    lead_id = lead['id']
                    print(f"✅ Lead found in MongoDB with id: {lead_id}")
                    print("✅ TEST 4 PASSED")
                    return lead_id
                else:
                    print("❌ Lead not found in MongoDB or missing 'id' field")
                    return None
            else:
                print(f"❌ Response missing success or leadId: {data}")
                return None
        else:
            print(f"❌ Expected 200, got {response.status_code}")
            print(f"❌ TEST 4 FAILED")
            return None
    except Exception as e:
        print(f"❌ Request failed: {e}")
        print(f"❌ TEST 4 FAILED")
        return None


def test_admin_patch_lead(lead_id):
    """Test PATCH /api/admin/leads/:id"""
    print("=" * 80)
    print("TEST 5: PATCH /api/admin/leads/:id")
    print("=" * 80)
    
    if not lead_id:
        print("❌ No lead_id provided, skipping PATCH tests")
        return
    
    endpoint = f"{BASE_URL}/api/admin/leads/{lead_id}"
    
    # Test 5a: Without cookie (should fail)
    print("\n--- Test 5a: PATCH without cookie ---")
    try:
        response = requests.patch(endpoint, json={"status": "contacted"}, timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 401:
            print("✅ Request without cookie correctly rejected with 401")
            print("✅ TEST 5a PASSED")
        else:
            print(f"❌ Expected 401, got {response.status_code}")
            print(f"❌ TEST 5a FAILED")
    except Exception as e:
        print(f"❌ Request failed: {e}")
        print(f"❌ TEST 5a FAILED")
    
    # Test 5b: Mark as contacted
    print("\n--- Test 5b: PATCH to mark as contacted ---")
    try:
        response = session.patch(endpoint, json={"status": "contacted"}, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get('success') and data.get('status') == 'contacted':
                print("✅ Lead marked as contacted")
                
                # Verify in MongoDB
                lead = db.leads.find_one({'id': lead_id})
                if lead:
                    if lead.get('status') == 'contacted' and lead.get('contactedAt'):
                        print(f"✅ MongoDB updated: status='contacted', contactedAt={lead.get('contactedAt')}")
                        print("✅ TEST 5b PASSED")
                    else:
                        print(f"❌ MongoDB not updated correctly: status={lead.get('status')}, contactedAt={lead.get('contactedAt')}")
                else:
                    print("❌ Lead not found in MongoDB")
            else:
                print(f"❌ Response incorrect: {data}")
        else:
            print(f"❌ Expected 200, got {response.status_code}")
            print(f"❌ TEST 5b FAILED")
    except Exception as e:
        print(f"❌ Request failed: {e}")
        print(f"❌ TEST 5b FAILED")
    
    # Test 5c: Toggle back to new
    print("\n--- Test 5c: PATCH to toggle back to new ---")
    try:
        response = session.patch(endpoint, json={"status": "new"}, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get('success') and data.get('status') == 'new':
                print("✅ Lead marked as new")
                
                # Verify in MongoDB
                lead = db.leads.find_one({'id': lead_id})
                if lead:
                    if lead.get('status') == 'new' and lead.get('contactedAt') is None:
                        print(f"✅ MongoDB updated: status='new', contactedAt=None")
                        print("✅ TEST 5c PASSED")
                    else:
                        print(f"❌ MongoDB not updated correctly: status={lead.get('status')}, contactedAt={lead.get('contactedAt')}")
                else:
                    print("❌ Lead not found in MongoDB")
            else:
                print(f"❌ Response incorrect: {data}")
        else:
            print(f"❌ Expected 200, got {response.status_code}")
            print(f"❌ TEST 5c FAILED")
    except Exception as e:
        print(f"❌ Request failed: {e}")
        print(f"❌ TEST 5c FAILED")
    
    # Test 5d: Invalid lead ID
    print("\n--- Test 5d: PATCH with invalid lead ID ---")
    try:
        invalid_endpoint = f"{BASE_URL}/api/admin/leads/invalid-id-12345"
        response = session.patch(invalid_endpoint, json={"status": "contacted"}, timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 404:
            print("✅ Invalid lead ID correctly rejected with 404")
            print("✅ TEST 5d PASSED")
        else:
            print(f"❌ Expected 404, got {response.status_code}")
            print(f"❌ TEST 5d FAILED")
    except Exception as e:
        print(f"❌ Request failed: {e}")
        print(f"❌ TEST 5d FAILED")
    
    print()


def test_admin_whatsapp_clicks():
    """Test GET /api/admin/whatsapp-clicks"""
    print("=" * 80)
    print("TEST 6: GET /api/admin/whatsapp-clicks")
    print("=" * 80)
    
    endpoint = f"{BASE_URL}/api/admin/whatsapp-clicks"
    
    # Test 6a: Without cookie (should fail)
    print("\n--- Test 6a: GET /api/admin/whatsapp-clicks without cookie ---")
    try:
        response = requests.get(endpoint, timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 401:
            print("✅ Request without cookie correctly rejected with 401")
            print("✅ TEST 6a PASSED")
        else:
            print(f"❌ Expected 401, got {response.status_code}")
            print(f"❌ TEST 6a FAILED")
    except Exception as e:
        print(f"❌ Request failed: {e}")
        print(f"❌ TEST 6a FAILED")
    
    # Test 6b: With valid cookie (should succeed)
    print("\n--- Test 6b: GET /api/admin/whatsapp-clicks with valid cookie ---")
    try:
        response = session.get(endpoint, timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            if 'clicks' in data and 'stats' in data:
                print(f"✅ Response contains clicks array ({len(data['clicks'])} clicks) and stats")
                
                # Check stats structure
                stats = data['stats']
                required_stats = ['total', 'today', 'week', 'direct', 'afterHours']
                missing_stats = [s for s in required_stats if s not in stats]
                if not missing_stats:
                    print(f"✅ Stats object contains all required fields:")
                    print(f"   - total: {stats['total']}")
                    print(f"   - today: {stats['today']}")
                    print(f"   - week: {stats['week']}")
                    print(f"   - direct: {stats['direct']}")
                    print(f"   - afterHours: {stats['afterHours']}")
                    print("✅ TEST 6b PASSED")
                else:
                    print(f"❌ Stats missing fields: {missing_stats}")
            else:
                print(f"❌ Response missing clicks or stats: {list(data.keys())}")
        else:
            print(f"❌ Expected 200, got {response.status_code}")
            print(f"❌ TEST 6b FAILED")
    except Exception as e:
        print(f"❌ Request failed: {e}")
        print(f"❌ TEST 6b FAILED")
    
    print()


def test_admin_export_csv():
    """Test GET /api/admin/export-csv"""
    print("=" * 80)
    print("TEST 7: GET /api/admin/export-csv")
    print("=" * 80)
    
    endpoint = f"{BASE_URL}/api/admin/export-csv"
    
    # Test 7a: Without cookie (should fail)
    print("\n--- Test 7a: GET /api/admin/export-csv without cookie ---")
    try:
        response = requests.get(endpoint, timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 401:
            print("✅ Request without cookie correctly rejected with 401")
            print("✅ TEST 7a PASSED")
        else:
            print(f"❌ Expected 401, got {response.status_code}")
            print(f"❌ TEST 7a FAILED")
    except Exception as e:
        print(f"❌ Request failed: {e}")
        print(f"❌ TEST 7a FAILED")
    
    # Test 7b: With valid cookie (should succeed)
    print("\n--- Test 7b: GET /api/admin/export-csv with valid cookie ---")
    try:
        response = session.get(endpoint, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Content-Type: {response.headers.get('Content-Type', 'NOT PRESENT')}")
        print(f"Content-Disposition: {response.headers.get('Content-Disposition', 'NOT PRESENT')}")
        
        if response.status_code == 200:
            content_type = response.headers.get('Content-Type', '')
            content_disposition = response.headers.get('Content-Disposition', '')
            
            # Check headers
            if 'text/csv' in content_type:
                print("✅ Content-Type is text/csv")
            else:
                print(f"❌ Content-Type is not text/csv: {content_type}")
            
            if 'attachment' in content_disposition and '.csv' in content_disposition:
                print("✅ Content-Disposition has attachment and .csv filename")
            else:
                print(f"❌ Content-Disposition incorrect: {content_disposition}")
            
            # Check CSV content
            csv_content = response.text
            lines = csv_content.strip().split('\n')
            
            if lines:
                header = lines[0]
                expected_headers = ['createdAt', 'fullName', 'phone', 'email', 'mode', 'source', 'sourceContext', 'status', 'contactedAt', 'age', 'rut']
                
                # Check if all expected headers are present
                headers_present = all(h in header for h in expected_headers)
                if headers_present:
                    print(f"✅ CSV header contains all expected fields")
                    print(f"   Header: {header}")
                else:
                    print(f"❌ CSV header missing some fields")
                    print(f"   Expected: {expected_headers}")
                    print(f"   Got: {header}")
                
                # Check if test lead is in CSV
                test_lead_found = any('testadmin@admin.cl' in line for line in lines[1:])
                if test_lead_found:
                    print(f"✅ Test lead found in CSV export")
                else:
                    print(f"⚠️  Test lead not found in CSV (may have been created after export)")
                
                print(f"✅ CSV export working - {len(lines)} lines (including header)")
                print("✅ TEST 7b PASSED")
            else:
                print("❌ CSV content is empty")
        else:
            print(f"❌ Expected 200, got {response.status_code}")
            print(f"❌ TEST 7b FAILED")
    except Exception as e:
        print(f"❌ Request failed: {e}")
        print(f"❌ TEST 7b FAILED")
    
    print()


def test_admin_logout():
    """Test POST /api/admin/logout"""
    print("=" * 80)
    print("TEST 8: POST /api/admin/logout")
    print("=" * 80)
    
    endpoint = f"{BASE_URL}/api/admin/logout"
    
    # Test 8a: Logout with valid cookie
    print("\n--- Test 8a: POST /api/admin/logout with valid cookie ---")
    try:
        response = session.post(endpoint, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        print(f"Set-Cookie header: {response.headers.get('Set-Cookie', 'NOT PRESENT')}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get('success'):
                print("✅ Logout successful with success=true")
                
                # Check for Set-Cookie header with Max-Age=0
                set_cookie = response.headers.get('Set-Cookie', '')
                if 'admin_session=' in set_cookie and 'Max-Age=0' in set_cookie:
                    print(f"✅ Set-Cookie header clears the cookie with Max-Age=0")
                    print("✅ TEST 8a PASSED")
                else:
                    print(f"❌ Set-Cookie header incorrect: {set_cookie}")
            else:
                print(f"❌ Response missing success: {data}")
        else:
            print(f"❌ Expected 200, got {response.status_code}")
            print(f"❌ TEST 8a FAILED")
    except Exception as e:
        print(f"❌ Request failed: {e}")
        print(f"❌ TEST 8a FAILED")
    
    # Test 8b: Verify /api/admin/me now returns 401
    print("\n--- Test 8b: Verify GET /api/admin/me returns 401 after logout ---")
    try:
        me_endpoint = f"{BASE_URL}/api/admin/me"
        response = session.get(me_endpoint, timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 401:
            print("✅ After logout, /api/admin/me correctly returns 401")
            print("✅ TEST 8b PASSED")
        else:
            print(f"❌ Expected 401, got {response.status_code}")
            print(f"❌ TEST 8b FAILED")
    except Exception as e:
        print(f"❌ Request failed: {e}")
        print(f"❌ TEST 8b FAILED")
    
    print()


def main():
    """Run all admin backend tests"""
    print("\n" + "=" * 80)
    print("INSTITUTO DBT CHILE - ADMIN PANEL BACKEND API TESTING")
    print("Testing cookie-based authentication and admin endpoints")
    print("=" * 80)
    print()
    
    # Run all tests in sequence
    test_admin_login()
    test_admin_me()
    test_admin_leads()
    lead_id = test_create_test_lead()
    test_admin_patch_lead(lead_id)
    test_admin_whatsapp_clicks()
    test_admin_export_csv()
    test_admin_logout()
    
    print("=" * 80)
    print("ALL ADMIN TESTS COMPLETED")
    print("=" * 80)
    print()
    
    # Close MongoDB connection
    mongo_client.close()


if __name__ == "__main__":
    main()
