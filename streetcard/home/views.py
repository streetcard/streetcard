# views.py
from django.core.mail import send_mail, BadHeaderError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, redirect
from .forms import ContactForm

def homeView(request):
    return render(request, "home/home.html")
def aboutView(request):
    return render(request, "home/about.html")
def contactView(request):
    if request.method == "GET":
        form = ContactForm()
    else:
        form = ContactForm(request.POST)
        if form.is_valid():
            subject = form.cleaned_data["subject"]
            from_email = form.cleaned_data["from_email"]
            message =  'Sender: ' + from_email + "\n" + form.cleaned_data['message']
            try:
                send_mail(subject, message, from_email, ["streetcard.org@gmail.com"])
            except BadHeaderError:
                return HttpResponse("Invalid header found.")
            return redirect("success")
    return render(request, "home/contact.html", {"form": form})

def successView(request):
    return HttpResponse("Success! Thank you for your message.")