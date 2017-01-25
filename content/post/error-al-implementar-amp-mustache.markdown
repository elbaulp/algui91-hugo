---
author: alex
categories:
- dev
color: '#E64A19'
date: 2016-07-30 16:27:54
description: "C\xF3mo implementar correctamente amp-mustache y evitar errores en Jekyll"
image: error-al-implementar-amp-mustache.png
introduction: null

mainclass: dev
modified: null
tags:
- amp-mustache
- amp-pages
- error amp-mustache
title: "C\xF3mo solucionar errores Al Implementar Amp-mustache"
---

# Amp-mustache da error al sustituir las etiquetas #

Intentando implementar la etiqueta `amp-mustache` para el blog encontré muchos problemas, la idea era usar una plantilla para que fuera rellenada desde un [json](/como-mapear-json-a-objetos-java-con-jackson-objectmapper/ "Cómo mapear json a objetos Java con jackson ObjectMapper"). El código era bastante simple:

<!--more--><!--ad-->

```html
  <amp-list
     id="popular-posts"
     width=300
     height=300
     layout=responsive
     src="/assets/popular.json">
    <template type="amp-mustache">
      <a class="card related"
         id="{% raw %}{{id}}{% endraw %}"
         href={% raw %}{{url}}{% endraw %}>
        <amp-img width="101"
                 height="75"
                 src="{% raw %}}{% endraw %}"></amp-img>
        <span>{% raw %}{{title}}{% endraw %}</span>
      </a>
    </template>
   </amp-list>
```

El problema era que por alguna razón las etiquetas `{% raw %}{{url}}, {{title}}, ...{% endraw %}` no eran sustituidas por los valores del json, que era el siguiente:

```json
{
    "items": [
        {
            "title": "QuÃ© es un NullPointerException y cÃ³mo solucionarlo",
            "thumbnail": "/img/2014/05/Qu%C3%A9-es-un-NullPointerException-y-c%C3%B3mo-solucionarlo.png",
            "id": "pop1",
            "url": "/que-es-un-nullpointerexception-y-como-solucionarlo/"
        },
        {
            "title": "Mini tutorial y chuleta de comandos para Git",
            "thumbnail": "/img/2013/03/git-logo.png",
            "id": "pop2",
            "url": "/mini-tutorial-y-chuleta-de-comandos-git/"
        },
        {
            "title": "Buenas prÃ¡cticas para el DiseÃ±o de una API RESTful PragmÃ¡tica",
            "thumbnail":"/img/2014/01/201305-xml-vs-json-api.png",
            "id": "pop3",
            "url": "/buenas-practicas-para-el-diseno-de-una-api-restful-pragmatica/"
        },
        {
            "title": "Â¿Cual es la diferencia entre los distintos formatos de audio, y cual deberÃ­a elegir?",
            "thumbnail": "/img/2012/07/original1.jpg",
            "id": "pop4",
            "url": "/cual-es-la-diferencia-entre-los-distintos-formatos-de-audio-y-cual-deberia-elegir/"
        }

    ]
}
```

# Solucionar error de amp-mustache en Jekyll #

Tras pelearme una mañana entera intentando resolver el error que me mostraba la consola de AMP:

```javascript
Missing URL for attribute 'src' in tag 'a'.
```



Me di cuenta de que el error residía en _jekyll_, ya que este usa etiquetas de liquid, que son iguales que las usadas en amp-mustache. Es decir, `{% raw %}{{url}}{% endraw %}` estaba siendo parseado por _Jekyll_ y cuando llegaba a `amp-mustache` ya estaba consumido. La solución es fácil, decirle a _jekyll_ que no interprete las etiquetas con `{% raw %}{% raw %}{{ etiqueta }}{% endraw %}{{ "{% endraw " }}%}`. Por tanto el código necesario es el siguiente:


```html
<amp-list
    id="popular-posts"
    width=300
    height=300
    layout=responsive
    src="/assets/popular.json">
        <template type="amp-mustache">
            <a class="card related"
               id="{% raw %}{% raw %}{{ id }}{% endraw %}{{ "{% endraw " }}%}"
               href="{% raw %}{% raw %}{{ url }}{% endraw %}{{ "{% endraw " }}%}">
               <amp-img width="101"
                        height="75"
                        src="{% raw %}{% raw %}{{ thumbnail }}{% endraw %}{{ "{% endraw " }}%}"></amp-img>
                    <span>{% raw %}{% raw %}{{ title }}{% endraw %}{{ "{% endraw " }}%}</span>
            </a>
        </template>
</amp-list>
```

Así ya todo funciona correctamente, espero haberos ayudado.
