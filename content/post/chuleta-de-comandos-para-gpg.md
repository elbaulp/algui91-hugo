---
author: alex
categories:
- articulos
- how to
mainclass: articulos
date: '2016-01-01'
lastmod: 2017-09-25T12:37:07+01:00
description: "Si encontraste esta página, por suerte es lo que estabas buscando,  una pequeña chuleta de comandos para GPG. Si encuentras algún error, no dudes  en comentarlo."
image: 2014/04/Chuleta-de-comandos-GPG.png
url: /chuleta-de-comandos-para-gpg/
tags:
- chuleta
- gpg
title: Chuleta de comandos para GPG
---

<figure>
    <img sizes="(min-width: 400px) 400px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2014/04/Chuleta-de-comandos-GPG.png" title="Chuleta de comandos para GPG" alt="Chuleta de comandos para GPG" width="400px" height="175px"></img>
</figure>

Si encontraste esta página, por suerte es lo que estabas buscando, una pequeña chuleta de comandos para [GPG][1]. Si encuentras algún error, no dudes en comentarlo.

He usado el “**Nombre de Usuario**” como el nombre asociado a la clave. Perdón si no es muy imaginativo. Creo que GPG es bastante amplio en sus asignaciones de usuario, por ejemplo el nombre para mi clave privada es *Charles Lockhart*, pero puedo referenciarlo simplemente poniendo Lockhart.

Empecemos:

<!--more--><!--ad-->

# Crear una clave

```bash
gpg --gen-key
```

Generalmente puedes seleccionar las que vienen por defecto.

# Exportar una clave pública dentro del archivo *public.key*

```bash
gpg --export -a "Nombre de Usuario" > public.key
```

Esto creará un archivo llamado *public.key* con la representación ascii de la clave pública para Nombre de Usuario. Esto es una variación de:

```bash
gpg --export
```

el cual por sí mismo básicamente va a imprimir un montón de porquerías en tu pantalla. Recomiendo no hacerlo.

```bash
gpg --export -a “Nombre de Usuario"
```

imprime la clave pública para el ‘Nombre de Usuario’ en la línea de comandos, lo cual es medio útil para exportar una clave privada:

```bash
gpg --export-secret-key -a "Nombre de Usuario" > private.key
```

Esto creará un archivo llamado *private.key* con la representación ascii de la clave privada para ‘Nombre de Usuario’.

Es muy parecido a exportar una clave pública, pero tienes que pisar algunas protecciones que vienen por default. Hay una nota (*) al pie explicando porqué desearías hacer esto.

# Importar una clave pública

```bash
gpg --import public.key
```

Si encontraste esta página, por suerte es lo que estabas buscando
Esto agrega la clave pública en el archivo “*public.key*” a tu anillo de claves públicas.

# Importar una clave privada

```bash
gpg --allow-secret-key-import --import private.key
```

Esto agrega una clave privada en el archivo “*private.key*” a tu anillo de claves privadas. Hay una nota (*) al pie explicando porqué desearías hacer esto.

# Eliminar una clave pública (de tu anillo de claves públicas):

```bash
gpg --delete-key "Nombre de Usuario"
```

Esto elimina la clave pública de tu anillo de claves públicas.

> ¡ATENCIÓN! Si hay una clave privada en tu anillo de claves privadas asociada con esta clave pública, ¡tendrás un error! Debes primero eliminar tu clave privada para este par de claves de tu anillo de claves privadas.

# Eliminar una clave secreta (una clave de tu anillo de claves secreta)

```bash
gpg --delete-secret-key "Nombre de Usuario"
```

Esto elimina la clave secreta de tu anillo de claves secretas.

# Listar las claves de tu anillo de claves públicas

```bash
gpg --list-keys
```

# Listar las claves de tu anillo de claves secretas

```bash
gpg --list-secret-keys
```

# Generar una lista corta de números que puedes usar a través de un método alternativo para verificar la clave pública

```bash
gpg --fingerprint > fingerprint
```

Esto crea el archivo fingerprint con la información de la firma digital.

# Encriptar datos

```bash
gpg -e -u "Nombre de Usuario del Emisor" -r "Nombre de Usuario del Destinatario" somefile
```

Aquí hay algunas opciones útiles, como por ejemplo -u para especificar la clave secreta que será utilizada, y -r para especificar la clave pública del destinatario.
Como por ejemplo:

```bash
gpg -e -u "Manuel Ginobili" -r “Un amigo" mydata.tar
```

