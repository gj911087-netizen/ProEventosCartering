from django.shortcuts import render

# Create your views here.
def Tendencias(request):
    return render (request, "tendenciasBCG/tendencias_bcg.html")