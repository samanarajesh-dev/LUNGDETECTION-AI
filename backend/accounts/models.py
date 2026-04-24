from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    # AbstractUser provides username, first_name, last_name, email, password
    profile_pic = models.URLField(blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)
    medical_history = models.JSONField(default=dict, blank=True)

    def __str__(self):
        return f"{self.username} ({self.email})"
