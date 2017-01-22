---
author: alex
categories:
- c
color: '#E64A19'
date: '2016-12-12'
description: "D\xEDas atr\xE1s hablamos sobre DWM y qued\xF3 pendiente explicar c\xF3mo
  colorear la barra de estado. En el art\xEDculo de hoy veremos c\xF3mo aplicar el
  parche Simple StatusColor en DWM 6.1, que escrib\xED hace poco."
image: 2014/07/simplestatuscolor-in-dwmstatus-dwm6.1.png
lastmod: 2015-12-24
layout: post.amp
mainclass: dev
permalink: /statuscolor-dwm-6-1/
tags:
- simplestatuscolor dwm 6.1
- statuscolor dwm 6.1
- statuscolor for dwm 6.1
title: Colorear la barra de estado con Simple StatusColor en DWM 6.1
---

Días atrás hablamos [sobre DWM][1] y quedó pendiente explicar cómo colorear la barra de estado. En el artículo de hoy veremos cómo aplicar el parche Simple StatusColor en DWM 6.1, que escribí hace poco.

<!--more--><!--ad-->

Para aquel que quiera simplemente aplicar el parche y empezar a usarlo, debe leer únicamente la siguiente sección. Aquellos que estén interesados en los detalles técnicos pueden leer el artículo completo.

## Aplicar y usar el parche

El primer paso es situarnos en el directorio con el código de DWM y descargar el parche:

```bash
wget https://raw.githubusercontent.com/algui91/myDWM/master/patches/dwm-6.1-simplestatuscolor.diff

```

Aplicamos el parche:

```bash
git apply dwm-6.1-simplestatuscolor.diff

```

Compilamos e instalamos:

```bash
$ sudo make clean install

```

### Crear una barra de estado con dwmstatus

Éste parche solo funciona con la aplicación **dwmstatus**, para descargarlo e instalarlo basta con hacer:

```bash
$ git clone git://git.suckless.org/dwmstatus
$ sudo make clean install
$ dwmstatus

```

Con esto tendremos **dwmstatus** ejecutándose y mostrando información.

### Coloreando la barra de estado

Para darle color, basta con modificar el código de **dwmstatus** e indicar qué colores usar. Por ejemplo, en el fichero `dwmstatus.c` la línea que formatea el estado es la siguiente:

```c
status = smprintf("L:%s A:%s U:%s %s", avgs, tmar, tmutc, tmbln);

```

Por defecto el parche tiene 7 colores, para indicar el color a usar se debe escribir el caracter `\xCL` al final del texto a colorear, donde **CL** es un dígito del **01** al **07**. Por ejemplo, usando los tres primeros colores:

```c
status = smprintf("L:%s\x01 A:%s\x02 U:%s %s\x03", avgs, tmar, tmutc, tmbln);

```

Coloreará `L:%s` con el color 1, `L:%s` con el color 2 y ` U:%s %s` con el color 3. He aquí un ejemplo de la mía:

<figure>
<a href="/img/2014/07/simplestatuscolor-in-dwmstatus-dwm6.1.png"><amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2014/07/simplestatuscolor-in-dwmstatus-dwm6.1.png" title="{{ page.title }}" alt="{{ page.title }}" width="702px" height="13px" /></a>
</figure>

## Dentro del código

Pasemos ahora a ver qué hace el código para ser capaz de colorear la barra de estado. Explicaremos paso a paso lo que hace cada trozo de código en cada fichero:

```c
/* ##### config.def.h ##### */
 /* appearance */
#define NUMCOLORS 7
static const unsigned long colors[] = {
    0x54ebff,   // \x01
    0xdb6794,   // \x02
    0xef9c3a,   // \x03
    0xa4bc74,   // \x04
    0x99FF99,   // Good \x05
    0xFF6600,   // Warning \x06
    0xC63333,   // Caution \x07
};

```

Aquí simplemente estamos definiendo el número de colores que usaremos y su valor (En Hexadecimal).

```c
/* ##### drw.c ##### */
#define TEXTW(X)                (drw_font_getexts_width(drw->font, X, strlen(X)) + drw->font->h)
// ......
void
drw_colored_st(Drw *drw, int x, int y, unsigned int w, unsigned int h, char text[][256], const unsigned long *color, const char *ptext) {
  char buf[256];
  int i, tx, ty, th, len, olen;
  Extnts tex;

  if(!drw || !drw->scheme)
    return;
  XSetForeground(drw->dpy, drw->gc, drw->scheme->bg->rgb);
  XFillRectangle(drw->dpy, drw->drawable, drw->gc, x, y, w, h);
  if(!text || !drw->font)
    return;
  olen = strlen(ptext);
  drw_font_getexts(drw->font, ptext, olen, &tex;);
  th = drw->font->ascent + drw->font->descent;
  ty = y + (h / 2) - (th / 2) + drw->font->ascent;
  tx = x + (h / 2);
  /* shorten text if necessary */
  for(len = MIN(olen, sizeof buf); len && (tex.w > w - tex.h || w < tex.h); len--)
    drw_font_getexts(drw->font, ptext, len, &tex;);
  if(!len)
    return;
  memcpy(buf, ptext, len);
  if(len < olen)
    for(i = len; i && i > len - 3; buf[--i] = '.');

  for (int k = 0; color[k]; k++) {
    XSetForeground(drw->dpy, drw->gc, color[k]);
    if (drw->font->set)
      XmbDrawString(drw->dpy, drw->drawable, drw->font->set, drw->gc, tx, ty,
                    text[k], strlen(text[k]));
    else
      XDrawString(drw->dpy, drw->drawable, drw->gc, tx, ty, text[k], strlen(text[k]));
    tx += TEXTW(text[k]) - TEXTW("\x0");
  }
}

```

