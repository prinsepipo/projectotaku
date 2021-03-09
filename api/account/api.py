from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import UserSerializer, RegisterSerializer


class RegisterAPI(APIView):

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        response_data = {
            'user': UserSerializer(user).data,
        }
        return Response(response_data, status=status.HTTP_201_CREATED)
