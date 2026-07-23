#!/usr/bin/env python3
"""
Backend test for PATCH /api/admin/leads/:id endpoint with 4-status system.
Tests the expanded lead status system: new, en_proceso, contacted, ingresado.
"""

import requests
import time
import os

# Get base URL from environment
BASE_URL = os.getenv('NEXT_PUBLIC_BASE_URL', 'http://localhost:3000')
API_BASE = f"{BASE_URL}/api"
ADMIN_PASSWORD = "Elcoihue3776"

print(f"🧪 Testing Lead Status PATCH Endpoint")
print(f"📍 Base URL: {BASE_URL}")
print("=" * 80)

# Track test results
tests_passed = 0
tests_failed = 0

def test_result(test_name, passed, details=""):
    global tests_passed, tests_failed
    if passed:
        tests_passed += 1
        print(f"✅ {test_name}")
        if details:
            print(f"   {details}")
    else:
        tests_failed += 1
        print(f"❌ {test_name}")
        if details:
            print(f"   {details}")

# ============================================================================
# Test 1: Admin Login
# ============================================================================
print("\n📋 Test 1: Admin Login")
try:
    response = requests.post(
        f"{API_BASE}/admin/login",
        json={"password": ADMIN_PASSWORD},
        timeout=10
    )
    if response.status_code == 200:
        data = response.json()
        cookies = response.cookies
        admin_session = cookies.get('admin_session')
        if admin_session and data.get('success'):
            test_result("Admin login successful", True, f"Session cookie: {admin_session[:20]}...")
        else:
            test_result("Admin login successful", False, f"No session cookie or success=false: {data}")
    else:
        test_result("Admin login successful", False, f"Status {response.status_code}: {response.text}")
except Exception as e:
    test_result("Admin login successful", False, f"Exception: {e}")
    print("❌ Cannot continue without admin session. Exiting.")
    exit(1)

# ============================================================================
# Test 2: Get existing lead or create one
# ============================================================================
print("\n📋 Test 2: Get existing lead ID")
try:
    response = requests.get(
        f"{API_BASE}/admin/leads",
        cookies=cookies,
        timeout=10
    )
    if response.status_code == 200:
        data = response.json()
        leads = data.get('leads', [])
        if leads:
            lead_id = leads[0].get('id')
            test_result("Get existing lead ID", True, f"Found lead ID: {lead_id}")
        else:
            # Create a test lead
            print("   No leads found. Creating test lead...")
            create_response = requests.post(
                f"{API_BASE}/leads/fast-capture",
                json={
                    "fullName": "Test Estado Agent",
                    "phone": "+56987654321",
                    "intent": "info",
                    "source": "test",
                    "mode": "serena-v2",
                    "channel": "whatsapp",
                    "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
                },
                timeout=10
            )
            if create_response.status_code == 200:
                create_data = create_response.json()
                lead_id = create_data.get('leadId')
                test_result("Create test lead", True, f"Created lead ID: {lead_id}")
                # Wait a moment for DB to sync
                time.sleep(1)
            else:
                test_result("Create test lead", False, f"Status {create_response.status_code}")
                exit(1)
    else:
        test_result("Get existing lead ID", False, f"Status {response.status_code}")
        exit(1)
except Exception as e:
    test_result("Get existing lead ID", False, f"Exception: {e}")
    exit(1)

# ============================================================================
# Test 3: PATCH with status "en_proceso"
# ============================================================================
print("\n📋 Test 3: PATCH /api/admin/leads/{id} with status='en_proceso'")
try:
    response = requests.patch(
        f"{API_BASE}/admin/leads/{lead_id}",
        json={"status": "en_proceso"},
        cookies=cookies,
        headers={"Content-Type": "application/json"},
        timeout=10
    )
    if response.status_code == 200:
        data = response.json()
        if data.get('success') and data.get('status') == 'en_proceso':
            test_result("PATCH status='en_proceso'", True, f"Response: {data}")
        else:
            test_result("PATCH status='en_proceso'", False, f"Unexpected response: {data}")
    else:
        test_result("PATCH status='en_proceso'", False, f"Status {response.status_code}: {response.text}")
except Exception as e:
    test_result("PATCH status='en_proceso'", False, f"Exception: {e}")

# Verify persistence
print("   Verifying persistence in database...")
try:
    response = requests.get(f"{API_BASE}/admin/leads", cookies=cookies, timeout=10)
    if response.status_code == 200:
        leads = response.json().get('leads', [])
        lead = next((l for l in leads if l.get('id') == lead_id), None)
        if lead and lead.get('status') == 'en_proceso':
            test_result("Verify status='en_proceso' persisted", True, f"Status in DB: {lead.get('status')}")
        else:
            test_result("Verify status='en_proceso' persisted", False, f"Lead status: {lead.get('status') if lead else 'NOT FOUND'}")
    else:
        test_result("Verify status='en_proceso' persisted", False, f"Status {response.status_code}")
