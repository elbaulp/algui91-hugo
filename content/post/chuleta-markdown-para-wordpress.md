---
author: alex
categories:
- how to
color: '#F57C00'
date: '2016-12-12'
description: "En su \xFAltima actualizaci\xF3n, el plugin JetPack introdujo la notaci\xF3n
  Markdown para formatear art\xEDculos y comentarios. La siguiente chuleta pretende
  servir de referencia tanto a los lectores como a mi, aprovechando as\xED la ocasi\xF3n
  para practicar y memorizar el formato."
lastmod: 2015-12-24
layout: post.amp
mainclass: articulos
permalink: /chuleta-markdown-para-wordpress/
tags:
- chuleta
- "gu\xEDa markdown"
- markdown
- markdown jetpack
- markdown worpress
- tutorial markdown
title: Chuleta de Markdown para wordpress
---

En su última actualización, el plugin [JetPack][1] introdujo la notación Markdown para formatear artículos y comentarios. La siguiente chuleta pretende servir de referencia tanto a los lectores como a mi, aprovechando así la ocasión para practicar y memorizar el formato.

<!--more--><!--ad-->

## Guía de Markdown para wordpress

#### **Negrita** o *cursiva* :

**negrita**, **negrita**, *cursiva*,*cursiva*

    __negrita__, **negrita**, *cursiva*,_cursiva_


#### Enlaces en [línea][2]:

    Un [enlace](/ "Texto alternativo")


#### Enlaces [referenciados][1]:

    [referenciados][1], en cualquier parte del texto debe haber [1]: http://enlace. "titulo"


#### Imágenes en línea: ![Alt][3]:

    ![Alt](/img/2013/12/favicon.ico "Título")


#### Imágenes referenciadas: ![Alt][3]

    ![Alt][2] Al igual que en los enlaces referenciados, en algún lugar del texto debe aparecer [2]: Ruta/a/la/imagen "Titulo".


#### Imágenes enlazadas: [![Texto Alternativo][4]][5]

    [![Texto Alternativo](/img/2013/12/favicon.ico)](/ "Imágenes enlazadas")


#### Notas al pie<sup id="fnref-2416-1"><a href="#fn-2416-1" rel="footnote">1</a></sup>:

    [^1] y donde esté la nota al pie: [^1]: Notal al pie.


#### Listas sin numerar:

  * Elemento 1
  * Elemento 2
  * Elemento 3
  * Elemento 4

        * Elemento 1
        * Elemento 2
        - Elemento 3
        - Elemento 4


#### Listas numeradas:

  1. Elemento 1
  2. Elemento 2

        1. Elemento 1
        2. Elemento 2


#### Citas

> Texto citado
>
> > Cita anidada

    > Texto citado
    >> Cita anidada


#### Preformato

Si se empieza cada línea con dos o más espacios el texto no se formateará.

#### Código en línea

`cout << "Hola" << endl;`

    `cout << "Hola" << endl;`


#### Bloques de código

    cout << "Hola" << endl;


    ```
    cout << "Hola" << endl;
    ```


ó

    ~~~
    cout << "Hola" << endl;
    ~~~


#### Cabeceras

# Header 1

## Header 2

### Header 3

#### Header 4

##### Header 5

###### Header 6

    # Header 1
    ## Header 2
    ### Header 3
    #### Header 4
    ##### Header 5
    ###### Header 6


#### Listas de definiciones

El Baúl del programador
:   Blog de programación (c++, python, sql, pl/sql, script bash, android etc)

    El Baúl del programador
    : Blog de programación (c++, python, sql, pl/sql, script bash, android etc)


#### Abreviaturas

El *markdown* convierte texto a HTML.

#### Referencias

*Artículo de Jetpack sobre el Markdown* »» <a href="http://jetpack.me/support/markdown/" target="_blank">jetpack.me</a>

[1]: http://jetpack.me/support/markdown/ "Artículo de Jetpack sobre el Markdown"
[2]: https://elbauldelprogramador.com/ "Texto alternativo"
[3]: https://elbauldelprogramador.com/img/2013/12/favicon.ico "Título"
[4]: https://elbauldelprogramador.com/img/2013/12/favicon.ico
[5]: https://elbauldelprogramador.com/ "Imágenes enlazadas"