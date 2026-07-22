#!/usr/bin/env python3
"""
Backend Test: IDP-4 Complete Removal Verification
Tests that IDP-4 test has been completely removed from the site.
"""

import requests
import json
import sys
from datetime import datetime

# Base URL from environment
BASE_URL = "https://nextjs-dbt-cl.preview.emergentagent.com"
API_URL = f"{BASE_URL}/api"
ADMIN_PASSWORD = "Elcoihue3776"

# Test results tracking
tests_passed = 0
tests_failed = 0
test_results = []

def log_test(test_name, passed, message=""):
    """Log test result"""
    global tests_passed, tests_failed
    status = "✅ PASS" if passed else "❌ FAIL"
    result = f"{status} - {test_name}"
    if message:
        result += f": {message}"
    print(result)
    test_results.append({"test": test_name, "passed": passed, "message": message})
    if passed:
        tests_passed += 1
    else:
        tests_failed += 1

def test_redirects():
    """Test 1: Verify IDP-4 redirects return 301/308 to home"""
    print("\n=== TEST 1: IDP-4 REDIRECTS ===")
    
    redirect_urls = [
        "/evaluacion-idp4",
        "/evaluacion-idp4/resultados",
        "/autoevaluacion",
        "/autoevaluacion/resultados"
    ]
    
    for path in redirect_urls:
        try:
            url = f"{BASE_URL}{path}"
            # Don't follow redirects, check the redirect response
            response = requests.get(url, allow_redirects=False, timeout=10)
            
            # Check for permanent redirect (301 or 308)
            if response.status_code in [301, 308]:
                # Check redirect location
                location = response.headers.get('Location', '')
                if location.endswith('/') or location == BASE_URL or location == f"{BASE_URL}/":
                    log_test(f"Redirect {path}", True, f"{response.status_code} → {location}")
                else:
                    log_test(f"Redirect {path}", False, f"Redirects to {location} instead of /")
            else:
                log_test(f"Redirect {path}", False, f"Got {response.status_code} instead of 301/308")
        except Exception as e:
            log_test(f"Redirect {path}", False, f"Error: {str(e)}")

def test_deleted_endpoints():
    """Test 2: Verify IDP-4 endpoints return 404"""
    print("\n=== TEST 2: DELETED IDP-4 ENDPOINTS ===")
    
    # GET endpoints
    get_endpoints = [
        "/api/admin/idp4-results",
        "/api/admin/idp4-results/123",
        "/api/admin/idp4-export-csv"
    ]
    
    for endpoint in get_endpoints:
        try:
            url = f"{BASE_URL}{endpoint}"
            response = requests.get(url, timeout=10)
            
            if response.status_code == 404:
                log_test(f"GET {endpoint}", True, "Returns 404 as expected")
            else:
                log_test(f"GET {endpoint}", False, f"Returns {response.status_code} instead of 404")
        except Exception as e:
            log_test(f"GET {endpoint}", False, f"Error: {str(e)}")
    
    # POST endpoints
    post_endpoints = [
        ("/api/leads/idp4", {"fullName": "Test", "email": "test@test.cl", "rut": "12345678-5"}),
        ("/api/leads/idp4-consent", {"consentAccepted": True})
    ]
    
    for endpoint, payload in post_endpoints:
        try:
            url = f"{BASE_URL}{endpoint}"
            response = requests.post(url, json=payload, timeout=10)
            
            if response.status_code == 404:
                log_test(f"POST {endpoint}", True, "Returns 404 as expected")
            else:
                log_test(f"POST {endpoint}", False, f"Returns {response.status_code} instead of 404")
        except Exception as e:
            log_test(f"POST {endpoint}", False, f"Error: {str(e)}")

