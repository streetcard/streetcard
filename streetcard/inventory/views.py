from django.http import HttpResponse
from django.shortcuts import render
from django.shortcuts import redirect
from inventory.forms import ItemForm
from inventory.forms import Item
from inventory.forms import Client

import json

def inventory(request):
    item_list=Item.objects.order_by("-id")
    return render(request, "inventory/home.html", {'item_list': item_list })
    
def entry(request):
    form = ItemForm(request.POST or None)
    if request.method == "POST":
        if form.is_valid():
            data = form.save(commit=False)
            data.save()
        return redirect("inventory")
    else:
        return render(request, "inventory/entry.html", {"form": form})

def updateitem(request, item_id):
    item = Item.objects.get(pk=item_id)
    form = ItemForm(request.POST or None, instance = item)
    if form.is_valid():
        data = form.save(commit=False)
        data.save()
        return redirect("inventory")
    else:
        return render(request, "inventory/update_item.html", {"item": item
                                                          ,'form': form })
        

def checkout(request, client_id = None):
    notification = None
    if client_id == None:
        return render(request, "inventory/checkout.html")
    try: #Try to get client from library 
        #Inventory List
        item_list=Item.objects.order_by("-id")
        client = Client.objects.get(pk=client_id)
        json_object = json.loads('{"11": "2","9": "3"}');
        items = [];
        qty = [];
        for item in json_object:
            prodcut = Item.objects.get(pk = item)
            items.append(prodcut.description)
            qty.append(json_object[item])
        notification = "Accessing {} {}'s inventory.".format(client.firstname, client.lastname)
        return render(request, "inventory/checkout.html",{"client" : client, "items" : items, "qty" : qty, "items_list" : item_list ,"notification" : notification})
    except:#Client not found in DB
        notification = "Client with ID = {} not found in database.".format(client_id)
        return render(request, "inventory/checkout.html",{"notification" : notification})