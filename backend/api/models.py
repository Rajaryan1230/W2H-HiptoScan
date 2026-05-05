import secrets

from django.conf import settings
from django.db import models


class AuthToken(models.Model):
    key = models.CharField(max_length=64, unique=True, db_index=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="auth_tokens")
    created_at = models.DateTimeField(auto_now_add=True)

    @classmethod
    def create_for_user(cls, user):
        return cls.objects.create(user=user, key=secrets.token_hex(32))

    def __str__(self):
        return f"Token for {self.user_id}"


class AnalysisRecord(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="analyses")
    test_type = models.CharField(max_length=120)
    patient_age = models.CharField(max_length=20, blank=True)
    patient_sex = models.CharField(max_length=40, blank=True)
    symptoms = models.TextField(blank=True)
    alcohol_use = models.CharField(max_length=40, blank=True)
    report = models.JSONField(default=dict)
    advice = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
