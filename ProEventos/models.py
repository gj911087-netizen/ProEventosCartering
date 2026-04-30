from django.db import models

# Create your models here.
class Contacto(models.Model):
    nombre = models.CharField(max_length=100)
    telefono=models.CharField(max_length=20)
    correo = models.EmailField()
    opcion = models.CharField(max_length=100)
    fechaEvento=models.DateField()
    numeroPersona=models.IntegerField()
    descripcion = models.TextField()
    fecha_envio=models.DateTimeField(auto_now_add=True)
    class Meta:
        verbose_name="Contacto"
        verbose_name_plural="Contactos"
  
    def __str__(self):
        return f"{self.nombre} - {self.correo}"