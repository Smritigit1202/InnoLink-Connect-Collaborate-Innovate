from django.urls import path
from .views import signup, login, get_user_profile, get_suggested_profiles  # Ensure this is correct

urlpatterns = [
    path('signup/', signup, name='signup'),
    path('login/', login, name='login'),
    path("user/profile/", get_user_profile, name="user-profile"),
    path("suggested-profiles/", suggested_profiles, name="suggested-profiles"),]
