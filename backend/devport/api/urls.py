from django.urls import path
from api.views import *
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    #auth
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    

    #entities
    path('profiles', getProfiles),
    path('projects', getProjects),
    path('tags', getTags)
]