from django.urls import path 
from . import views 

from django.conf import settings
from django.conf.urls.static import static

# rutas 

urlpatterns=[
    path('canva/',views.Canva,name="ModeloCanvas")
]