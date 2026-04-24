from django.db import models
from django.conf import settings

class CoughRecord(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='cough_logs')
    audio_url = models.URLField(blank=True, null=True)
    cough_type = models.CharField(max_length=100)
    severity = models.CharField(max_length=50)
    ai_recommendation = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Cough log {self.id} for {self.user.username}"
