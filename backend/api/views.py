from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.http import JsonResponse
from .models import Post, Pitch, Message, Notification, UserProfile
from .serializers import PostSerializer, PitchSerializer, MessageSerializer, NotificationSerializer, UserProfileSerializer

# 🚀 User Authentication APIs

@api_view(['POST'])
def signup(request):
    """User Registration API"""
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, email=email, password=password)
    Token.objects.create(user=user)
    return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def login_user(request):
    """User Login API"""
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)
    if user is None:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

    token, created = Token.objects.get_or_create(user=user)
    login(request, user)
    return Response({'token': token.key, 'message': 'Login successful'}, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_user(request):
    """User Logout API"""
    request.user.auth_token.delete()
    logout(request)
    return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)

# 🚀 User Profile APIs

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    """Get logged-in user profile"""
    profile, created = UserProfile.objects.get_or_create(user=request.user)
    return Response(UserProfileSerializer(profile).data, status=status.HTTP_200_OK)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_user_profile(request):
    """Update user profile"""
    profile = UserProfile.objects.get(user=request.user)
    serializer = UserProfileSerializer(profile, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# 🚀 Post APIs

@api_view(['GET'])
def get_all_posts(request):
    """Fetch all posts"""
    posts = Post.objects.all().order_by('-created_at')
    return Response(PostSerializer(posts, many=True).data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_post(request):
    """Create a new post"""
    serializer = PostSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def like_post(request, post_id):
    """Like a post"""
    post = Post.objects.get(id=post_id)
    post.likes.add(request.user)
    return Response({'message': 'Post liked'}, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def unlike_post(request, post_id):
    """Unlike a post"""
    post = Post.objects.get(id=post_id)
    post.likes.remove(request.user)
    return Response({'message': 'Post unliked'}, status=status.HTTP_200_OK)

# 🚀 Pitches APIs

@api_view(['GET'])
def get_all_pitches(request):
    """Fetch all text-based pitches"""
    pitches = Pitch.objects.all().order_by('-created_at')
    return Response(PitchSerializer(pitches, many=True).data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_pitch(request):
    """Create a new text-based pitch"""
    serializer = PitchSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# 🚀 Messaging APIs

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_direct_messages(request):
    """Fetch user messages"""
    messages = Message.objects.filter(receiver=request.user).order_by('-timestamp')
    return Response(MessageSerializer(messages, many=True).data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def send_message(request):
    """Send a direct message"""
    serializer = MessageSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(sender=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# 🚀 Notifications APIs

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_notifications(request):
    """Fetch notifications"""
    notifications = Notification.objects.filter(user=request.user).order_by('-timestamp')
    return Response(NotificationSerializer(notifications, many=True).data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def mark_notification_read(request, notif_id):
    """Mark a notification as read"""
    notification = Notification.objects.get(id=notif_id)
    notification.is_read = True
    notification.save()
    return Response({'message': 'Notification marked as read'}, status=status.HTTP_200_OK)

# 🚀 Search APIs

@api_view(['GET'])
def search_users(request):
    """Search users by username"""
    query = request.GET.get('q', '')
    users = User.objects.filter(username__icontains=query)
    return Response(UserProfileSerializer(users, many=True).data)

@api_view(['GET'])
def search_posts(request):
    """Search posts by content"""
    query = request.GET.get('q', '')
    posts = Post.objects.filter(content__icontains=query)
    return Response(PostSerializer(posts, many=True).data)
