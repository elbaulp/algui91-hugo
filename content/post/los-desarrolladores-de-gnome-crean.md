---
author: alex
categories:
- linux
- noticias
- opensource
date: '2016-01-01'
lastmod: 2017-07-04T20:04:59+01:00
mainclass: linux
url: /los-desarrolladores-de-gnome-crean/
title: "Los desarrolladores de GNOME crean \u201CBoxes\u201D para la virtualización"
---

<figure>
    <amp-img sizes="(min-width: 149px) 149px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" width="149" height="200" src="https://2.bp.blogspot.com/-oTy__i3px1g/TtKbNmGPIBI/AAAAAAAAB1k/Y6daIcbwi5k/s800/Boxes-d7ad4bbc04e8d56d.png"></amp-img>
</figure>

Con el aumento en el uso de máquinas virtuales y conexiones remotas, los desarrolladores de GNOME están trabajando en una nueva integración para el entorno de escritorio que llaman “<a target="_blank" href="http://zee-nix.blogspot.com/2011/11/behold-boxes.html">Boxes</a>“. El <a target="_blank" href="https://live.gnome.org/Design/Apps/Boxes">diseño</a> de estos boxes ofrece un entorno único para crear boxes que pueden ser máquinas virtuales remotas, locales o sesiones de control remoto para otras máquinas virtuales (<a target="_blank" href="http://www.h-online.com/open/news/item/Red-Hat-open-sources-Qumranet-SPICE-protocol-882801.html">SPICE protocol</a>). Los desarrolladores han estado trabajando en una implementación para los Boxes basada en <a target="_blank" href="https://live.gnome.org/Vala">Vala</a>. Ahora han anunciado su <a target="_blank" href="http://ftp.gnome.org/pub/GNOME/sources/gnome-boxes/3.3/">primer lanzamiento</a> junto con un screencast mostrando las capacidades de la aplicación:

<!--more--><!--ad-->

El desarrollador Zeeshan Ali Khattak (aka Zeenix) explica en una <a target="_blank" href="http://zee-nix.blogspot.com/2011/11/behold-boxes.html">entrada del blog</a> que, aunque los desarrolladores ya usan <a target="_blank" href="http://virt-manager.org/">virt-manager</a>, que cubre las necesidades de un administrador de sistemas a nivel empresarial, había una necesidad de crear una virtualización y una aplicación de control remoto para los usuarios más comunes, y que esa necesidad podría solucionarse con la creación de Boxes. Debido a que el proyecto está todavía en una fase muy primaria de desarrollo, hay muchos errores - el más grave actualmente el la falta de soporte para disquetes en Qemu. Por otra parte, con la nueva interfaz gráfica, los usuarios pueden crear y eliminar máquinas virtuales o sistemas de conexión remota de una manera simple. Los desarrolladores están buscando ayuda para trabajar en la interfaz y para mejorar las librerías de C, libosinfo y libvirt-glib, que son en las librerías en las que se basa el proyecto. A ellos les gustaría, por ejemplo, ayudar en la creación de una API para configurar mediante XML libvirt

Traducción de : <a target="_blank" href="http://www.h-online.com/open/news/item/GNOME-developers-create-Boxes-for-virtualisation-1383765.html">h-online.com</a>
