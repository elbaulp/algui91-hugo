---
author: alex
categories:
- abap
color: '#E64A19'
description: "El lenguaje de programaci\xF3n ABAP (antiguamente ABAP/4) es un lenguaje
  propio del ERP SAP y su uso s\xF3lo se puede entender a trav\xE9s de este software
  empresarial. En un principio, SAP era sin\xF3nimo de ERP. Sin embargo, en la actualidad
  SAP comprende un paquete mucho m\xE1s amplio de herramientas. Por supuesto, el ERP
  sigue siendo el n\xFAcleo del negocio de SAP, pero su cartera se ido ampliando con
  otros productos como CRM (customer relationship management), SCM (Supply Chain Management)
  y SRM (Supplier Relationship Management) entre otros."
image: 2014/03/SAP-Apariencia.png
lastmod: 2015-12-25
layout: post.amp
mainclass: dev
permalink: /introduccion-abap/
tags:
- curso ABAP
- "programaci\xF3n ABAP"
- que es ABAP
title: "Introducci\xF3n a ABAP"
---

*Éste artículo es una colaboración de <a href="http://www.blogdesap.com/" title="Blog de SAP" target="_blank">Óscar Arranz</a>*

## Qué es ABAP

El lenguaje de programación ABAP (antiguamente ABAP/4) es un lenguaje propio del ERP SAP y su uso sólo se puede entender a través de este software empresarial. En un principio, SAP era sinónimo de ERP. Sin embargo, en la actualidad SAP comprende un paquete mucho más amplio de herramientas. Por supuesto, el ERP sigue siendo el núcleo del negocio de SAP, pero su cartera se ido ampliando con otros productos como CRM (customer relationship management), SCM (Supply Chain Management) y SRM (Supplier Relationship Management) entre otros.

Como lenguaje de programación propietario de SAP, ABAP se ha utilizado y se utiliza como elemento de programación específico para la mayor parte de sus productos. Literalmente las siglas ABAP significan *Advanced Business Application Programming* y tiene muchos elementos en común con el lenguaje C. Originalmente fue definido como un lenguaje estructurado de cuarta generación (de ahí el antiguo nombre de ABAP/4), posteriormente ha incorporado elementos propios de lenguajes orientados a objetos.

<!--more--><!--ad-->
<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2014/03/SAP-Apariencia.png" alt="SAP-Apariencia" width="979px" height="602px" />

## Características del lenguaje ABAP

### Como lenguaje estructurado

  * Contiene sentencias y palabras clave propias del lenguaje.
  * Es un lenguaje orientado a eventos bien definidos.
  * Es interpretado, no compilado.
  * Se utiliza tanto en programación de informes como en programación de diálogo para SAP.
  * Se encuentra completamente integrado dentro del entorno de desarrollo de SAP.

### Como lenguaje orientado a objetos contiene

  * Objetos.
  * Clases.
  * Atributos.
  * Métodos
  * Interfaces.

Se podría decir que ABAP se comporta como lenguaje de cuarta generación y como lenguaje orientado a objetos a la vez dentro de SAP. Muchas veces es difícil ver las diferencias.

## Para qué sirve el lenguaje ABAP

Los usuarios interactúan con SAP a través de transacciones. Estas transacciones representan procesos y funcionalidades propias del negocio de las empresas que instalan SAP.

ABAP es el lenguaje utilizado por programadores ABAP para crear nuevas transacciones que no existen en el estándar de SAP. Pero también sirve para ampliar transacciones que ya existen en el estándar cuando la funcionalidad que proveen es insuficiente para su negocio. Ya que SAP está programado en ABAP, todas las funciones complementarias al estándar se han de programar también en ABAP mediante alguna de las formas que SAP permite&#8230; user exits, BADIs, enhancements, BTEs&#8230;

## El entorno de desarrollo ABAP

Dentro de SAP, el lenguaje ABAP posee su propio entorno de desarrollo denominado *ABAP Workbench*. Este entorno no es más que un conjunto de transacciones necesarias para poder programar ABAP, todas ellas agrupadas bajo un área común.

Algunas de las transacciones más importantes dentro del *ABAP Workbench* son:

### SE11 - Diccionario de datos

Bajo la transacción SE11 se agrupan las herramientas necesarias para la creación, mantenimiento y ampliación de objetos de la base de datos. Tablas, estructuras, elementos de datos, dominios, etc. Se generan a través del diccionario de datos. Pero también nos permite visualizar el contenido de las diferentes tablas del sistema tanto aquellas creados por nosotros como los que son propiedad de SAP.

### SE38 - Editor ABAP

Es la herramienta básica de programación. Permite la programación de informes y del código asociado a pantallas de diálogo. También nos permite realizar ampliaciones de contenido sobre el código propietario de SAP.

### SE51 - Screen painter

Es la herramienta utilizada en la creación y desarrollo de pantallas de diálogo en SAP. Sin embargo, la programación ABAP de la estructura de pantallas se realiza conjuntamente con el editor ABAP.

### SE80 - Object Navigator

Agrupa todas o casi todas las transacciones de desarrollo ABAP en una sola transacción. Nos permite trabajar a la vez con diferentes herramientas de programación bajo un área común.

<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2014/03/SAP-SE80-Object-Navigator.png" alt="SAP-SE80-Object-Navigator" width="983px" height="604px" />

### SE09/STMS - Sistema gestor de transportes

El desarrollo en ABAP se realiza sobre un entorno de desarrollo al cual sólo tienen acceso los programadores y consultores. Éste se encuentra separado del entorno productivo en el cual trabajan los usuarios del ERP. Así pues, todo nuevo desarrollo o ampliación se debe mover al entorno productivo a través de un sistema que comunique todos los entornos. Éste sistema es el gestor de transportes y las transacciones SE09 y STMS son sus transacciones más conocidas.

Finalmente, hay que decir que el *ABAP workbench* es propio de SAP pero últimamente SAP también permite programar ABAP mediante herramientas no propietarias de SAP, sobre todo con *Eclipse*. Sin embargo, con estas plataformas se pierde mucha de la funcionalidad propia del *ABAP Workbench*.
