from django.urls import path
from . import views

urlpatterns = [
    path('analyze/', views.XRayAnalysisView.as_view(), name='xray-analyze'),
]
