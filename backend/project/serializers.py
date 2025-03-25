from rest_framework import serializers
from django.contrib.auth import get_user_model  # Import get_user_model
from .models import Project

class ProjectSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(
        queryset=get_user_model().objects.all(),  # Use the custom user model
        read_only=False,
        required=False
    )

    class Meta:
        model = Project
        fields = ['id', 'name', 'html_code', 'css_code', 'js_code', 'created_at', 'updated_at', 'user']
        read_only_fields = ['user']  # Ensure the user cannot modify this field via the API