Esto debería crear un archivo llamado “*mydata.tar.gpg*” que contiene la información encriptada. Pienso que se debe especificar el nombre de usuario del emisor para que el destinatario pueda verificar que el contenido proviene de esa persona (¿Utilizando su firma digital?)

> NOTA: *mydata.tar* no se elimina, terminas teniendo dos archivos, por lo tanto si quieres tener sólo el archivo encriptado, deberás eliminar *mydata.tar* tú mismo.

Un interesante comentario al margen, encripté el patch preventivo del kernel, un archivo de 55,247 bytes, y terminé con un archivo encriptado de 15,276 bytes.

# Desencriptar datos

```bash
gpg -d mydata.tar.gpg
```

Si tienes múltiples claves secretas, el comando elegirá la correcta, o mostrará un error si la correcta no existe. Se te pedirá que ingreses tu passphrase. Luego de ello existirá el archivo “*mydata.tar*”, y el “original” encriptado, *mydata.tar.gpg*.

> NOTA: cuando originalmente escribí este borrador, era como funcionaba en mi sistema, sin embargo parece que ahora “`gpg -d mydata.tar.gpg`” vuelca el contenido del archivo a la salida standard. La forma alternativa (que funciona en mi sistema, de todos modos) sería utilizar

```bash
gpg --o archivodesalida -d archivoencriptado.gpg
```

o utilizar *mydata.tar.gpg* como por ejemplo,

```bash
gpg -o mydata.tar -d mydata.tar.gpg
```

Otra alternativa es ejecutar algo como

```bash
gpg -d mydata.tar.gpg > mydata.tar
```

y simplemente enviar la salida dentro de un archivo. Pareciera funcionar de la misma manera.

Ok, entonces si eres un paranoico y quieres encriptar alguno de tus propios archivos, para que nadie pueda entrar en tu computadora y obtenerlos, simplemente encríptalos usandote a tí mismo como el contenedor.

No he utilizado estos comandos:

```bash
gpg --edit-key
```

```bash
gpg --gen-revoke
```

- `--gen-revoke` crea un certificado de revocación, el cual es distribuido a los usuarios y los servidores de claves te dicen que tu clave ya no es más válida. Mira: <a href="http://www.gnupg.org/gph/en/manual/r721.html" target="_blank">http://www.gnupg.org/gph/en/manual/r721.html</a>.
- `--edit-key` te permite hacer una colección de operaciones con las claves. Mira: <a href="http://www.gnupg.org/gph/en/manual/r899.html" target="_blank">http://www.gnupg.org/gph/en/manual/r899.html</a>

# Compartir Claves Secretas

> NOTA: los siguientes casos de uso indican porqué los comandos `secret-key import/export` existen, o al menos un par de ideas de qué puedes hacer con ellos. SIN EMBARGO, hay un poco de logística necesaria para compartir la clave secreta. ¿Cómo la pasamos de una computadora a otra? Creo que encriptarla y enviarla por e-mail probablemente estaría bien, pero yo no la enviaría desencriptada con e-mail, esto sería PELIGROSO.

1. Caso de Uso 1: Arriba están mencionados los comandos para exportar e importar las claves secretas, y quiero explicar una razón por la cual probablemente quieras hacer esto. Básicamente si quieres un par de claves para todas tus computadoras (asumiento que tienes múltiples computadoras), entonces esto te permitirá exportar ese par de claves de la computadora original e importarla en las otras computadoras.
2. Caso de Uso 2: Arriba están mencionados los comandos para exportar e importar las claves secretas, y quiero explicar una razón por la cual probablemente quieras hacer esto. Básicamente, si perteneces a un grupo, y quisieras crear un par de clave simple para ese grupo, una persona debería crear el par de claves, luego exportar las claves pública y privada, darselas a los otros miembros del grupo y ellos deberían importar ese par. Luego un miembro del grupo o alguien afuera podría utilizar la clave pública del grupo, encriptando el mensaje y/o los datos, y enviándolo a los miembros del grupo, y todos ellos deberían poder tener acceso al mensaje y/o los datos. Basicamente, podrías crear un sistema simplificado donde sólo una clave pública es requerida para enviar cosas encriptadas a múltiples destinatarios.

# Referencias

- *Quick'n easy gpg cheatsheet* »» <a href="http://irtfweb.ifa.hawaii.edu/~lockhart/gpg/gpg-cs.html" target="_blank">Visitar sitio</a>
- [Más artículos sobre GPG](/tags/gpg)

 [1]: https://elbauldelprogramador.com/como-cifrar-correos-con-gpg-con-mailvelope/ "Cómo cifrar correos con GPG usando Mailvelope"