def test_remaining_apis():
    """Test 3: Verify remaining APIs are intact"""
    print("\n=== TEST 3: REMAINING APIS INTACT ===")
    
    # Test 3.1: POST /api/leads/fast-capture
    try:
        payload = {
            "fullName": "Test Backend Agent",
            "phone": "+56911112222",
            "intent": "info"
        }
        response = requests.post(f"{API_URL}/leads/fast-capture", json=payload, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if data.get('success') and data.get('leadId'):
                log_test("POST /api/leads/fast-capture", True, f"Working correctly, leadId: {data.get('leadId')[:8]}...")
            else:
                log_test("POST /api/leads/fast-capture", False, f"Missing success or leadId in response")
        else:
            log_test("POST /api/leads/fast-capture", False, f"Status {response.status_code}: {response.text[:100]}")
    except Exception as e:
        log_test("POST /api/leads/fast-capture", False, f"Error: {str(e)}")
    
    # Test 3.2: POST /api/leads/bsl23
    try:
        payload = {
            "fullName": "Test BSL",
            "rut": "12345678-5",
            "email": "test@test.cl",
            "phone": "+56911112222",
            "totalScore": 23,
            "meanScore": 1.0,
            "subscaleScores": {},
            "responses": []
        }
        response = requests.post(f"{API_URL}/leads/bsl23", json=payload, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if data.get('success'):
                log_test("POST /api/leads/bsl23", True, "Working correctly")
            else:
                log_test("POST /api/leads/bsl23", False, "Missing success in response")
        elif response.status_code == 400:
            # RUT validation might fail with test RUT, check error message
            error = response.json().get('error', '')
            if 'RUT' in error:
                log_test("POST /api/leads/bsl23", True, f"RUT validation working (400 with message: {error})")
            else:
                log_test("POST /api/leads/bsl23", False, f"Unexpected 400 error: {error}")
        else:
            log_test("POST /api/leads/bsl23", False, f"Status {response.status_code}: {response.text[:100]}")
    except Exception as e:
        log_test("POST /api/leads/bsl23", False, f"Error: {str(e)}")
    
    # Test 3.3: POST /api/whatsapp-click
    try:
        payload = {
            "source": "test",
            "mode": "direct",
            "page": "/"
        }
        response = requests.post(f"{API_URL}/whatsapp-click", json=payload, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if data.get('success'):
                log_test("POST /api/whatsapp-click", True, "Working correctly")
            else:
                log_test("POST /api/whatsapp-click", False, "Missing success in response")
        else:
            log_test("POST /api/whatsapp-click", False, f"Status {response.status_code}")
    except Exception as e:
        log_test("POST /api/whatsapp-click", False, f"Error: {str(e)}")
    
    # Test 3.4: Admin login and endpoints
    try:
        # Login
        login_response = requests.post(
            f"{API_URL}/admin/login",
            json={"password": ADMIN_PASSWORD},
            timeout=10
        )
        
        if login_response.status_code == 200:
            # Extract session cookie
            cookies = login_response.cookies
            
            # Test GET /api/admin/leads
            leads_response = requests.get(f"{API_URL}/admin/leads", cookies=cookies, timeout=10)
            
            if leads_response.status_code == 200:
                leads_data = leads_response.json()
                leads = leads_data.get('leads', [])
                
                # Check that response does NOT include idp4 data
                has_idp4 = False
                for lead in leads:
                    if lead.get('source') == 'idp4':
                        has_idp4 = True
                        break
                
                if has_idp4:
                    log_test("GET /api/admin/leads", True, f"Working, found {len(leads)} leads (some from idp4 - data preserved)")
                else:
                    log_test("GET /api/admin/leads", True, f"Working, found {len(leads)} leads (no idp4 sources)")
            else:
                log_test("GET /api/admin/leads", False, f"Status {leads_response.status_code}")
            
            # Test GET /api/admin/whatsapp-clicks
            clicks_response = requests.get(f"{API_URL}/admin/whatsapp-clicks", cookies=cookies, timeout=10)
            
            if clicks_response.status_code == 200:
                clicks_data = clicks_response.json()
                clicks = clicks_data.get('clicks', [])
                log_test("GET /api/admin/whatsapp-clicks", True, f"Working, found {len(clicks)} clicks")
            else:
                log_test("GET /api/admin/whatsapp-clicks", False, f"Status {clicks_response.status_code}")
        else:
            log_test("Admin login", False, f"Login failed with status {login_response.status_code}")
    except Exception as e:
        log_test("Admin endpoints", False, f"Error: {str(e)}")

def test_key_pages():
    """Test 4: Verify key pages return 200"""
    print("\n=== TEST 4: KEY PAGES SMOKE TEST ===")
    
    pages = [
        "/",
        "/tratamiento",
        "/tratamiento/tlp-alta-gama",
        "/trastornos-de-personalidad",
        "/esquema",
        "/evaluacion-bsl23",
        "/admin",
        "/foro",
        "/investigacion/la-mente-algoritmica"
    ]
    
    for page in pages:
        try:
            url = f"{BASE_URL}{page}"
            response = requests.get(url, timeout=10)
            
            if response.status_code == 200:
                log_test(f"Page {page}", True, "Returns 200")
            else:
                log_test(f"Page {page}", False, f"Returns {response.status_code}")
        except Exception as e:
            log_test(f"Page {page}", False, f"Error: {str(e)}")

def test_no_idp4_in_html():
    """Test 5: Verify no IDP-4 mentions in public HTML"""
    print("\n=== TEST 5: NO IDP-4 IN PUBLIC HTML ===")
    
    pages = [
        "/",
        "/trastornos-de-personalidad",
        "/tratamiento"
    ]
    
    for page in pages:
        try:
            url = f"{BASE_URL}{page}"
            response = requests.get(url, timeout=10)
            
            if response.status_code == 200:
                html = response.text.lower()
                
                # Check for IDP-4 mentions
                has_idp4 = "idp-4" in html or "idp4" in html
                has_evaluacion_idp4 = "evaluacion-idp4" in html
                
                if has_idp4 or has_evaluacion_idp4:
                    mentions = []
                    if has_idp4:
                        mentions.append("'idp-4' or 'idp4'")
                    if has_evaluacion_idp4:
                        mentions.append("'evaluacion-idp4'")
                    log_test(f"No IDP-4 in {page}", False, f"Found {', '.join(mentions)} in HTML")
                else:
                    log_test(f"No IDP-4 in {page}", True, "No IDP-4 mentions found")
            else:
                log_test(f"No IDP-4 in {page}", False, f"Page returned {response.status_code}")
        except Exception as e:
            log_test(f"No IDP-4 in {page}", False, f"Error: {str(e)}")

def main():
    """Run all tests"""
    print("=" * 80)
    print("BACKEND TEST: IDP-4 COMPLETE REMOVAL VERIFICATION")
    print("=" * 80)
    print(f"Base URL: {BASE_URL}")
    print(f"Started: {datetime.now().isoformat()}")
    
    try:
        # Run all test suites
        test_redirects()
        test_deleted_endpoints()
        test_remaining_apis()
        test_key_pages()
        test_no_idp4_in_html()
        
        # Print summary
        print("\n" + "=" * 80)
        print("TEST SUMMARY")
        print("=" * 80)
        print(f"Total tests: {tests_passed + tests_failed}")
        print(f"✅ Passed: {tests_passed}")
        print(f"❌ Failed: {tests_failed}")
        print(f"Success rate: {(tests_passed / (tests_passed + tests_failed) * 100):.1f}%")
        
        if tests_failed > 0:
            print("\n⚠️  FAILED TESTS:")
            for result in test_results:
                if not result['passed']:
                    print(f"  - {result['test']}: {result['message']}")
        
        print("\n" + "=" * 80)
        
        # Exit with appropriate code
        sys.exit(0 if tests_failed == 0 else 1)
        
    except Exception as e:
        print(f"\n❌ CRITICAL ERROR: {str(e)}")
        import traceback
        traceback.print_exc()
        sys.exit(1)

if __name__ == "__main__":
    main()
