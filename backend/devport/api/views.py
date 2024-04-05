from .serializers import *
from users.models import Profile
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def getProfiles(request):
    profiles = Profile.objects.all()
    serializer = ProfileSerializer(profiles, many=True)
    return Response(serializer.data)