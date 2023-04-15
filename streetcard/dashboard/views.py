from django.shortcuts import render
from dashboard.models import Client
from django.http import HttpResponse, HttpResponseRedirect

#Client Dashboard
def dashboard(request, client_id):
    if request.method == "GET":
        client = Client.objects.get(client_id=client_id)
        header = client.firstname + ' ' + client.lastname + "'s Dashboard"
        firstname = client.firstname + "'s"
        return render(request, "dashboard/dashboard.html", {'header' : header, 'fistname': firstname})
    else:
        data = None
    
        #check to see if pin is required
        #redirect
def dashboardnull(request):
    return HttpResponse("Page Not Found Template - No Client ID found.")
        
