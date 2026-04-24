from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import get_user_model
import requests

from .serializers import UserSerializer, RegisterSerializer
from lungdetect.utils import api_response

User = get_user_model()

class CustomTokenObtainPairView(TokenObtainPairView):
    """
    Wraps the default SimpleJWT login sequence with our unified API response formatting.
    """
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            # Get the generated tokens
            tokens = serializer.validated_data
            # We can also fetch the user to return user data
            user = User.objects.get(username=request.data.get('username'))
            user_data = UserSerializer(user).data
            
            data = {
                "tokens": tokens,
                "user": user_data
            }
            return api_response(success=True, data=data, message="Login successful", status=status.HTTP_200_OK)
        return api_response(success=False, errors=serializer.errors, message="Invalid credentials", status=status.HTTP_401_UNAUTHORIZED)

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        # We assume email acts as username if provided only email from frontend
        data = request.data.copy()
        if 'email' in data and 'username' not in data:
            data['username'] = data['email']
            
        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            user = serializer.save()
            return api_response(success=True, data=UserSerializer(user).data, message="User registered successfully", status=status.HTTP_201_CREATED)
        return api_response(success=False, errors=serializer.errors, message="Validation failed", status=status.HTTP_400_BAD_REQUEST)

from rest_framework_simplejwt.tokens import RefreshToken

class GoogleLoginView(generics.GenericAPIView):
    permission_classes = (AllowAny,)
    
    def post(self, request, *args, **kwargs):
        token = request.data.get('token')
        if not token:
            return api_response(success=False, message="No Google token provided", status=status.HTTP_400_BAD_REQUEST)
        
        # In a real environment with GOOGLE_CLIENT_ID, we use the token to fetch user info from Google
        if token.startswith("mock_google_token_"):
            email = f"google_{token[-5:]}@gmail.com"
            first_name = "Simulated"
            last_name = "Google"
        else:
            try:
                # Verifying access_token from useGoogleLogin (implicit flow usually returns access token)
                google_response = requests.get(
                    "https://www.googleapis.com/oauth2/v3/userinfo",
                    headers={"Authorization": f"Bearer {token}"}
                )
                if not google_response.ok:
                    return api_response(success=False, message="Invalid Google token", status=status.HTTP_400_BAD_REQUEST)
                
                user_info = google_response.json()
                email = user_info.get("email")
                first_name = user_info.get("given_name", "")
                last_name = user_info.get("family_name", "")

                if not email:
                    return api_response(success=False, message="Google token did not contain an email", status=status.HTTP_400_BAD_REQUEST)
            except Exception as e:
                return api_response(success=False, message=str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        user, created = User.objects.get_or_create(email=email, defaults={
            'username': email,
            'first_name': first_name,
            'last_name': last_name
        })

        refresh = RefreshToken.for_user(user)
        tokens = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }
        return api_response(success=True, data={"tokens": tokens, "user": UserSerializer(user).data}, message="Google Login successful")

class ProfileView(generics.RetrieveUpdateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return api_response(success=True, data=serializer.data, message="Profile retrieved")

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return api_response(success=True, data=serializer.data, message="Profile updated")
        return api_response(success=False, errors=serializer.errors, message="Validation failed", status=status.HTTP_400_BAD_REQUEST)
