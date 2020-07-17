from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

# Register your models here.
from .models import CustomProfile, Roadmap

admin.site.register(CustomProfile)
admin.site.register(Roadmap)