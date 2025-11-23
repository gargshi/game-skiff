from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=60, blank=True)
    bio = models.TextField(max_length=500, blank=True)
    location = models.CharField(max_length=30, blank=True)
    birth_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.user.username


# class Game(models.Model):
#     author = models.ForeignKey(User, on_delete=models.CASCADE)
#     title = models.CharField(max_length=100)
#     description = models.TextField()
#     genre = models.ForeignKey('Genre', on_delete=models.SET_NULL, null=True)
#     image = models.ImageField(upload_to='game_images/', blank=True, null=True)
#     link = models.URLField(default='#', blank=True)
#     platforms = models.CharField(max_length=100, null=True)
#     current_status = models.CharField(max_length=100, null=True, default='WIP')
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)

class Game(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)

    title = models.CharField(max_length=100)
    description = models.TextField()
    # 🟦 Change this from ForeignKey → ManyToManyField
    genres = models.ManyToManyField('Genre', related_name='games')
    image = models.ImageField(upload_to='game_images/', blank=True, null=True)
    link = models.URLField(default='#', blank=True)
    # platforms now supports multiple selected values (store as CSV or JSON)
    platforms = models.JSONField(null=True, blank=True)
    current_status = models.CharField(max_length=100, null=True, default='WIP')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    released_at = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"{self.title}-{self.author}"


class Genre(models.Model):
    genre_name = models.CharField(max_length=100)

    def __str__(self):
        return self.genre_name


class Rating(models.Model):
    game = models.ForeignKey(
        Game, on_delete=models.CASCADE, related_name='ratings')  # which game
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # which user
    rating = models.IntegerField(default=0)  # what rating

    def __str__(self):
        return f"{self.game}-{self.user}-{self.rating}"


class Screenshot(models.Model):
    game = models.ForeignKey(Game, related_name="screenshots", on_delete=models.CASCADE)
    image = models.ImageField(upload_to='screenshots/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    is_main = models.BooleanField(default=False)
