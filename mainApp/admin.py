from django.contrib import admin

# Register your models here.
from .models import Profile, Game, Genre, Rating

admin.site.register(Profile)
admin.site.register(Game)
admin.site.register(Genre)
admin.site.register(Rating)

