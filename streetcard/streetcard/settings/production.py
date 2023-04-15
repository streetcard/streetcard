from .base import *

DEBUG = False

ALLOWED_HOSTS=['www.streetcard.org']

try:
    from .local import *
except ImportError:
    pass
