from django.contrib import admin
from . import models

# Register your models here.

@admin.register(models.notification)
class NotificationAdmin(admin.ModelAdmin):
    # 어드민 리스트 보여주기
    list_display = (
        'creator',
        'to',
        'notification_type',
    )
