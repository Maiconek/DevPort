from .models import Profile
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.core.mail import send_mail
from django.conf import settings

from django.contrib.auth.models import User

def createProfile(sender, instance, created, **kwargs):
    if created:
        user = instance
        profile = Profile.objects.create(
            user = user,
            name = user.first_name + " " + user.last_name,
            username = user.username,
            email = user.email
        )
        print(f"Profile of {user.username} was created")



post_save.connect(createProfile, sender=User)
