from django.db import models
from django.conf import settings

class Medication(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='medications')
    name = models.CharField(max_length=200)
    dosage = models.CharField(max_length=100)
    frequency = models.CharField(max_length=100)
    times = models.JSONField(default=list)  # ["08:00", "20:00"]
    start_date = models.DateField()
    active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.name} for {self.user.username}"