except Exception as e:
    test_result("Verify status='en_proceso' persisted", False, f"Exception: {e}")

# ============================================================================
# Test 4: PATCH with status "ingresado"
# ============================================================================
print("\n📋 Test 4: PATCH /api/admin/leads/{id} with status='ingresado'")
try:
    response = requests.patch(
        f"{API_BASE}/admin/leads/{lead_id}",
        json={"status": "ingresado"},
        cookies=cookies,
        headers={"Content-Type": "application/json"},
        timeout=10
    )
    if response.status_code == 200:
        data = response.json()
        if data.get('success') and data.get('status') == 'ingresado':
            test_result("PATCH status='ingresado'", True, f"Response: {data}")
        else:
            test_result("PATCH status='ingresado'", False, f"Unexpected response: {data}")
    else:
        test_result("PATCH status='ingresado'", False, f"Status {response.status_code}: {response.text}")
except Exception as e:
    test_result("PATCH status='ingresado'", False, f"Exception: {e}")

# Verify persistence
print("   Verifying persistence in database...")
try:
    response = requests.get(f"{API_BASE}/admin/leads", cookies=cookies, timeout=10)
    if response.status_code == 200:
        leads = response.json().get('leads', [])
        lead = next((l for l in leads if l.get('id') == lead_id), None)
        if lead and lead.get('status') == 'ingresado':
            test_result("Verify status='ingresado' persisted", True, f"Status in DB: {lead.get('status')}")
        else:
            test_result("Verify status='ingresado' persisted", False, f"Lead status: {lead.get('status') if lead else 'NOT FOUND'}")
    else:
        test_result("Verify status='ingresado' persisted", False, f"Status {response.status_code}")
except Exception as e:
    test_result("Verify status='ingresado' persisted", False, f"Exception: {e}")

# ============================================================================
# Test 5: PATCH with status "contacted"
# ============================================================================
print("\n📋 Test 5: PATCH /api/admin/leads/{id} with status='contacted'")
try:
    response = requests.patch(
        f"{API_BASE}/admin/leads/{lead_id}",
        json={"status": "contacted"},
        cookies=cookies,
        headers={"Content-Type": "application/json"},
        timeout=10
    )
    if response.status_code == 200:
        data = response.json()
        if data.get('success') and data.get('status') == 'contacted':
            test_result("PATCH status='contacted'", True, f"Response: {data}")
        else:
            test_result("PATCH status='contacted'", False, f"Unexpected response: {data}")
    else:
        test_result("PATCH status='contacted'", False, f"Status {response.status_code}: {response.text}")
except Exception as e:
    test_result("PATCH status='contacted'", False, f"Exception: {e}")

# Verify persistence
print("   Verifying persistence in database...")
try:
    response = requests.get(f"{API_BASE}/admin/leads", cookies=cookies, timeout=10)
    if response.status_code == 200:
        leads = response.json().get('leads', [])
        lead = next((l for l in leads if l.get('id') == lead_id), None)
        if lead and lead.get('status') == 'contacted':
            test_result("Verify status='contacted' persisted", True, f"Status in DB: {lead.get('status')}")
        else:
            test_result("Verify status='contacted' persisted", False, f"Lead status: {lead.get('status') if lead else 'NOT FOUND'}")
    else:
        test_result("Verify status='contacted' persisted", False, f"Status {response.status_code}")
except Exception as e:
    test_result("Verify status='contacted' persisted", False, f"Exception: {e}")

# ============================================================================
# Test 6: PATCH with status "new"
# ============================================================================
print("\n📋 Test 6: PATCH /api/admin/leads/{id} with status='new'")
try:
    response = requests.patch(
        f"{API_BASE}/admin/leads/{lead_id}",
        json={"status": "new"},
        cookies=cookies,
        headers={"Content-Type": "application/json"},
        timeout=10
    )
    if response.status_code == 200:
        data = response.json()
        if data.get('success') and data.get('status') == 'new':
            test_result("PATCH status='new'", True, f"Response: {data}")
        else:
            test_result("PATCH status='new'", False, f"Unexpected response: {data}")
    else:
        test_result("PATCH status='new'", False, f"Status {response.status_code}: {response.text}")
except Exception as e:
    test_result("PATCH status='new'", False, f"Exception: {e}")

# Verify persistence
print("   Verifying persistence in database...")
try:
    response = requests.get(f"{API_BASE}/admin/leads", cookies=cookies, timeout=10)
    if response.status_code == 200:
        leads = response.json().get('leads', [])
        lead = next((l for l in leads if l.get('id') == lead_id), None)
        if lead and lead.get('status') == 'new':
            test_result("Verify status='new' persisted", True, f"Status in DB: {lead.get('status')}")
        else:
            test_result("Verify status='new' persisted", False, f"Lead status: {lead.get('status') if lead else 'NOT FOUND'}")
    else:
        test_result("Verify status='new' persisted", False, f"Status {response.status_code}")
