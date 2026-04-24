from django.db import models
from django.conf import settings

class XRayScan(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='scans')
    image_url = models.URLField()
    result_json = models.JSONField(default=dict)
    confidence = models.FloatField(default=0.0)
    risk_level = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Scan {self.id} for {self.user.username}"
