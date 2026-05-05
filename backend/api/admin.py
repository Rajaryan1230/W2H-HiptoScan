from django.contrib import admin

from .models import AnalysisRecord, AuthToken


@admin.register(AuthToken)
class AuthTokenAdmin(admin.ModelAdmin):
    list_display = ("user", "created_at")
    search_fields = ("user__username", "user__email")


@admin.register(AnalysisRecord)
class AnalysisRecordAdmin(admin.ModelAdmin):
    list_display = ("user", "test_type", "patient_age", "created_at")
    search_fields = ("user__username", "test_type", "symptoms")
    readonly_fields = ("created_at",)
