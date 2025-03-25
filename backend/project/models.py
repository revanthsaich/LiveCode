from django.conf import settings
from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Project(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="projects",
        default=1  # Assign the user with id=1 as the default
    )
    name = models.CharField(max_length=255)
    html_code = models.TextField(blank=True, null=True)
    css_code = models.TextField(blank=True, null=True)
    js_code = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} by {self.user.username}"