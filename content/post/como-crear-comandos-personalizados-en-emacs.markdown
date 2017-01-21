---
author: alex
categories:
- dev
color: '#E64A19'
date: 2016-08-25 15:01:15
description: "En este art\xEDculo veremos c\xF3mo crear comandos que usemos habitualmente
  en emacs, asoci\xE1ndolos a una funci\xF3n para su posterior uso."
image: como-crear-comandos-personalizados-en-emacs.png
introduction: "Si usas mucho un comando en emacs, descubre como asociarlo a una funci\xF3n
  para usarlo m\xE1s r\xE1pido"
layout: post.amp
mainclass: dev
tags:
- emacs
- regex
title: "C\xF3mo Crear Comandos Personalizados en Emacs"
---

Hace unos meses que comencé a usar _emacs_ como editor predeterminado, y la verdad es que una vez me acostumbré a él es bastante cómodo. Sin embargo, editando artículos del blog, me encontraba ejecutando una y otra vez el mismo comando, o comandos similares. Así que busqué la forma de asociarlos a una función para no tener que andar escribiendolos cada dos por trés. Veamos cómo crear estas funciones.


## La función (query-replace-regexp)

Una función que uso mucho en _emacs_ es `(query-replace-regexp)`, la cual permite buscar y reemplazar un texto en base a una [expresión regular](/tags/regex "Posts etiquetados con regex").

<!--more--><!--ad-->

> En este blog ya hemos tratado este tema en varias ocasiones (_Véase [Expresiones regulares multilínea](/expresiones-regulares-multilinea/ "Crear expresiones regulares multilínea") o [una introducción a las expresiones regulares en Python](/introduccion-a-las-expresiones-regulares-en-python/ "Expresiones regulares en python")_).

Si como yo, te encuentras repitiendo este comando una y otra vez, con los mismos argumentos, es posible guardarlo en una función y simplemente ejecutarla escribiendo su nombre.

Supongamos que queremos guardar la siguiente acción:

```elisp
(query-replace-regexp "\\([A-Z]\\{3,\\} ?[A-Z]+\\)" "`\\1`")
```

La cual he estado usando mucho para pasar palabras en mayúsculas a código en línea en _markdown_. Esto lo he estado haciendo para todos los comandos que aparecen en los artículos del [curso de base de datos](/bases-de-datos/ "Curso base de datos"). Bien, para guardar el comando basta con añadir lo siguiente al fichero `init.el` de emacs:

> __NOTA__: Hay que escapar la `\` en la expresión regular, por eso aparecen dobles `\\`.

```elisp
;; Hacer inline codigo en markdown
(defun to-inline-code ()
  (interactive)
  (query-replace-regexp "\\([A-Z]\\{3,\\} ?[A-Z]+\\)" "`\\1`"))
```

A partir de ahora, para ejecutar `(query-replace-regexp)` con esos parámetros, solo hay que llamar a la función `to-inline-code()`. Esto se puede hacer con la combinación de teclas `M-x <función>`, en este caso `M-x to-inline-code`.

## La función (query-replace)

Esta función es similar a la de arriba, pero más simple. No acepta _expresiones regulares_. Concretamente, para lo que más uso esta función es para eliminar el dominio del blog (`http://elbauldelprogramador.com/`) de los enlaces en los artículos, de forma que un enlace:

```
[Enlace](http://elbauldelprogramador.com/algun-post/ )
```

pase a ser

```
[Enlace](/algun-post/ )
```

De igual forma, para asociarla a una función, añadimos lo siguiente al `init.el`

```elisp
;; Borra uri
(defun delbaul ()
  (interactive)
  (query-replace "https://elbauldelprogramador.com" ""))
```

## Conclusiones

Eso es todo, espero que os sea de ayuda. ¿Qué otras funciones te resulta útiles en _emacs_? Déjanos un comentario.

## Referencias

- How to define an Emacs command to `query-replace-regexp` using a specific regexp \| [stackoverflow.com](http://stackoverflow.com/questions/39040092/how-to-define-an-emacs-command-to-query-replace-regexp-using-a-specific-regexp "How to define an Emacs command to `query-replace-regexp` using a specific regexp")
