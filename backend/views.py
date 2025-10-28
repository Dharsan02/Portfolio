from django.shortcuts import render
from django.views.generic import TemplateView
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.mail import send_mail
from rest_framework import status
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

class Home(TemplateView):
  template_name="home.html"

@method_decorator(csrf_exempt, name='dispatch')
class Contact(APIView):
    def post(self, request):
        name = request.data.get("name")
        email = request.data.get("email")
        message = request.data.get("message")

        if not all([name, email, message]):
            return Response({"error": "All fields are required"}, status=400)

        send_mail(
            "Portfolio Email",
            f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}",
            "dharsan.s212@gmail.com",  # from
            ["dharsan.s212@gmail.com"],  # to
        )

        return Response({"message": "✅ Message sent successfully!"}, status=200)
# Create your views here.

