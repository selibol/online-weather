from django.urls import path
from weather import views

urlpatterns = [
    path('login/', views.login_user, name="login"),
    path('', views.index, name='index'),
    path('weather', views.weather_api, name='weather'),
    path('logout/', views.logout_user, name='logout')

]