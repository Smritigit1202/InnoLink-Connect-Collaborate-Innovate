from django.urls import path
from .views import *

urlpatterns = [
    # Auth APIs
    path('auth/signup/', signup),
    path('auth/login/', login_user),
    path('auth/logout/', logout_user),

    # Profile APIs
    path('user_profile/', get_user_profile),
    path('user_profile/update/', update_user_profile),

    # Post APIs
    path('posts/', get_all_posts),
    path('posts/create/', create_post),
    path('posts/<int:post_id>/like/', like_post),
    path('posts/<int:post_id>/unlike/', unlike_post),

    # Pitch APIs
    path('pitches/', get_all_pitches),
    path('pitches/create/', create_pitch),

    # Messaging APIs
    path('messages/', get_direct_messages),
    path('messages/send/', send_message),

    # Notifications
    path('notifications/', get_notifications),
    path('notifications/<int:notif_id>/read/', mark_notification_read),

    # Search
    path('search/users/', search_users),
    path('search/posts/', search_posts),
]
