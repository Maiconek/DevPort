from django.urls import path
from api.views import *

urlpatterns = [
    path('profiles', getProfiles),
    path('projects', getProjects),
    path('tags', getTags)
]