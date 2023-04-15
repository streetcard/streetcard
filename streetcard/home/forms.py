# 
from django import forms

class ContactForm(forms.Form):
    firstname = forms.CharField(required=True, widget=forms.TextInput(attrs={'placeholder': 'First Name',
                                                                             'style': 'width:200px; inline:block'}))
    lastname = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Last Name',
                                                            'style': 'width:200px'}))
    from_email = forms.EmailField(required=True, widget=forms.TextInput(attrs={'placeholder': 'Email Address',
                                                                             'style': 'width:200px'}))
    subject = forms.EmailField(required=True, widget=forms.TextInput(attrs={'placeholder': 'Subject',
                                                                             'style': 'width:200px'}))
    message = forms.CharField(widget=forms.Textarea(attrs={'placeholder': 'Email Body'}), required=True)