from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse

@login_required
def get_user_profile(request):
    user = request.user  # Get the currently logged-in user
    return JsonResponse({
        "username": user.username,
        "profile_picture": user.profile.profile_picture.url if hasattr(user, "profile") and user.profile.profile_picture else None
    })

@api_view(['POST'])
def signup(request):
    """User Registration API"""
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, email=email, password=password)
    token, created = Token.objects.get_or_create(user=user)

    return Response({'token': token.key, 'message': 'User created successfully'}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def login(request):
    """User Login API"""
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user is None:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

    token, created = Token.objects.get_or_create(user=user)

    return Response({'token': token.key, 'message': 'Login successful'}, status=status.HTTP_200_OK)