except Exception as e:
    test_result("Verify status='new' persisted", False, f"Exception: {e}")

# ============================================================================
# Test 7: PATCH with invalid status (should fallback to "new")
# ============================================================================
print("\n📋 Test 7: PATCH /api/admin/leads/{id} with invalid status='valor_invalido_xyz'")
try:
    response = requests.patch(
        f"{API_BASE}/admin/leads/{lead_id}",
        json={"status": "valor_invalido_xyz"},
        cookies=cookies,
        headers={"Content-Type": "application/json"},
        timeout=10
    )
    if response.status_code == 200:
        data = response.json()
        if data.get('success') and data.get('status') == 'new':
            test_result("PATCH invalid status fallback to 'new'", True, f"Response: {data}")
        else:
            test_result("PATCH invalid status fallback to 'new'", False, f"Expected status='new', got: {data}")
    else:
        test_result("PATCH invalid status fallback to 'new'", False, f"Status {response.status_code}: {response.text}")
except Exception as e:
    test_result("PATCH invalid status fallback to 'new'", False, f"Exception: {e}")

# Verify persistence (should be "new", not the invalid value)
print("   Verifying invalid status NOT persisted...")
try:
    response = requests.get(f"{API_BASE}/admin/leads", cookies=cookies, timeout=10)
    if response.status_code == 200:
        leads = response.json().get('leads', [])
        lead = next((l for l in leads if l.get('id') == lead_id), None)
        if lead and lead.get('status') == 'new':
            test_result("Verify invalid status NOT persisted", True, f"Status correctly set to 'new' in DB")
        else:
            test_result("Verify invalid status NOT persisted", False, f"Lead status: {lead.get('status') if lead else 'NOT FOUND'}")
    else:
        test_result("Verify invalid status NOT persisted", False, f"Status {response.status_code}")
except Exception as e:
    test_result("Verify invalid status NOT persisted", False, f"Exception: {e}")

# ============================================================================
# Test 8: PATCH without authentication (should return 401)
# ============================================================================
print("\n📋 Test 8: PATCH /api/admin/leads/{id} without authentication")
try:
    response = requests.patch(
        f"{API_BASE}/admin/leads/{lead_id}",
        json={"status": "contacted"},
        headers={"Content-Type": "application/json"},
        timeout=10
    )
    if response.status_code == 401:
        test_result("PATCH without auth returns 401", True, f"Correctly rejected with 401")
    else:
        test_result("PATCH without auth returns 401", False, f"Expected 401, got {response.status_code}: {response.text}")
except Exception as e:
    test_result("PATCH without auth returns 401", False, f"Exception: {e}")

# ============================================================================
# Test 9: PATCH with non-existent lead ID (should return 404)
# ============================================================================
print("\n📋 Test 9: PATCH /api/admin/leads/id-inexistente-9999")
try:
    response = requests.patch(
        f"{API_BASE}/admin/leads/id-inexistente-9999",
        json={"status": "contacted"},
        cookies=cookies,
        headers={"Content-Type": "application/json"},
        timeout=10
    )
    if response.status_code == 404:
        test_result("PATCH non-existent ID returns 404", True, f"Correctly returned 404")
    else:
        test_result("PATCH non-existent ID returns 404", False, f"Expected 404, got {response.status_code}: {response.text}")
except Exception as e:
    test_result("PATCH non-existent ID returns 404", False, f"Exception: {e}")

# ============================================================================
# Test 10: Regression - POST /api/leads/fast-capture still works
# ============================================================================
print("\n📋 Test 10: Regression - POST /api/leads/fast-capture")
try:
    response = requests.post(
        f"{API_BASE}/leads/fast-capture",
        json={
            "fullName": "Regression Test User",
            "phone": "+56912345678",
            "intent": "Consulta general",
            "source": "test",
            "mode": "serena-v2",
            "channel": "whatsapp",
            "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
        },
        timeout=10
    )
    if response.status_code == 200:
        data = response.json()
        if data.get('success'):
            test_result("POST /api/leads/fast-capture regression", True, f"Response: success={data.get('success')}")
        else:
            test_result("POST /api/leads/fast-capture regression", False, f"success=false: {data}")
    else:
        test_result("POST /api/leads/fast-capture regression", False, f"Status {response.status_code}: {response.text}")
except Exception as e:
    test_result("POST /api/leads/fast-capture regression", False, f"Exception: {e}")

# ============================================================================
# Summary
# ============================================================================
print("\n" + "=" * 80)
print(f"📊 TEST SUMMARY")
print(f"✅ Passed: {tests_passed}")
print(f"❌ Failed: {tests_failed}")
print(f"📈 Total: {tests_passed + tests_failed}")
if tests_failed == 0:
    print("🎉 ALL TESTS PASSED!")
else:
    print(f"⚠️  {tests_failed} test(s) failed")
print("=" * 80)
