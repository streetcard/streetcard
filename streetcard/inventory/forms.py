from django import forms
from inventory.models import Item
from inventory.models import Client


      
class ItemForm(forms.ModelForm):
    class Meta:
        model = Item
        fields = '__all__'
        widgets = {
            'description': forms.TextInput(attrs={'style': 'width:175px'}),
            'category': forms.Select(attrs={'style': 'width:125px'}),
            'type': forms.Select(attrs={'style': 'width:125px'}),
            'unitcost': forms.NumberInput(attrs={'style': 'width:75px'}),
            'qty': forms.NumberInput(attrs={'style': 'width:75px'}),
            'itemlimit': forms.NumberInput(attrs={'style': 'width:75px'}),
        }
        
        # widgets = {
        #     'description' : forms.TextInput(attrs={'class' : 'form-contorl', 'placeholder': 'Item Description'}),
        #     'date' : forms.NumberInput(attrs={'class' : 'form-contorl'}),
        #     'type' :  forms.RadioSelect,
        #     }