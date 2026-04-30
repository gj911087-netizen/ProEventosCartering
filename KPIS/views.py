from django.shortcuts import render

# Create your views here.
def KPIS(request):
    return render (request,"KPIS/kpis.html")