`drw.c` es el encargado de dibujar los elementos en la pantalla. Aquí se introdujo un método similar a `drw_text`, que se encarga de dibujar el texto en la pantalla, pero con la posibilidad de colorear el texto además de dibujarlo. La macro `TEXTW(X)` devuelve el ancho que ocupa el texto `X` en píxeles con la fuente seleccionada.

La clave para colorear está en el último for, encargado de recorrer la lista de colores pendientes de dibujar junto con el texto correspondiente. La función `XSetForeground` de `Xlib` especifica el color, mientras que `XmbDrawString` se encarga de posicionar el texto recibido en las coordenadas correctas.

```c
/* ##### dwm.c ##### */
void
parsestatus(char *text, unsigned long *color_queue, char tokens[][256]) {

  char delim[NUMCOLORS+1];

  /* Thanks to http://stackoverflow.com/a/24931903/1612432 */
  for (int i = 0; i < NUMCOLORS; ++i)
      delim[i] = i + 1;
  /* Terminates as string */
  delim[NUMCOLORS] = '\0';

  char *copy = strdup(text);
  char *res = strtok(copy, delim);
  if (!text[res - copy + strlen(res)]){
    // Status already parsed
    color_queue[0] = drw_clr_create(drw, normfgcolor)->rgb;
    strcpy(tokens[0], text);
    return;
  }

  char cleanBuf[strlen(text)];
  cleanBuf[0] = '\0';
  strcpy(tokens[0], res);
  strcat(cleanBuf, res);
  int i = 1;

  while (res) {
    /* Figure out what delimiter was used */
    // Thanks to http://stackoverflow.com/a/12460511/1612432
    int deli = text[res - copy + strlen(res)] - 1;
    color_queue[i-1] = colors[deli];
    res = strtok(0, delim);
    if (res){
      strcpy(tokens[i++], res);
      strcat(cleanBuf, res);
    }
  }
  free(copy);
  strncpy(text, cleanBuf, strlen(cleanBuf));
  text[strlen(cleanBuf)] = '\0';
  color_queue[i] = '\0';
}

```

Este básicamente, es el método principal, se encarga de parsear el estado para extrar qué colores corresponden a qué parte del texto. Almacena los colores en un [array][3] para recordar en qué orden aplicarlos.

Por último, solo queda usar los métodos creados, deben ir en el método `drawbar`, encargado de dibujar todo el recuadro que muestra información en DWM (etiquetas, ventana actual y barra de estado). Para ello se reemplaza el método `drw_text` por `drw_colored_st` cuando se vaya a pintar el estado. Habiéndolo parseado previamente. Ésta vez se muestra el [diff][4], para que sea visto con mayor claridad.

```diff
+void
 drawbar(Monitor *m) {
   int x, xx, w;
   unsigned int i, occ = 0, urg = 0;
@@ -716,13 +760,14 @@ drawbar(Monitor *m) {
   x += w;
   xx = x;
   if(m == selmon) { /* status is only drawn on selected monitor */
+	  parsestatus(stext, color_queue, tokens);
     w = TEXTW(stext);
     x = m->ww - w;
     if(x < xx) {
       x = xx;
       w = m->ww - xx;
     }
-		drw_text(drw, x, 0, w, bh, stext, 0);
+		drw_colored_st(drw, x, 0, w, bh, tokens, color_queue, stext);
   }
   else
     x = m->ww;

```

## Referencias

Todo el trabajo está en mi cuenta de Github, Tanto mi configuración actual de DWM como mi DWMstatus. En los siguientes enlaces.

*myDWMstatus* »» <a href="https://github.com/algui91/myDWMstatus" target="_blank">github.com/algui91/myDWMstatus</a>
*myDWM* »» <a href="https://github.com/algui91/myDWM" target="_blank">github.com/algui91/myDWM</a>

[1]: https://elbauldelprogramador.com/instalar-y-configurar-dwm-el-gestor-de-ventanas-mas-eficiente/ "Instalar y configurar DWM, el gestor de ventanas más eficiente"
[3]: https://elbauldelprogramador.com/clases-y-objetos-arrays/ "Clases y Objetos – Arrays"
[4]: https://elbauldelprogramador.com/mini-tutorial-y-chuleta-de-comandos-git/ "Git: Mini Tutorial y chuleta de comandos"