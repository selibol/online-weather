import json
from django.contrib.auth import authenticate, logout, login
from django.http import HttpResponseRedirect, JsonResponse
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
import requests
from weather.utils.day_utils import get_day_name


def login_user(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        auth = authenticate(username=username, password=password)
        if auth:
            login(request, auth)
            return redirect('/')
        else:
            messages.error(request, "Kullanici adi veya sifre hatali")
            return HttpResponseRedirect(request.path_info)
    else:
        return render(request, 'weather/login.html')


@login_required
def index(request):
    with open('weather/static/city.json', encoding='utf-8') as data:
        cities = json.load(data)
    return render(request, 'weather/index.html', {'cities': cities})


@login_required
def weather_api(request):
    city = request.GET.get('city')
    num_of_days = request.GET.get('num_of_days')
    url = 'https://api.worldweatheronline.com/premium/v1/weather.ashx?q={city}&key=d3cc279170e048959d0173959211301&num_of_days={num_of_days}&format=json'.format(city=city, num_of_days=num_of_days)
    r = requests.get(url)
    data = r.json()
    weathers = data['data']['weather']
    json_info = {'city': city, 'basic_info': [], 'detail_info': []}
    for weather in weathers:
        json_info['basic_info'].append({
            'date': get_day_name(weather['date']),
            'max_temp': weather['maxtempC'],
            'min_temp': weather['mintempC']
        })
        json_info['detail_info'].append({
            'humidity': weather['hourly'][0]['humidity'],
            'wind': weather['hourly'][1]['windspeedKmph'],
            'rain': weather['hourly'][0]['chanceofrain'],
            'cloud': weather['hourly'][0]['cloudcover'],
            'visibility': weather['hourly'][0]['visibility'],
            'pressure': weather['hourly'][0]['pressure'],
            'sun_rise': weather['astronomy'][0]['sunrise'],
            'sun_set': weather['astronomy'][0]['sunset'],
            'moon_rise': weather['astronomy'][0]['moonrise'],
            'moon_set': weather['astronomy'][0]['moonset']
        })
    return JsonResponse(json_info, safe=False)


@login_required
def logout_user(request):
    logout(request)
    return render(request, 'weather/login.html')





