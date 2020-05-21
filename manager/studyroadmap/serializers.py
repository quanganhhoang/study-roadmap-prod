from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = '__all__'

class RoadmapSerializer(serializers.ModelSerializer):
  class Meta:
    model = Roadmap
    fields = '__all__'