#!/usr/bin/env python3
"""
Ghost-Lead Defense Patch - Backend API Tests
Instituto DBT Chile - June 2026

Tests the new anti-fake-leads defenses:
- intent field persistence
- 24-hour repeat-lead detection
- fake phone rejection
- international phone normalization
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

def get_admin_session():
    """Login and return cookies for admin endpoints"""
    try:
        response = requests.post(
            f"{BASE_URL}/admin/login",
            json={"password": ADMIN_PASSWORD},
            timeout=10
        )
        if response.status_code == 200:
            return response.cookies
        return None
    except Exception as e:
        print(f"Admin login failed: {e}")
        return None

def test_1_intent_field_persistence():
    """Test 1: New `intent` field persistence"""
    print_test_header("Test 1: Intent Field Persistence")
    
    try:
        payload = {
            "fullName": "Test Ghost A",
            "phone": "+56 9 8765 4321",
            "channel": "whatsapp",
            "intent": "Consulta por mi hija adolescente con desregulación",
            "source": "karina_modal",
            "sourceContext": "test-ghost-fix",
            "mode": "karina-capture",
            "timestamp": "2026-06-19T01:00:00Z"
        }
        
        print("Sending POST /api/leads/fast-capture with intent field...")
        response = requests.post(f"{BASE_URL}/leads/fast-capture", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code != 200:
            print_result(False, f"Expected 200, got {response.status_code}")
            return False
        
        data = response.json()
        checks = [
            (data.get('success') == True, "success=true"),
            (data.get('isRepeat') == False, "isRepeat=false (first submission)"),
            (data.get('suppressConversion') == False, "suppressConversion=false"),
        ]
        
        for check, desc in checks:
            print_result(check, desc)
        
        lead_id = data.get('leadId')
        print(f"\n✅ Lead created with ID: {lead_id}")
        
        # Now verify via admin endpoint that intent was stored
        print("\nVerifying intent field in database via GET /api/admin/leads...")
        cookies = get_admin_session()
        if not cookies:
            print_result(False, "Could not get admin session")
            return False
        
        leads_response = requests.get(f"{BASE_URL}/admin/leads", cookies=cookies, timeout=10)
        if leads_response.status_code != 200:
            print_result(False, f"Admin leads endpoint failed: {leads_response.status_code}")
            return False
        
        leads_data = leads_response.json()
        leads = leads_data.get('leads', [])
        
        # Find our lead
        our_lead = None
        for lead in leads:
            if lead.get('id') == lead_id or lead.get('fullName') == 'Test Ghost A':
                our_lead = lead
                break
        
        if not our_lead:
            print_result(False, f"Could not find lead with ID {lead_id} in admin endpoint")
            return False
        
        intent_value = our_lead.get('intent')
        intent_check = intent_value == "Consulta por mi hija adolescente con desregulación"
        print_result(intent_check, f"intent field stored correctly: {intent_value}")
        
        return all(check for check, _ in checks) and intent_check
        
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False

def test_2_24hour_repeat_detection():
    """Test 2: 24-hour repeat-lead detection"""
    print_test_header("Test 2: 24-Hour Repeat-Lead Detection")
    
    try:
        # A) First submission
        print("A) Sending FIRST lead with phone +56 9 1122 3344...")
        payload_a = {
            "fullName": "Repeat Tester One",
            "phone": "+56 9 1122 3344",
            "channel": "whatsapp",
            "source": "karina_modal",
            "mode": "karina-capture",
            "timestamp": "2026-06-19T01:00:00Z"
        }
        
        response_a = requests.post(f"{BASE_URL}/leads/fast-capture", json=payload_a, timeout=10)
        print(f"First Response - Status: {response_a.status_code}")
        print(f"First Response - Body: {response_a.text}")
        
        if response_a.status_code != 200:
            print_result(False, f"First request failed with {response_a.status_code}")
            return False
        
        data_a = response_a.json()
        lead_id_a = data_a.get('leadId')
        print(f"✅ First lead created with ID: {lead_id_a}")
        
        # Wait 70 seconds to bypass the 60s short dedup window
        print("\nWaiting 70 seconds to bypass 60s dedup window...")
        for i in range(70, 0, -10):
            print(f"  {i} seconds remaining...")
            time.sleep(10)
        
        # B) Second submission with SAME phone but DIFFERENT name
        print("\nB) Sending SECOND lead with SAME phone +56 9 1122 3344 but different name...")
        payload_b = {
            "fullName": "Repeat Tester Two",
            "phone": "+56 9 1122 3344",
            "channel": "whatsapp",
            "source": "karina_modal",
            "mode": "karina-capture",
            "timestamp": "2026-06-19T01:01:30Z"
        }
        
        response_b = requests.post(f"{BASE_URL}/leads/fast-capture", json=payload_b, timeout=10)
        print(f"Second Response - Status: {response_b.status_code}")
        print(f"Second Response - Body: {response_b.text}")
        
        if response_b.status_code != 200:
            print_result(False, f"Second request failed with {response_b.status_code}")
            return False
        
        data_b = response_b.json()
        
        # Verify response B has the expected flags
        checks = [
            (data_b.get('success') == True, "success=true"),
            (data_b.get('isRepeat') == True, "isRepeat=true (24h repeat detected)"),
            (data_b.get('suppressConversion') == True, "suppressConversion=true"),
            (data_b.get('originalLeadId') == lead_id_a, f"originalLeadId matches first lead: {lead_id_a}"),
        ]
        
        for check, desc in checks:
            print_result(check, desc)
        
        # Verify database has TWO documents with this phone
        print("\nVerifying database has TWO leads with phone 56911223344...")
        cookies = get_admin_session()
        if not cookies:
            print_result(False, "Could not get admin session")
            return False
        
        leads_response = requests.get(f"{BASE_URL}/admin/leads", cookies=cookies, timeout=10)
        if leads_response.status_code != 200:
            print_result(False, f"Admin leads endpoint failed: {leads_response.status_code}")
            return False
        
        leads_data = leads_response.json()
        leads = leads_data.get('leads', [])
        
        # Find leads with this phone
        matching_leads = [
            lead for lead in leads 
            if lead.get('phone') == '56911223344'
        ]
        
        print(f"Found {len(matching_leads)} leads with phone 56911223344")
        
        if len(matching_leads) < 2:
            print_result(False, f"Expected at least 2 leads with this phone, found {len(matching_leads)}")
            return False
        
        # Find the second lead and verify it has isRepeat=true and originalLeadId
        second_lead = None
        for lead in matching_leads:
            if lead.get('fullName') == 'Repeat Tester Two':
                second_lead = lead
                break
        
        if not second_lead:
            print_result(False, "Could not find second lead in database")
            return False
        
        is_repeat_in_db = second_lead.get('isRepeat') == True
        original_id_in_db = second_lead.get('originalLeadId') == lead_id_a
        
        print_result(is_repeat_in_db, f"Second lead has isRepeat=true in DB")
        print_result(original_id_in_db, f"Second lead has originalLeadId={lead_id_a} in DB")
        
        return all(check for check, _ in checks) and is_repeat_in_db and original_id_in_db
        
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False

def test_3_fake_phone_rejection():
    """Test 3: Fake-phone rejection (must 400 "WhatsApp inválido")"""
    print_test_header("Test 3: Fake-Phone Rejection")
    
    fake_phones = [
        ("+56 9 0000 0000", "all zeros"),
        ("+1 111 111 1111", "all ones"),
        ("1234567890", "ascending sequence"),
    ]
    
    all_passed = True
    
    for phone, description in fake_phones:
        print(f"\n--- Testing {description}: {phone} ---")
        
        try:
            payload = {
                "fullName": "Fake Test",
                "phone": phone,
                "channel": "whatsapp",
                "source": "karina_modal",
                "mode": "karina-capture"
            }
            
            response = requests.post(f"{BASE_URL}/leads/fast-capture", json=payload, timeout=10)
            print(f"Status Code: {response.status_code}")
            print(f"Response: {response.text}")
            
            if response.status_code == 400:
                data = response.json()
                error = data.get('error', '')
                if 'WhatsApp' in error and 'inválido' in error:
                    print_result(True, f"Correctly rejected with 400: {error}")
                else:
                    print_result(False, f"Got 400 but wrong error message: {error}")
                    all_passed = False
            else:
                print_result(False, f"Expected 400, got {response.status_code}")
                all_passed = False
                
        except Exception as e:
            print_result(False, f"Exception: {str(e)}")
            all_passed = False
    
    return all_passed

def test_4_usa_phone_normalization():
    """Test 4: International (USA) phone normalization"""
    print_test_header("Test 4: USA Phone Normalization")
    
    test_cases = [
        ("+1 305 555 1212", "13055551212", "USA with country code"),
        ("305 555 1212", "13055551212", "USA without country code"),
    ]
    
    all_passed = True
    
    for phone_input, expected_normalized, description in test_cases:
        print(f"\n--- Testing {description}: {phone_input} ---")
        
        try:
            timestamp = int(time.time())
            payload = {
                "fullName": f"Miami Consultante {timestamp}",
                "phone": phone_input,
                "channel": "whatsapp",
                "source": "karina_modal",
                "mode": "karina-capture"
            }
            
            response = requests.post(f"{BASE_URL}/leads/fast-capture", json=payload, timeout=10)
            print(f"Status Code: {response.status_code}")
            print(f"Response: {response.text}")
            
            if response.status_code != 200:
                print_result(False, f"Expected 200, got {response.status_code}")
                all_passed = False
                continue
            
            data = response.json()
            if not data.get('success'):
                print_result(False, "success=false")
                all_passed = False
                continue
            
            lead_id = data.get('leadId')
            print(f"✅ Lead created with ID: {lead_id}")
            
            # Verify normalization via admin endpoint
            print(f"Verifying phone normalized to {expected_normalized}...")
            cookies = get_admin_session()
            if not cookies:
                print_result(False, "Could not get admin session")
                all_passed = False
                continue
            
            leads_response = requests.get(f"{BASE_URL}/admin/leads", cookies=cookies, timeout=10)
            if leads_response.status_code != 200:
                print_result(False, f"Admin leads endpoint failed: {leads_response.status_code}")
                all_passed = False
                continue
            
            leads_data = leads_response.json()
            leads = leads_data.get('leads', [])
            
            # Find our lead
            our_lead = None
            for lead in leads:
                if lead.get('id') == lead_id:
                    our_lead = lead
                    break
            
            if not our_lead:
                print_result(False, f"Could not find lead with ID {lead_id}")
                all_passed = False
                continue
            
            stored_phone = our_lead.get('phone')
            phone_correct = stored_phone == expected_normalized
            print_result(phone_correct, f"Phone normalized correctly: {stored_phone} (expected {expected_normalized})")
            
            if not phone_correct:
                all_passed = False
                
        except Exception as e:
            print_result(False, f"Exception: {str(e)}")
            all_passed = False
    
    return all_passed

def test_5_chilean_phone_regression():
    """Test 5: Regression — Chilean phone still works"""
    print_test_header("Test 5: Chilean Phone Regression")
    
    try:
        timestamp = int(time.time())
        payload = {
            "fullName": f"Chilean Test {timestamp}",
            "phone": "+56 9 8765 4321",
            "channel": "whatsapp",
            "source": "karina_modal",
            "mode": "karina-capture"
        }
        
        response = requests.post(f"{BASE_URL}/leads/fast-capture", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code != 200:
            print_result(False, f"Expected 200, got {response.status_code}")
            return False
        
        data = response.json()
        if not data.get('success'):
            print_result(False, "success=false")
            return False
        
        lead_id = data.get('leadId')
        print(f"✅ Lead created with ID: {lead_id}")
        
        # Verify phone normalized to 56987654321
        print("Verifying phone normalized to 56987654321...")
        cookies = get_admin_session()
        if not cookies:
            print_result(False, "Could not get admin session")
            return False
        
        leads_response = requests.get(f"{BASE_URL}/admin/leads", cookies=cookies, timeout=10)
        if leads_response.status_code != 200:
            print_result(False, f"Admin leads endpoint failed: {leads_response.status_code}")
            return False
        
        leads_data = leads_response.json()
        leads = leads_data.get('leads', [])
        
        our_lead = None
        for lead in leads:
            if lead.get('id') == lead_id:
                our_lead = lead
                break
        
        if not our_lead:
            print_result(False, f"Could not find lead with ID {lead_id}")
            return False
        
        stored_phone = our_lead.get('phone')
        phone_correct = stored_phone == '56987654321'
        print_result(phone_correct, f"Phone normalized correctly: {stored_phone} (expected 56987654321)")
        
        return phone_correct
        
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False

def test_6_short_message_validation():
    """Test 6: Regression — short message validation"""
    print_test_header("Test 6: Short Message Validation (Regression)")
    
    try:
        payload = {
            "fullName": "Test Name",
            "phone": "+56 9 1234 5678",
            "channel": "email",
            "message": "hi",
            "source": "karina_modal",
            "mode": "karina-capture"
        }
        
        response = requests.post(f"{BASE_URL}/leads/fast-capture", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 400:
            data = response.json()
            error = data.get('error', '')
            if 'Mensaje' in error and 'corto' in error:
                print_result(True, f"Correctly rejected with 400: {error}")
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

def test_7_short_name_validation():
    """Test 7: Regression — short name still rejected"""
    print_test_header("Test 7: Short Name Validation (Regression)")
    
    try:
        payload = {
            "fullName": "X",
            "phone": "+56 9 1234 5678",
            "channel": "whatsapp",
            "source": "karina_modal",
            "mode": "karina-capture"
        }
        
        response = requests.post(f"{BASE_URL}/leads/fast-capture", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 400:
            data = response.json()
            error = data.get('error', '')
            if 'Nombre' in error and 'inválido' in error:
                print_result(True, f"Correctly rejected with 400: {error}")
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

def test_8_short_phone_validation():
    """Test 8: Regression — short phone still rejected"""
    print_test_header("Test 8: Short Phone Validation (Regression)")
    
    try:
        payload = {
            "fullName": "Test Name",
            "phone": "123",
            "channel": "whatsapp",
            "source": "karina_modal",
            "mode": "karina-capture"
        }
        
        response = requests.post(f"{BASE_URL}/leads/fast-capture", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 400:
            data = response.json()
            error = data.get('error', '')
            if 'WhatsApp' in error and 'inválido' in error:
                print_result(True, f"Correctly rejected with 400: {error}")
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

def test_9_60s_idempotency():
    """Test 9: Idempotency layer 1 (60-second window) still works"""
    print_test_header("Test 9: 60-Second Idempotency Window (Regression)")
    
    try:
        timestamp = int(time.time())
        payload = {
            "fullName": f"Dedup Test {timestamp}",
            "phone": f"+56 9 5555 {timestamp % 10000}",
            "channel": "whatsapp",
            "source": "karina_modal",
            "mode": "karina-capture"
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
        print(f"✅ First lead created with ID: {lead_id_1}")
        
        # Second request within 60 seconds
        print("\nSending duplicate request (within 5 seconds)...")
        time.sleep(2)
        response2 = requests.post(f"{BASE_URL}/leads/fast-capture", json=payload, timeout=10)
        print(f"Second Response - Status: {response2.status_code}")
        print(f"Second Response - Body: {response2.text}")
        
        if response2.status_code != 200:
            print_result(False, f"Second request failed with {response2.status_code}")
            return False
        
        data2 = response2.json()
        
        checks = [
            (data2.get('success') == True, "success=true"),
            (data2.get('deduplicated') == True, "deduplicated=true"),
            (data2.get('suppressConversion') == True, "suppressConversion=true"),
        ]
        
        for check, desc in checks:
            print_result(check, desc)
        
        # Verify only ONE document was inserted
        print("\nVerifying only ONE document in database...")
        cookies = get_admin_session()
        if not cookies:
            print_result(False, "Could not get admin session")
            return False
        
        leads_response = requests.get(f"{BASE_URL}/admin/leads", cookies=cookies, timeout=10)
        if leads_response.status_code != 200:
            print_result(False, f"Admin leads endpoint failed: {leads_response.status_code}")
            return False
        
        leads_data = leads_response.json()
        leads = leads_data.get('leads', [])
        
        matching_leads = [
            lead for lead in leads 
            if lead.get('fullName') == f"Dedup Test {timestamp}"
        ]
        
        only_one = len(matching_leads) == 1
        print_result(only_one, f"Only ONE document inserted (found {len(matching_leads)})")
        
        return all(check for check, _ in checks) and only_one
        
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False

def test_10_admin_new_fields():
    """Test 10: Admin endpoint exposes new fields"""
    print_test_header("Test 10: Admin Endpoint Exposes New Fields")
    
    try:
        print("Fetching leads from admin endpoint...")
        cookies = get_admin_session()
        if not cookies:
            print_result(False, "Could not get admin session")
            return False
        
        leads_response = requests.get(f"{BASE_URL}/admin/leads", cookies=cookies, timeout=10)
        if leads_response.status_code != 200:
            print_result(False, f"Admin leads endpoint failed: {leads_response.status_code}")
            return False
        
        leads_data = leads_response.json()
        leads = leads_data.get('leads', [])
        print(f"✅ Retrieved {len(leads)} leads")
        
        # Find leads from our tests
        test_leads = [
            lead for lead in leads 
            if ('Test Ghost' in lead.get('fullName', '') or 
                'Repeat Tester' in lead.get('fullName', '') or
                'Miami Consultante' in lead.get('fullName', ''))
        ]
        
        if not test_leads:
            print_result(False, "Could not find any test leads")
            return False
        
        print(f"Found {len(test_leads)} test leads")
        
        # Check that new fields are present
        required_fields = ['intent', 'isRepeat', 'originalLeadId']
        existing_fields = ['id', 'fullName', 'phone', 'channel', 'message', 'ip', 'geo', 'location']
        
        all_checks_passed = True
        
        for lead in test_leads[:3]:  # Check first 3 test leads
            print(f"\n--- Lead: {lead.get('fullName')} ---")
            
            # Check new fields exist
            for field in required_fields:
                has_field = field in lead
                print_result(has_field, f"{field} field present: {lead.get(field)}")
                if not has_field:
                    all_checks_passed = False
            
            # Check existing fields still present
            for field in existing_fields:
                has_field = field in lead
                if not has_field:
                    print_result(False, f"REGRESSION: {field} field missing")
                    all_checks_passed = False
        
        return all_checks_passed
        
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False

def main():
    print("\n" + "="*80)
    print("GHOST-LEAD DEFENSE PATCH - BACKEND API TESTS")
    print("Instituto DBT Chile - June 2026")
    print("="*80)
    
    tests = [
        ("Test 1: Intent Field Persistence", test_1_intent_field_persistence),
        ("Test 2: 24-Hour Repeat-Lead Detection", test_2_24hour_repeat_detection),
        ("Test 3: Fake-Phone Rejection", test_3_fake_phone_rejection),
        ("Test 4: USA Phone Normalization", test_4_usa_phone_normalization),
        ("Test 5: Chilean Phone Regression", test_5_chilean_phone_regression),
        ("Test 6: Short Message Validation (Regression)", test_6_short_message_validation),
        ("Test 7: Short Name Validation (Regression)", test_7_short_name_validation),
        ("Test 8: Short Phone Validation (Regression)", test_8_short_phone_validation),
        ("Test 9: 60-Second Idempotency (Regression)", test_9_60s_idempotency),
        ("Test 10: Admin Endpoint New Fields", test_10_admin_new_fields),
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
