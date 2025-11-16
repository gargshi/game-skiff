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

class Game(models.Model):
	author = models.ForeignKey(User, on_delete=models.CASCADE)
	title = models.CharField(max_length=100)
	description = models.TextField()
	image = models.ImageField(upload_to='game_images/', blank=True, null=True)
	link = models.URLField()
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	def __str__(self):
		return f"{self.title}-{self.author}"