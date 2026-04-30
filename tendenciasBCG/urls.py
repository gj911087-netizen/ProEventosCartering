from django.urls import path
from . import views

#para ver las imagenes insertadas
from django.conf import settings
from django.conf.urls.static import static
#rutas

urlpatterns=[
    path('Tendencias/',views.Tendencias,name="tendenciasBCG"),
  
    
   
] 