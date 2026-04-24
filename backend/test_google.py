import urllib.request
import json

url = 'http://127.0.0.1:8000/api/accounts/google/'
data = json.dumps({"token": "mock_google_token_123"}).encode('utf-8')
req = urllib.request.Request(url, data=data, headers={'Content-Type': 'application/json'})

try:
    response = urllib.request.urlopen(req)
    print(response.read().decode())
except Exception as e:
    print("ERROR:", e)
    if hasattr(e, 'read'):
        print(e.read().decode())
