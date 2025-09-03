import os
import requests
import threading

BASE_URL = os.getenv("TEST_BASE_URL", "http://localhost:5000")

def get_auth_headers(valid=True):
    # Dummy implementation; replace with actual logic as needed
    if valid:
        return {"Authorization": "Bearer valid_token"}
    else:
        return {"Authorization": "Bearer invalid_token"}

def test_health():
    url = f"{BASE_URL}/api/health"
    response = requests.get(url)
    assert response.status_code == 200
    data = response.json()
    assert data.get("status") == "healthy"
    assert "timestamp" in data

def test_audit_contract_valid():
    url = f"{BASE_URL}/api/audit"
    payload = {
        "code": "pragma solidity ^0.8.0;\ncontract Test { uint public x; }"
    }
    response = requests.post(url, json=payload, headers=get_auth_headers(valid=True))
    assert response.status_code == 200
    data = response.json()
    assert data.get("success") is True
    assert "report" in data
    assert "security_score" in data["report"]

def test_audit_contract_missing_code():
    url = f"{BASE_URL}/api/audit"
    payload = {}
    response = requests.post(url, json=payload, headers=get_auth_headers(valid=True))
    assert response.status_code == 400
    data = response.json()
    assert "error" in data

def test_audit_contract_invalid_code():
    url = f"{BASE_URL}/api/audit"
    payload = {"code": "invalid solidity code"}
    response = requests.post(url, json=payload, headers=get_auth_headers(valid=True))
    assert response.status_code == 200
    data = response.json()
    assert data.get("success") is True
    assert "report" in data
    assert "security_score" in data["report"]

# --- Authentication tests (example for /api/audit, adapt for other endpoints if needed) ---

def test_audit_requires_auth():
    url = f"{BASE_URL}/api/audit"
    payload = {"code": "pragma solidity ^0.8.0;\ncontract Test { uint public x; }"}
    # No auth header
    response = requests.post(url, json=payload)
    assert response.status_code in (401, 403)

def test_audit_invalid_auth():
    url = f"{BASE_URL}/api/audit"
    payload = {"code": "pragma solidity ^0.8.0;\ncontract Test { uint public x; }"}
    response = requests.post(url, json=payload, headers=get_auth_headers(valid=False))
    assert response.status_code in (401, 403)

def test_audit_valid_auth():
    url = f"{BASE_URL}/api/audit"
    payload = {"code": "pragma solidity ^0.8.0;\ncontract Test { uint public x; }"}
    response = requests.post(url, json=payload, headers=get_auth_headers(valid=True))
    assert response.status_code == 200
    data = response.json()
    assert data.get("success") is True
    assert "report" in data

# --- Concurrency tests ---

def test_audit_concurrent_requests():
    url = f"{BASE_URL}/api/audit"
    payload = {"code": "pragma solidity ^0.8.0;\ncontract Test { uint public x; }"}
    results = []
    def worker():
        r = requests.post(url, json=payload, headers=get_auth_headers(valid=True))
        results.append(r.status_code)
    threads = [threading.Thread(target=worker) for _ in range(10)]
    for t in threads:
        t.start()
    for t in threads:
        t.join()
    assert all(code == 200 for code in results)

def test_generate_concurrent_requests():
    url = f"{BASE_URL}/api/generate"
    payload = {"prompt": "Hello, concurrency!"}
    results = []
    def worker():
        r = requests.post(url, json=payload, headers=get_auth_headers(valid=True))
        results.append(r.status_code)
    threads = [threading.Thread(target=worker) for _ in range(10)]
    for t in threads:
        t.start()
    for t in threads:
        t.join()
    assert all(code == 200 for code in results)