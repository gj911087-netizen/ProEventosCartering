from django.shortcuts import render

# Create your views here.
def Canva(request):
    return render(request,"ModeloCanvas/canvas.html")