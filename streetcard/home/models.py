##################################################################################
#
#
#
#
##################################################################################

# Django
from django.db import models

# Wagtail
from wagtail.models import Page
from wagtail.fields import RichTextField
from wagtail.admin.panels import FieldPanel

##################################################################################
# Home Page

class HomePage(Page):

    class Meta:
        verbose_name = 'home_page'

    body = RichTextField(blank=True)

    template = "home/home_page.html"

    content_panels = Page.content_panels + [
        FieldPanel('body'),
    ]

##################################################################################
# About Page

class AboutPage(Page):

    class Meta:
        verbose_name = 'about_page'

    body = RichTextField(blank=True)

    template = "home/about_page.html"

    content_panels = Page.content_panels + [
        FieldPanel('body'),
    ]

##################################################################################
# Contact Page

class ContactPage(Page):

    class Meta:
        verbose_name = 'contact_page'

    body = RichTextField(blank=True)

    template = "home/contact_page.html"

    content_panels = Page.content_panels + [
        FieldPanel('body'),
    ]