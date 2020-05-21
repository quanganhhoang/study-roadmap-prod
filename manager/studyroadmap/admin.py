from django.contrib import admin

# Register your models here.
from .models import User, Roadmap

admin.site.register(User)
admin.site.register(Roadmap)