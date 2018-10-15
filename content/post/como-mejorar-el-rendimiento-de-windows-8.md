---
author: alex
categories:
- how to
- articulos
mainclass: articulos
date: '2016-01-01'
lastmod: 2017-09-28T17:54:34+01:00
image: 2013/02/Windows8problem.jpg
url: /como-mejorar-el-rendimiento-de-windows-8/
tags:
- windows
title: "Cómo mejorar el rendimiento de Windows 8"
---

<figure>
    <img sizes="(min-width: 640px) 640px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2013/02/Windows8problem.jpg" alt="Windows8problem" width="640px" height="360px"></img>
</figure>

Aunque llevo años sin usar Windows, hace poco una amiga me comentó que había comprado un portatil con Windows 8 e iba fatal, cada dos por tres se colgaba y ni siquiera se apabaga.

Tras un poco de investigación por la red, comprobé que no era la única, Windows 8 está dando muchos problemas a los usuarios.

Una vez con el portatil en mi posesión confirmé el mal rendimiento que tenía. Se quedaba bloqueado hasta tal punto que era necesario apagarlo directamente cortando el suministro de corriente.

Tras aplicarle una serie de cambios, he conseguido que vaya fluido y sin ningún problema. Si tienes problemas similares con tu windows 8, puedes probar a realizar lo siguientes cambios:

<!--more--><!--ad-->

# Windows 8 no se apaga

Este problema es consecuencia de una nueva característica introducida por Microsoft, que pretende acelerar el proceso de arranque del sistema, sin embargo provoca muchos problemas en la mayoría de PCs. Basta con desactivar esta opción y el ordenador se apagará correctamente. Procedemos con los siguientes pasos:

1. En la pantalla de inicio, teclea **power**, seleciona **Configuración » Cambiar las acciones de los botones de inicio/apagado**.
<figure>
    <img sizes="(min-width: 591px) 591px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2013/02/Change_Power_Settings_Windows_8.png" alt="Change_Power_Settings_Windows_8" width="591px" height="250px"></img>
</figure>
2. Se abrirá una ventana con varias opciones, haz click en **Cambiar la configuración actualmente no disponible** en caso de que las opciones bajo **Configuración de apagado estén deshabilitadas**.
3. Desactiva la opción **Activar inicio rápido**.
<figure>
    <img sizes="(min-width: 540px) 540px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2013/02/Disable_Hybrid_Shutdown_Fast_Startup_Windows_8.png" alt="Disable_Hybrid_Shutdown_Fast_Startup_Windows_8" width="540px" height="307px"></img>
</figure>
4. Haz click en guardar cambios.

Reinicia el equipo y el problema debería haber desaparecido. En caso contrario, abre un terminal pulsando **Win+X** y selecciona **Símbolo del sistema (Administrador)**. Introduce lo siguiente:

```bash
bcdedit /set disabledynamictick yes
```

# Desactivar programas de inicio innecesarios

1. Abre el administrador de tareas con **Win+X** » **Administrador de tareas**.
<figure>
    <img sizes="(min-width: 446px) 446px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2013/02/open-task-manager.jpg" alt="open-task-manager" width="446px" height="395px"></img>
</figure>
2. Ve a inicio y desactiva todos los programas que no quieras que se ejecuten al inicio del sistema.

# Limpiar el buffer de memoria y archivos temporales innecesarios

1. Pulsa las teclas **Windows + R**, escribe “**%temp%**” y pulsa enter.
<figure>
    <img sizes="(min-width: 408px) 408px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2013/02/run-temppercent.jpg" alt="run-temppercent" width="408px" height="210px"></img>
</figure>
2. Selecciona todos los archivos y bórralos.
3. De forma similar, repite el paso 1, pero esta vez escribe “**temp**” y borra todos los archivos.
4. Por último, vuelve a repetir el paso uno, escribiendo “**prefetch**” y borra todos los archívos.

# Disminuir los servicios en ejecución

1. Pulsa **Windows + R**, teclea “**msconfig**” y pulsa enter.
2. Oculta los servicios de Microsoft y deshabilita los que creas convenientes.
<figure>
    <img sizes="(min-width: 560px) 560px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2013/02/stop-services.jpg" alt="stop-services" width="560px" height="373px"></img>
</figure>

# Modifica el registro del sistema

1. Pulsa **Windows + R**, teclea “**regedit**” y pulsa enter.
2. Dirígiete hacia ***HKEY\_CURRENT\_USER\Control Panel\Mouse***. Haz doble click en **MouseHoverTime** y cambia el valor a 100.
<figure>
    <img sizes="(min-width: 339px) 339px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2013/02/edit-mousehovertime.jpg" alt="edit-mousehovertime" width="339px" height="58px"></img>
</figure>
<figure>
    <img sizes="(min-width: 388px) 388px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2013/02/edit-value.jpg" alt="edit-value" width="388px" height="171px"></img>
</figure>
3. Dirígete ahora a ***HKEY\_LOCAL\_MACHINE\SYSTEM\Current Control Set\Control***. Doble click en **WaitToKillServiceTimeout** y cambia el valor a 1000.
<figure>
    <img sizes="(min-width: 389px) 389px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2013/02/edit-value-wait.jpg" alt="edit-value-wait" width="389px" height="172px"></img>
</figure>

Estos cambios deberías ser suficientes para notar una mejoría en el rendimiento del sistema. Puedes encontrar más información en las referencias,.

# Referencias

- *How to speed up Windows 8 PC?* »» <a href="http://mywindows8.org/speed-up-windows-8/" target="_blank">Visitar sitio</a>
- *Fix Windows 8 Restart and Shutdown Problems by Disabling “Hybrid Shutdown” Feature* »» <a href="http://www.askvg.com/fix-windows-8-restart-and-shutdown-problems-by-disabling-hybrid-shutdown-feature/" target="_blank">Visitar sitio</a>
- *Imagen: kotaku* »» <a href="http://kotaku.com/5897763/three-killer-problems-that-threaten-windows-8" target="_blank">Visitar sitio</a>
