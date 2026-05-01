from django.shortcuts import render

# Create your views here.
def PpD(request):
    return render(request,"PPD/pestel_porter_dofa.html")
