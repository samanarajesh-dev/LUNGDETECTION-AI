from django.db import models

class Doctor(models.Model):
    name = models.CharField(max_length=200)
    specialty = models.CharField(max_length=200)
    rating = models.FloatField(default=0.0)
    availability = models.BooleanField(default=True)
    avatar_url = models.URLField(blank=True, null=True)
    video_call_link = models.URLField(blank=True, null=True)

    def __str__(self):
        return f"Dr. {self.name} ({self.specialty})"
