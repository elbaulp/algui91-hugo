---
author: alex
categories:
- dev
- how to
mainclass: dev
date: 2016-05-23 12:40:25
lastmod: 2017-10-07T12:05:31+01:00
description: "Hoy quiero hablar de algo que llevo usando desde hace ya mucho tiempo  en mi terminal. Se trata de dos tipos de Prompts para bash. La primera de ellas  es una general, que se mostrará siempre que tengamos el terminal abierto. La  segunda se mostrará cuando nos encontremos en una carpeta que contenga un repositorio  git. \xC9sto es lo realmente interesante, ya que el prompt nos mostrará información  del estado del repositorio, lo cual a mi me resulta bastante útil. Comencemos instalando el primero, Rainbow bash"
image: Mostrar-Informacion-De-Un-Repositorio-Git-en-El-Prompt-De-Bash.jpg
tags:
- git
- github
title: "Cómo mostrar información de un repositorio Git en el prompt de tu terminal"
---

<figure>
    <a href="/img/Mostrar-Informacion-De-Un-Repositorio-Git-en-El-Prompt-De-Bash.jpg"><img sizes="(min-width: 823px) 823px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/Mostrar-Informacion-De-Un-Repositorio-Git-en-El-Prompt-De-Bash.jpg" title="Cómo mostrar información de un repositorio Git en el prompt de tu terminal" alt="Cómo mostrar información de un repositorio Git en el prompt de tu terminal" width="823px" height="518px" /></a>
    <span class="image-credit">Crédito de la imagen: <a href="https://github.com/arialdomartini/oh-my-git" target="_blank" title="Repo Oh my Git">Repo Oh my Git</a></span>
</figure>


Hoy quiero hablar de algo que llevo usando desde hace ya mucho tiempo en mi terminal. Se trata de dos tipos de _Prompts_ para bash. La primera de ellas es una general, que se mostrará siempre que tengamos el terminal abierto. La segunda se mostrará cuando nos encontremos en una carpeta que contenga un [repositorio git](/git "Tutoriales sobre Git"). Ésto es lo realmente interesante, ya que el _prompt_ nos mostrará [información del estado del repositorio](https://elbauldelprogramador.com/mini-tutorial-y-chuleta-de-comandos-git/ "Chuleta de comandos Git")  , lo cual a mi me resulta bastante útil. Comencemos instalando el primero, “_Rainbow bash_”:

<!--more--><!--ad-->

# Rainbow Bash

Con este _prompt_ disponemos de iconos y varios temas a elegir. Los pasos de instalación se pueden seguir en el repositorio original, pero básicamente es ejecutar esto:

```bash
git clone https://github.com/slok/rainbow-bash.git $HOME/.rainbow-bash
```

Y añadir al `.bashrc` lo siguiente:

```bash
# Prompt
RBW_PATH=$HOME/.rainbow-bash
source $RBW_PATH/init.sh
rbw_load_theme simple
```

## Temas

_Rainbow Bash_ tiene varios temas a elegir, para cambiarlos basta con modificar la línea

```bash
rbw_load_theme simple
```

Con el nombre del tema deseado, a alegir entre (_Regular, Hacker, Minimal, Simple, Arrow y Video_), puedes verlos en [su página de github](https://github.com/slok/rainbow-bash/tree/master/themes).

# Oh My Git

Ahora viene la parte a mi parecer más útil del _prompt_, instalaremos _Oh My Git_.

## Preparación de la fuentes con iconos

Antes de empezar es necesario instalar las fuentes necesarias para tener disponibles los iconos de _FontAwesome_, hay dos alternativas, instalar una fuente que traiga los iconos metidos a mano (_Patched font_) o usar una estrategia _Fallback_. Por más que intenté seguir el segundo método, no lo conseguí y terminé usando una fuente parcheada. Si alguien consigue instalar las fuentes siguiendo el segundo método, es bienvenido de comentarlo y actualizo el artículo.

## Instalar las fuentes parcheadas

Primero descargamos los ficheros del repositorio [awesome terminal Fonts](https://github.com/gabrielelana/awesome-terminal-fonts), como vamos a usar la estrategia de fuentes parcheadas, simplemente copiamos las fuentes de la carpeta `patched` a la carpeta de fuentes del sistema y cambiamos el tipo de fuente usada por nuestra terminal a una de ellas. Yo por ejemplo uso _Source Code Pro_.

## Instalar Oh My Git

Ya solo resta instalar Oh My Git, es tan simple como descargar el repositorio:

```bash
git clone https://github.com/arialdomartini/oh-my-git.git ~/.oh-my-git
```

Y añadir a nuestro `.bash_aliases`:

```bash
source ~/.oh-my-git/prompt.sh
```

A partir de ahora, al meternos en una carpeta con un repositorio git dentro, deberíamos ver lo siguiente:

<figure>
    <a href="/img/ohmygitprompt.png"><img sizes="(min-width: 527px) 527px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/ohmygitprompt.png" title="Cómo mostrar información de un repositorio Git en el prompt de tu terminal" alt="Cómo mostrar información de un repositorio Git en el prompt de tu terminal" width="527px" height="39px" /></a>
</figure>

## Volver a nuestro prompt por defecto

Si cuando nos salgamos del repositorio queremos volver a nuestro _prompt_, el que elegimos en _Rainbow Bash_ por ejemplo, basta con modificar `bashrc` o `bash_aliases`, en función de dónde tengáis vuestra configuración, al lo siguiente:

```bash
source ~/.oh-my-git/prompt.sh

RBW_PATH=$HOME/.rainbow-bash
source $RBW_PATH/init.sh

PS1="$RBW_THEME_SIMPLE" # Tema elegido de Rainbow Bash
omg_ungit_prompt=$PS1 # Volvemos al prompt original si no estamos en un repo
```

# Conclusión

A mi personalmente me resulta muy útil esta configuración de _prompts_, espero que a vosotros también. No dudéis en comentar!

Un saludo.

# Referencias

- _Repositorio Oh My Git_ \| [github.com/arialdomartini/oh-my-git](https://github.com/arialdomartini/oh-my-git "Repo Oh my Git")
- _Repositorio Rainbox Bash_ \| [github.com/slok/rainbow-bash](https://github.com/slok/rainbow-bash "Repositorio Rainbox Bash")
- _Repositorio Awesome Terminal Fonts_ \| [github.com/gabrielelana/awesome-terminal-fonts](https://github.com/gabrielelana/awesome-terminal-fonts "Repositorio Awesome Terminal Fonts")
