from django.db import models

class Client(models.Model):
    client_id = models.IntegerField(null=True)
    firstname = models.CharField(max_length=30)
    middlename = models.CharField(max_length=30)
    lastname = models.CharField(max_length=30)
    
