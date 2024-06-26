from django.db import models
from django.contrib.auth.models import User

import uuid

# Create your models here.
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=50, null=True, blank=True)
    email = models.EmailField(max_length=200, null=True, blank=True)
    username = models.CharField(max_length=200, null=True, blank=True)
    bio = models.TextField(null=True, blank=True)
    location= models.CharField(max_length=200, null=True, blank=True)
    created = models.DateField(auto_now_add=True)
    facebook_link = models.CharField(max_length=200, null=True, blank=True)
    twitter_link = models.CharField(max_length=200, null=True, blank=True)
    instagram_link = models.CharField(max_length=200, null=True, blank=True)
    github_link = models.CharField(max_length=200, null=True, blank=True)
    id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, editable=False)


    def __str__(self):
        return str(self.username)
    

class Skill(models.Model):
    name = models.CharField(max_length=50, null=True, blank=True)
    id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, editable=False)

    def __str__(self):
        return str(self.name)
