from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, max_length=100)
    title = models.CharField(max_length=100)
    text = models.TextField()
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.title

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="profile/", default='profile/default.jpg', null=True, blank=True)