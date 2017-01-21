---
author: alex
categories:
- noticias
color: '#2196F3'
lastmod: 2016-08-15
layout: post.amp
mainclass: linux
permalink: /grub-customizer-20-personaliza-tu-grub2/
title: Grub Customizer 2.0, personaliza tu GRUB2
---

Los desarrolladores de [Grub Customizer][1] **han lanzado la versión 2.0 de esta herramienta** para personalizar el aspecto y funcionamiento de nuestro gestor de arranque, algo que es bastante molesto desde la entrada de GRUB2 y que ahora se hace mucho más cómodo con esta solución.

<figure>
    <amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" title="Grub-customizer0" src="https://4.bp.blogspot.com/_IlK2pNFFgGM/TOpPJrxOdBI/AAAAAAAAAFk/RWhgQykL8wo/s1600/Grub-customizer0-500x321.jpg" alt="Grub customizer"></amp-img>
</figure>

Como revelan en [WebUpd8][2] y otras webs, **hay bastantes mejoras en Grub Customizer 2.0**. Entre ellas, la posibilidad de seleccionar la entrada por defecto que está seleccionada para arrancar, además de cambiar la visibilidad del menú, el tiempo límite de interacción, o el establecimiento de parámetros del núcleo.

Además en el caso de GRUB2 hay algunas características especiales como **cambiar los colores del menú o la imagen de fondo**. Para instalar la aplicación en Ubuntu podéis hacer lo siguiente:

```bash
sudo add-apt-repository ppa:danielrichter2007/grub-customizer
sudo apt-get updatesudo
apt-get install grub-customizer
```

Y a partir de ahí podréis lanzar la aplicación desde terminal o con el menú **Aplicaciones/Herramientas de Sistema/Grub Customizer**.

Para otras distros Linux basta con descargar [Grub Customizer en Launchpad][3], algo para lo que, cuidado, **necesitaréis tener instalado BZR**.

## Fuente: <a href="http://www.muylinux.com/2010/11/22/grub-customizer-2-0-personaliza-tu-grub2" target="_blank"> MuyLinux.com </a>

 [1]: https://launchpad.net/grub-customizer
 [2]: http://www.webupd8.org/2010/11/grub-customizer-20-can-change-default.html
 [3]: https://code.launchpad.net/grub-customizer