from .models import Target
from rest_framework import serializers

class TargetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Target
        fields = '__all__'

class TargetListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Target
        fields = '__all__'
        depth = 1
