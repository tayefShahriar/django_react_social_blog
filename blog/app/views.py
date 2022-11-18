from django.shortcuts import render
from .models import Post, Profile
from .serializers import PostSerializer, UserSerializer, ProfileSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework import viewsets, views
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.contrib.auth.models import User
from rest_framework.response import Response
# Create your views here.

class PostView(ModelViewSet):
    queryset = Post.objects.all().order_by("-id")
    serializer_class = PostSerializer

class ProfileView(views.APIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]
    def get(self, request):
        user = request.user
        pquery = Profile.objects.get(user=user)
        serializer = ProfileSerializer(pquery)
        return Response({
            "message": "Request is get",
            "userdata": serializer.data,
        })

class RegisterView(views.APIView):
    def post(self, request):
        serializers = UserSerializer(data=request.data)
        if serializers.is_valid():
            serializers.create(request.data)
            serializers.save()
            return Response({"error": False, "message": "User successful", "data": serializers.data})
        return Response({"error": True, "message": "A user with that username already exists! Try another username"})