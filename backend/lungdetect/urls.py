from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

def api_root(request):
    return JsonResponse({
        "success": True,
        "message": "Welcome to the LungDetect AI API Backend.",
        "status": "Online"
    })


urlpatterns = [
    path('', api_root),
    path('admin/', admin.site.urls),
    path('api/accounts/', include('accounts.urls')),
    path('api/xray/', include('xray.urls')),
    path('api/cough/', include('cough.urls')),
    path('api/symptoms/', include('symptoms.urls')),
    path('api/medications/', include('medications.urls')),
    path('api/chat/', include('chat.urls')),
    path('api/analytics/', include('analytics.urls')),
    path('api/telemedicine/', include('telemedicine.urls')),
]
