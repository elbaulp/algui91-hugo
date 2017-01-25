---
author: alex
categories:
- articulos
color: '#F57C00'
date: 2015-06-29 16:43:06
description: "Hoy quiero hablaros de dunst, un demonio de notificaciones que me instal\xE9
  hace poco, y que se integra muy bien con DWM."
image: Como-Configurar-Dunst,-un-daemon-de-notificaciones-altamente-configurable.png

mainclass: articulos
modified: null
tags:
- dunst
- notify-send
- notificaciones
- dwm
title: "C\xF3mo Configurar Dunst, Un Daemon De Notificaciones Altamente Configurable"
---

<figure>
<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/Como-Configurar-Dunst,-un-daemon-de-notificaciones-altamente-configurable.png" title="{{ page.title }}" alt="{{ page.title }}" width="329px" height="212px" />
</figure>

Si eres lector habitual del blog, sabrás que me gustan los entornos minimalistas y configurables, como puede comprobarse en los artículos [instalar y configurar dwm](/instalar-y-configurar-dwm-el-gestor-de-ventanas-mas-eficiente/ "Instalar y configurar DWM"), y el patch para colorear la [barra de estado](/statuscolor-dwm-6-1/).

Hoy quiero hablaros de _dunst_, un demonio de notificaciones que me instalé hace poco, y que se integra muy bien con _DWM_.

<!--more--><!--ad-->

## Instalar dunst

Tan simple como ejecutar:

```bash

$ sudo apt-get install dunst

```

## Configurar dunst

_Dunst_ es áltamente configurable, mediante su fichero de configuración, situado en `~/.config/dunst/dunstrc`, podemos cambiar su aspecto por completo. Aquí dejo un ejemplo de mi configuración actual:

```bash

[global] # Configuración global
    font = "Ubuntu Light 12"
    # Permitir etiquetas html
    allow_markup = yes
    # El formato de las notificaciones,
    # %s - sumario
    # %p - progreso
    # %b - cuerpo del mensaje
    format = "<b>%s %p</b>\n%b"
    # Ordenar mensajes por prioridad
    sort = yes
    # Mostrar cuantas not. hay ocultas
    indicate_hidden = true
    idle_threshold = 0
    # Tamaño de  la notificación
    geometry = "300x5-20+20"
    alignment = center
    show_age_threshold = 60
    sticky_history = yes
    follow = mouse
    word_wrap = yes
    separator_height = 2
    padding = 10
    horizontal_padding = 10
    separator_color = frame
    startup_notification = true

# Diseño del borde de la notificación
[frame]
    width = 3
    color = "#6092BE"

# Atajos de teclado
[shortcuts]
    close = ctrl+space
    close_all = ctrl+shift+space
    history = ctrl+grave
    context = ctrl+shift+period

# Estilo para las notificaciones de baja prioridad
[urgency_low]
    background = "#ffffff"
    foreground = "#000000"
    timeout = 5

# Estilo para las notificaciones de prioridad normal
[urgency_normal]
    background = "#94DBFF"
    foreground = "#000000"
    timeout = 10

# Estilo para las notificaciones de alta prioridad
[urgency_critical]
    background = "#ff9999"
    foreground = "#000000"
    timeout = 0

# Se pueden personalizar notificciones en función de su texto
[test]
    summary = "*test*"
    background="#22dd22"

# Y también se personalizan por aplicación
[signed_on]
    appname = Pidgin
    summary = "*signed on*"
    urgency = low

```

## Probar la configuración

Para probar cómo queda nuestra configuración, podemos usar el comando `notify-send`:

```bash

notify-send -u low -t 0 "Low sumary" "Low body"
notify-send -u normal -t 0 "Normal sumary" "Normal body"
notify-send -u critical -t 0 "Critical sumary" "Critical body"
notify-send -u critical -t 0 "test" "Critical body"

```

Eso es todo, sencillo de configurar, y minimalista.
