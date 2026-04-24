from rest_framework.response import Response

def api_response(success=True, data=None, message="", errors=None, status=200):
    """
    Standardizes the API response format globally.
    {
      "success": true/false,
      "data": {...},
      "message": "...",
      "errors": null
    }
    """
    return Response({
        "success": success,
        "data": data,
        "message": message,
        "errors": errors
    }, status=status)
