from django.shortcuts import render, redirect
from django.contrib import messages
from django.core.mail import EmailMultiAlternatives
from django.conf import settings
from .models import Contacto


def Home(request):

    if request.method == 'POST':

        nombre = request.POST.get('nombre')
        telefono = request.POST.get('telefono')
        correo = request.POST.get('correo')
        opcion = request.POST.get('opcion')
        fechaEvento = request.POST.get('fechaEvento')
        numeroPersona = request.POST.get('NumPersonas')
        descripcion = request.POST.get('descripcion')

        # URL pública del logo
        logo_url = "https://i.postimg.cc/sXdYNm5f/logo-(2).png"

        # Guardar en BD
        Contacto.objects.create(
            nombre=nombre,
            telefono=telefono,
            correo=correo,
            opcion=opcion,
            fechaEvento=fechaEvento,
            numeroPersona=numeroPersona,
            descripcion=descripcion
        )

     

        asunto_admin = " Nueva solicitud de evento | ProEventos"

        mensaje_texto = f"""
Nueva solicitud recibida desde la página web

DATOS DEL CLIENTE
-------------------------
Nombre: {nombre}
Teléfono: {telefono}
Correo: {correo}

EVENTO
-------------------------
Tipo: {opcion}
Fecha: {fechaEvento}
Asistentes: {numeroPersona}

DESCRIPCIÓN
-------------------------
{descripcion}
        """

        mensaje_html = f"""
        <html>
        <body style="margin:0;padding:30px;background:#f4f4f4;font-family:Arial,sans-serif;">

            <div style="max-width:700px;margin:auto;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 0 18px rgba(0,0,0,.08);">

                <div style="background:#111;padding:30px;text-align:center;">
                    <img src="{logo_url}" width="95">
                    <h1 style="color:#d4af37;margin:15px 0 5px;">ProEventos</h1>
                    <p style="color:#ddd;margin:0;">Nueva solicitud recibida</p>
                </div>

                <div style="padding:35px;">

                    <h2 style="color:#222;margin-top:0;">Información del cliente</h2>

                    <table style="width:100%;border-collapse:collapse;font-size:15px;">
                        <tr>
                            <td style="padding:10px;border-bottom:1px solid #eee;"><b>Nombre</b></td>
                            <td style="padding:10px;border-bottom:1px solid #eee;">{nombre}</td>
                        </tr>
                        <tr>
                            <td style="padding:10px;border-bottom:1px solid #eee;"><b>Teléfono</b></td>
                            <td style="padding:10px;border-bottom:1px solid #eee;">{telefono}</td>
                        </tr>
                        <tr>
                            <td style="padding:10px;border-bottom:1px solid #eee;"><b>Correo</b></td>
                            <td style="padding:10px;border-bottom:1px solid #eee;">{correo}</td>
                        </tr>
                        <tr>
                            <td style="padding:10px;border-bottom:1px solid #eee;"><b>Tipo evento</b></td>
                            <td style="padding:10px;border-bottom:1px solid #eee;">{opcion}</td>
                        </tr>
                        <tr>
                            <td style="padding:10px;border-bottom:1px solid #eee;"><b>Fecha</b></td>
                            <td style="padding:10px;border-bottom:1px solid #eee;">{fechaEvento}</td>
                        </tr>
                        <tr>
                            <td style="padding:10px;border-bottom:1px solid #eee;"><b>Personas</b></td>
                            <td style="padding:10px;border-bottom:1px solid #eee;">{numeroPersona}</td>
                        </tr>
                    </table>

                    <h3 style="color:#d4af37;margin-top:30px;">Descripción del evento</h3>

                    <div style="background:#fafafa;padding:18px;border-left:4px solid #d4af37;border-radius:8px;color:#444;">
                        {descripcion}
                    </div>

                </div>

                <div style="background:#f8f8f8;padding:18px;text-align:center;font-size:12px;color:#777;">
                    Mensaje generado automáticamente desde la web de ProEventos.
                </div>

            </div>

        </body>
        </html>
        """

        correo_admin = EmailMultiAlternatives(
            asunto_admin,
            mensaje_texto,
            settings.EMAIL_HOST_USER,
            ["gj911087@gmail.com"]
        )

        correo_admin.attach_alternative(mensaje_html, "text/html")

        try:
            correo_admin.send()

        

            asunto_cliente = " Hemos recibido tu solicitud | ProEventos"

            texto_cliente = f"""
Hola {nombre},

Gracias por comunicarte con ProEventos.

Hemos recibido tu solicitud correctamente y en breve nos estaremos colocando en contacto contigo para brindarte atención personalizada.

Será un gusto acompañarte en tu evento.

Atentamente,
Equipo ProEventos
            """

            html_cliente = f"""
            <html>
            <body style="margin:0;padding:30px;background:#f4f4f4;font-family:Arial,sans-serif;">

                <div style="max-width:700px;margin:auto;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 0 18px rgba(0,0,0,.08);">

                    <div style="background:#111;padding:30px;text-align:center;">
                        <img src="{logo_url}" width="95">
                        <h1 style="color:#d4af37;margin:15px 0 5px;">ProEventos</h1>
                        <p style="color:#ddd;margin:0;">Gracias por confiar en nosotros</p>
                    </div>

                    <div style="padding:40px;text-align:center;">

                        <h2 style="color:#222;">Hola {nombre}</h2>

                        <p style="font-size:16px;color:#555;line-height:1.7;">
                            Hemos recibido tu solicitud exitosamente.
                            Muy pronto uno de nuestros asesores se pondrá en contacto contigo
                            para ayudarte a crear una experiencia inolvidable.
                        </p>

                        <div style="margin:30px 0;padding:20px;background:#fafafa;border-radius:10px;">
                            <p style="margin:0;color:#777;">Tipo de evento</p>
                            <p style="margin:5px 0;font-weight:bold;color:#222;">{opcion}</p>
                        </div>

                        <p style="color:#d4af37;font-weight:bold;font-size:18px;">
                            Gracias por elegir ProEventos
                        </p>

                    </div>

                    <div style="background:#f8f8f8;padding:18px;text-align:center;font-size:12px;color:#777;">
                        Este correo fue enviado automáticamente.
                    </div>

                </div>

            </body>
            </html>
            """

            confirmacion = EmailMultiAlternatives(
                asunto_cliente,
                texto_cliente,
                settings.EMAIL_HOST_USER,
                [correo]
            )

            confirmacion.attach_alternative(html_cliente, "text/html")
            confirmacion.send()

            messages.success(request, "Solicitud enviada correctamente.")

        except Exception as e:
            print(e)
            messages.warning(request, "Se guardó la solicitud, pero falló el envío del correo.")

        return redirect('home')
    

    return render(request, "ProEventos/home.html")