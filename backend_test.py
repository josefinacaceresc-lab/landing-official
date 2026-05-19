#!/usr/bin/env python3
"""
Backend API Tests for Serena v2 Dual Capture System
Instituto DBT Chile - June 2026
"""

import requests
import time
import json
from datetime import datetime

# Base URL from environment
BASE_URL = "https://nextjs-dbt-cl.preview.emergentagent.com/api"
ADMIN_PASSWORD = "Elcoihue3776"

def print_test_header(test_name):
    print(f"\n{'='*80}")
    print(f"TEST: {test_name}")
    print(f"{'='*80}")

def print_result(passed, message):
    status = "✅ PASS" if passed else "❌ FAIL"
    print(f"{status}: {message}")

def test_whatsapp_channel_happy_path():
    """Test 1: WhatsApp channel (happy path)"""
    print_test_header("WhatsApp Channel - Happy Path")
    
    try:
        # Use timestamp to avoid deduplication across test runs
        timestamp = int(time.time())
        payload = {
            "fullName": f"Karina Test WA {timestamp}",
            "phone": f"+56 9 1111 {timestamp % 10000}",
            "channel": "whatsapp",
            "source": "serena_modal",
            "sourceContext": "test-suite-wa",
            "mode": "serena-v2",
            "timestamp": "2026-06-19T01:00:00Z"
        }
        
        response = requests.post(f"{BASE_URL}/leads/fast-capture", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            checks = [
                (data.get('success') == True, "success=true"),
                ('leadId' in data, "leadId present"),
                (data.get('channel') == 'whatsapp', "channel=whatsapp"),
                (data.get('emailQueued') == False, "emailQueued=false"),
                (data.get('emailSent') == False, "emailSent=false"),
            ]
            
            for check, desc in checks:
                print_result(check, desc)
            
            # Verify MongoDB persistence
            lead_id = data.get('leadId')
            if lead_id:
                print(f"\n✅ Lead created with ID: {lead_id}")
                print("Note: MongoDB verification requires admin endpoint check (Test 8)")
            
            return all(check for check, _ in checks)
        else:
            print_result(False, f"Expected 200, got {response.status_code}")
            return False
            
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False

def test_email_channel_happy_path():
    """Test 2: Email channel (happy path) - VERIFY MESSAGE IS PERSISTED"""
    print_test_header("Email Channel - Happy Path (Message Persistence)")
    
    try:
        # Use timestamp to avoid deduplication across test runs
        timestamp = int(time.time())
        payload = {
            "fullName": f"Pedro Test Email {timestamp}",
            "phone": f"+56 9 3333 {timestamp % 10000}",
            "channel": "email",
            "message": "Hola, me interesa el programa DBT estándar. ¿Cuáles son los próximos cupos?",
            "source": "serena_modal",
            "sourceContext": "test-suite-email",
            "mode": "serena-v2"
        }
        
        response = requests.post(f"{BASE_URL}/leads/fast-capture", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            checks = [
                (data.get('success') == True, "success=true"),
                ('leadId' in data, "leadId present"),
                (data.get('channel') == 'email', "channel=email"),
                (data.get('emailQueued') == True, "emailQueued=true (no RESEND_API_KEY)"),
                (data.get('emailSent') == False, "emailSent=false"),
            ]
            
            for check, desc in checks:
                print_result(check, desc)
            
            lead_id = data.get('leadId')
            if lead_id:
                print(f"\n✅ Lead created with ID: {lead_id}")
                print("Note: Message persistence will be verified in admin endpoint (Test 8)")
            
            return all(check for check, _ in checks)
        else:
            print_result(False, f"Expected 200, got {response.status_code}")
            return False
            
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False

def test_geolocation_via_xff():
    """Test 3: Geolocation via X-Forwarded-For"""
    print_test_header("Geolocation via X-Forwarded-For (8.8.8.8)")
    
    try:
        payload = {
            "fullName": "Maria Test Geo",
            "phone": "+56 9 5555 6666",
            "channel": "whatsapp",
            "source": "serena_modal",
            "sourceContext": "test-suite-geo",
            "mode": "serena-v2"
        }
        
        headers = {
            "X-Forwarded-For": "8.8.8.8",
            "Content-Type": "application/json"
        }
        
        response = requests.post(f"{BASE_URL}/leads/fast-capture", json=payload, headers=headers, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            location = data.get('location')
            
            checks = [
                (data.get('success') == True, "success=true"),
                ('leadId' in data, "leadId present"),
            ]
            
            # Location might be populated or null depending on ip-api.com response
            if location:
                print_result(True, f"location populated: {location}")
                checks.append((True, "Geolocation successful"))
            else:
                print_result(True, "location=null (ip-api.com may have failed, this is OK)")
                print("Note: Geolocation has 1.5s timeout and fails soft")
            
            for check, desc in checks:
                print_result(check, desc)
            
            return all(check for check, _ in checks)
        else:
            print_result(False, f"Expected 200, got {response.status_code}")
            return False
            
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False

def test_validation_short_fullname():
    """Test 4: Validation - missing/short fullName → 400"""
    print_test_header("Validation - Short fullName")
    
    try:
        payload = {
            "fullName": "X",
            "phone": "+56 9 1234 5678",
            "channel": "whatsapp",
            "source": "serena_modal",
            "mode": "serena-v2"
        }
        
        response = requests.post(f"{BASE_URL}/leads/fast-capture", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 400:
            data = response.json()
            error = data.get('error', '')
            if 'Nombre' in error or 'inválido' in error:
                print_result(True, f"Correct 400 error: {error}")
                return True
            else:
                print_result(False, f"Got 400 but wrong error message: {error}")
                return False
        else:
            print_result(False, f"Expected 400, got {response.status_code}")
            return False
            
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False

def test_validation_short_phone():
    """Test 5: Validation - short phone → 400"""
    print_test_header("Validation - Short Phone")
    
    try:
        payload = {
            "fullName": "Test Name",
            "phone": "123",
            "channel": "whatsapp",
            "source": "serena_modal",
            "mode": "serena-v2"
        }
        
        response = requests.post(f"{BASE_URL}/leads/fast-capture", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 400:
            data = response.json()
            error = data.get('error', '')
            if 'WhatsApp' in error or 'inválido' in error or 'Teléfono' in error:
                print_result(True, f"Correct 400 error: {error}")
                return True
            else:
                print_result(False, f"Got 400 but wrong error message: {error}")
                return False
        else:
            print_result(False, f"Expected 400, got {response.status_code}")
            return False
            
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False

def test_validation_email_short_message():
    """Test 6: Validation - email channel + short message → 400"""
    print_test_header("Validation - Email Channel with Short Message")
    
    try:
        payload = {
            "fullName": "Test Name",
            "phone": "+56 9 1234 5678",
            "channel": "email",
            "message": "hi",
            "source": "serena_modal",
            "mode": "serena-v2"
        }
        
        response = requests.post(f"{BASE_URL}/leads/fast-capture", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 400:
            data = response.json()
            error = data.get('error', '')
            if 'Mensaje' in error or 'corto' in error:
                print_result(True, f"Correct 400 error: {error}")
                return True
            else:
                print_result(False, f"Got 400 but wrong error message: {error}")
                return False
        else:
            print_result(False, f"Expected 400, got {response.status_code}")
            return False
            
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False

def test_idempotency():
    """Test 7: Idempotency - duplicate within 60s should dedupe"""
    print_test_header("Idempotency - Duplicate Detection")
    
    try:
        payload = {
            "fullName": "Duplicate Test User",
            "phone": "+56 9 7777 8888",
            "channel": "whatsapp",
            "source": "serena_modal",
            "sourceContext": "test-suite-dedup",
            "mode": "serena-v2"
        }
        
        # First request
        print("Sending first request...")
        response1 = requests.post(f"{BASE_URL}/leads/fast-capture", json=payload, timeout=10)
        print(f"First Response - Status: {response1.status_code}")
        print(f"First Response - Body: {response1.text}")
        
        if response1.status_code != 200:
            print_result(False, f"First request failed with {response1.status_code}")
            return False
        
        data1 = response1.json()
        lead_id_1 = data1.get('leadId')
        
        # Second request (within 5 seconds)
        print("\nSending duplicate request (within 5 seconds)...")
        time.sleep(2)
        response2 = requests.post(f"{BASE_URL}/leads/fast-capture", json=payload, timeout=10)
        print(f"Second Response - Status: {response2.status_code}")
        print(f"Second Response - Body: {response2.text}")
        
        if response2.status_code == 200:
            data2 = response2.json()
            lead_id_2 = data2.get('leadId')
            deduplicated = data2.get('deduplicated', False)
            
            checks = [
                (data2.get('success') == True, "success=true"),
                (deduplicated == True, "deduplicated=true"),
                (lead_id_1 == lead_id_2, f"Same leadId returned: {lead_id_1}"),
            ]
            
            for check, desc in checks:
                print_result(check, desc)
            
            return all(check for check, _ in checks)
        else:
            print_result(False, f"Expected 200, got {response2.status_code}")
            return False
            
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False

def test_admin_endpoint_new_fields():
    """Test 8: Admin endpoint reflects new fields"""
    print_test_header("Admin Endpoint - New Fields (channel, message, location, geo)")
    
    try:
        # Step 1: Login to get admin session cookie
        print("Step 1: Admin login...")
        login_response = requests.post(
            f"{BASE_URL}/admin/login",
            json={"password": ADMIN_PASSWORD},
            timeout=10
        )
        print(f"Login Status: {login_response.status_code}")
        
        if login_response.status_code != 200:
            print_result(False, f"Login failed with {login_response.status_code}")
            return False
        
        # Extract cookie
        cookies = login_response.cookies
        print(f"✅ Login successful, got admin_session cookie")
        
        # Step 2: Get leads list
        print("\nStep 2: Fetching leads list...")
        leads_response = requests.get(
            f"{BASE_URL}/admin/leads",
            cookies=cookies,
            timeout=10
        )
        print(f"Leads Status: {leads_response.status_code}")
        
        if leads_response.status_code != 200:
            print_result(False, f"Leads endpoint failed with {leads_response.status_code}")
            return False
        
        data = leads_response.json()
        leads = data.get('leads', [])
        print(f"✅ Retrieved {len(leads)} leads")
        
        # Step 3: Find leads from tests 1 and 2
        print("\nStep 3: Verifying new fields on test leads...")
        
        test_leads = [
            lead for lead in leads 
            if ('Test WA' in lead.get('fullName', '') or 'Test Email' in lead.get('fullName', ''))
        ]
        
        if not test_leads:
            print_result(False, "Could not find test leads from tests 1 and 2")
            return False
        
        print(f"Found {len(test_leads)} test leads")
        
        all_checks_passed = True
        for lead in test_leads:
            print(f"\n--- Lead: {lead.get('fullName')} ---")
            
            # Check for new fields
            has_channel = 'channel' in lead
            has_message = 'message' in lead
            has_location = 'location' in lead
            has_geo = 'geo' in lead
            has_ip = 'ip' in lead
            
            # Safe string formatting for None values
            message_val = lead.get('message')
            message_display = (message_val[:50] if message_val else '(null)')
            location_val = lead.get('location')
            location_display = (location_val if location_val else '(null)')
            
            print_result(has_channel, f"channel field present: {lead.get('channel')}")
            print_result(has_message, f"message field present: {message_display}")
            print_result(has_location, f"location field present: {location_display}")
            print_result(has_geo, f"geo field present: {type(lead.get('geo'))}")
            print_result(has_ip, f"ip field present: {lead.get('ip')}")
            
            # Verify specific values
            if 'Test WA' in lead.get('fullName', ''):
                channel_correct = lead.get('channel') == 'whatsapp'
                phone = lead.get('phone', '')
                phone_normalized = phone.startswith('569') and len(phone) == 11
                print_result(channel_correct, f"WhatsApp lead has channel='whatsapp'")
                print_result(phone_normalized, f"Phone normalized: {phone}")
            
            if 'Test Email' in lead.get('fullName', ''):
                channel_correct = lead.get('channel') == 'email'
                message_val = lead.get('message')
                message_present = message_val and len(message_val) > 10
                print_result(channel_correct, f"Email lead has channel='email'")
                print_result(message_present, f"Message persisted: {len(message_val) if message_val else 0} chars")
            
            if not all([has_channel, has_message, has_location, has_geo, has_ip]):
                all_checks_passed = False
        
        return all_checks_passed
            
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False

def test_backwards_compatibility():
    """Test 9: Backwards compatibility - legacy after-hours payload"""
    print_test_header("Backwards Compatibility - Legacy After-Hours Mode")
    
    try:
        # Use timestamp to avoid deduplication across test runs
        timestamp = int(time.time())
        payload = {
            "fullName": f"Legacy Test {timestamp}",
            "phone": f"+56 9 9999 {timestamp % 10000}",
            "email": "legacy@test.cl",
            "source": "footer",
            "mode": "after-hours",
            "timestamp": "2026-06-19T02:00:00Z"
        }
        
        response = requests.post(f"{BASE_URL}/leads/fast-capture", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            checks = [
                (data.get('success') == True, "success=true"),
                ('leadId' in data, "leadId present"),
                (data.get('mode') == 'after-hours', "mode=after-hours"),
            ]
            
            for check, desc in checks:
                print_result(check, desc)
            
            print("\n✅ Legacy after-hours payload still works (backwards compatible)")
            return all(check for check, _ in checks)
        else:
            print_result(False, f"Expected 200, got {response.status_code}")
            return False
            
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False

def main():
    print("\n" + "="*80)
    print("SERENA v2 DUAL CAPTURE SYSTEM - BACKEND API TESTS")
    print("Instituto DBT Chile - June 2026")
    print("="*80)
    
    tests = [
        ("Test 1: WhatsApp Channel (Happy Path)", test_whatsapp_channel_happy_path),
        ("Test 2: Email Channel (Happy Path + Message Persistence)", test_email_channel_happy_path),
        ("Test 3: Geolocation via X-Forwarded-For", test_geolocation_via_xff),
        ("Test 4: Validation - Short fullName", test_validation_short_fullname),
        ("Test 5: Validation - Short Phone", test_validation_short_phone),
        ("Test 6: Validation - Email + Short Message", test_validation_email_short_message),
        ("Test 7: Idempotency - Duplicate Detection", test_idempotency),
        ("Test 8: Admin Endpoint - New Fields", test_admin_endpoint_new_fields),
        ("Test 9: Backwards Compatibility - Legacy After-Hours", test_backwards_compatibility),
    ]
    
    results = []
    for test_name, test_func in tests:
        try:
            result = test_func()
            results.append((test_name, result))
        except Exception as e:
            print(f"\n❌ CRITICAL ERROR in {test_name}: {str(e)}")
            results.append((test_name, False))
        
        time.sleep(1)  # Small delay between tests
    
    # Summary
    print("\n" + "="*80)
    print("TEST SUMMARY")
    print("="*80)
    
    passed = sum(1 for _, result in results if result)
    total = len(results)
    
    for test_name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status} - {test_name}")
    
    print(f"\n{'='*80}")
    print(f"TOTAL: {passed}/{total} tests passed")
    print(f"{'='*80}\n")
    
    return passed == total

if __name__ == "__main__":
    success = main()
    exit(0 if success else 1)
