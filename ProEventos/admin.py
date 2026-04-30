from django.contrib import admin
from .models import Contacto


@admin.register(Contacto)
class ContactoAdmin(admin.ModelAdmin):

    # Columnas visibles
    list_display = (
        'nombre',
        'telefono',
        'correo',
        'opcion',
        'fechaEvento',
        'numeroPersona',
    )

    # Buscador arriba
    search_fields = (
        'nombre',
        'correo',
        'telefono',
    )

    # Filtros laterales
    list_filter = (
        'opcion',
        'fechaEvento',
    )

    # Ordenar por fecha más reciente
    ordering = ('-fechaEvento',)

    # Cantidad por página
    list_per_page = 10

    # Click abre detalle
    list_display_links = (
        'nombre',
        'correo',
    )

    # Campos solo lectura
    readonly_fields = ()

    # Diseño interno bonito
    fieldsets = (

        ('Información Personal', {
            'fields': (
                'nombre',
                'telefono',
                'correo',
            )
        }),

        ('Datos del Evento', {
            'fields': (
                'opcion',
                'fechaEvento',
                'numeroPersona',
            )
        }),

        ('Mensaje del Cliente', {
            'fields': (
                'descripcion',
            )
        }),

    )
