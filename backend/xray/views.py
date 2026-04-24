import os
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from huggingface_hub import InferenceClient
from lungdetect.utils import api_response
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile

class XRayAnalysisView(APIView):
    """
    Connects the frontend image upload to the Hugging Face Inference API
    using the monai-test/lung_nodule_ct_detection model.
    """
    def post(self, request, *args, **kwargs):
        if 'image' not in request.FILES:
            return api_response(success=False, message="No image provided", status=status.HTTP_400_BAD_REQUEST)
        
        image_file = request.FILES['image']
        
        # Use the token from environment
        token = os.getenv("HUGGINGFACE_TOKEN")
        if not token:
            return api_response(success=False, message="HF Token not configured", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        model_id = "monai-test/lung_nodule_ct_detection"
        
        try:
            client = InferenceClient(model=model_id, token=token)
            
            # Convert image to bytes
            image_bytes = image_file.read()
            
            # Call the inference API
            # Note: monai-test/lung_nodule_ct_detection is a detection model
            # We use the raw call or the appropriate task method
            result = client.post(data=image_bytes)
            
            # Parse the response (Hugging Face Inference API usually returns bytes or JSON depending on the task)
            # For detection models, it's often a list of objects or a specific JSON format
            import json
            try:
                decoded_result = json.loads(result.decode('utf-8'))
            except:
                decoded_result = {"raw_output": "The model returned a non-JSON response. This might be a MONAI-specific format."}

            return api_response(success=True, data=decoded_result, message="Analysis complete")
            
        except Exception as e:
            return api_response(success=False, message=str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
