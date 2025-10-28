from django.urls import path
from .views import *

def postman_ui(request):
    return render(request, 'home.html')

urlpatterns=[
  path('',Home.as_view(),name="home"),
  path('postman/send/',Contact.as_view(),name="contact"),
  path('contact-postman/', postman_ui, name='postman_ui')
]