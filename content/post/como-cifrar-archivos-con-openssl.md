---
author: alex
categories:
- administracion de servidores
- seguridad
date: '2016-01-01'
lastmod: 2017-03-09T17:22:15+01:00
description: "Las copias de seguridad son algo que debemos tener a buen resguardo  por si algún dia le ocurre algo a nuestros datos. Si bien lo anterior es cierto,  de igual modo hemos de tener bien protegidas éstas copias de seguridad para que  no puedan ser usadas por terceros de caer en manos maliciosas. Hoy veremos cómo  cifrar archivos con openssl."
image: 2012/11/Apps-preferences-desktop-cryptography-icon1.png
mainclass: servidores
url: /como-cifrar-archivos-con-openssl/
tags:
- cifrar copias de seguridad con openssl
- cifrar tar con openssl
- comandos openssl
- openssl
- cifrar
title: "Cómo cifrar archivos con openssl"
---

<figure>
          <amp-img
            on="tap:lightbox1"
            role="button"
            tabindex="0"
            layout="responsive"
            src="/img/2012/11/Apps-preferences-desktop-cryptography-icon1.png"
            alt="Cómo cifrar archivos con openssl"
            title="Cómo cifrar archivos con openssl"
            sizes="(min-width: 256px) 256px, 100vw"
            width="256"
            height="256">
          </amp-img>
</figure>

Las copias de seguridad son algo que debemos tener a buen resguardo por si algún dia le ocurre algo a nuestros datos. Si bien lo anterior es cierto, de igual modo hemos de tener bien protegidas éstas copias de seguridad para que no puedan ser usadas por terceros de caer en manos maliciosas. Hoy veremos cómo **cifrar archivos con openssl**.

<!--more--><!--ad-->

# Generar las claves públicas y privadas

Al igual que en [GPG][1], necesitaremos generar un par de claves, pública y privada, para poder cifrar archivos con openssl:

```bash
$ openssl genrsa -out clave.pem 4096
$ openssl rsa -in clave.pem -out clave.pub.pem -outform PEM -pubout

```

Con el primer comando generamos la clave, en *clave.pem* se encuentran tanto la clave privada como la pública, con el segundo comando extraemos la pública a un archivo distinto.

# Método elegido para cifrar los archivos

El sistema de claves pública/privada no puede cifrar archivos de gran tamaño. Por tanto usaremos un <a href="http://es.wikipedia.org/wiki/Criptograf%C3%ADa_sim%C3%A9trica" target="_blank">cifrado simétrico</a> para el cifrado normal. Cada vez que cifremos un fichero se usará una clave simétrica generada aleatoriamente. Esta clave simétrica es la que **cifraremos de forma <a href="http://es.wikipedia.org/wiki/Criptograf%C3%ADa_asim%C3%A9trica" target="_blank">asimétrica</a>** con la **llave pública** que hemos generado con los comandos de arriba. En resumen:

## Para cifrar los archivos

  1. Generamos una clave aleatoriamente, de gran longitud (40-50 caracteres por ejemplo).
  2. Ciframos el archivo con la clave generada en 1.
  3. Ciframos la clave generada en 1 con nuestra clave pública.

## Para descifrar los archivos

  1. Desciframos la clave generada en 1 y cifrada con la llave pública en 3
  2. Desciframos el archivo con la clave que acabamos de descifrar en 1

# Aplicar los pasos con openssl

Ahora procedemos a aplicar los pasos descritos anteriormente con openssl:

## Cifrando los archivos

```bash
# Paso 1, generar clave aleatoria
$ openssl rand -base64 48 -out key.txt
# Paso 2, cifrar el archivo con la clave simétrica
$ openssl enc -aes-256-cbc -pass file:key.txt -in archivoSINcifrar -out archivoCIFRADO.encrypted
# Paso 3, cifrar la clave generada en el paso 1 con la llave pública
$ openssl rsautl -encrypt -in key.txt -out key.enc -inkey clave.pub.pem -pubin

```

Los argumentos significan:

  * **enc -aes-256-cbc:** Tipo de cifrado simétrico.
  * **-pass file:key.txt:** La clave con la que cifrar el archivo.
  * **-in:** Fichero de entrada.
  * **-out:** Fichero de salida.
  * **rsautl:** Indica que vamos a usar RSA para firmar, verificar, cifrar o descifrar.
  * **-encrypt:** Encriptar el fichero de entrada con una llave RSA pública.
  * **-inkey:** Llave con la que cifrar
  * **-pubin:** Indica que vamos a firmar con una llave pública.

## Descifrado de archivos

```bash
# Paso 1, desciframos la clave generada en 1 y cifrada con la llave pública en 3
$ openssl rsautl -decrypt -inkey ./clave.pem -in key.enc -out key.txt
# Paso 2, Descifrar el archivo con la clave
$ openssl enc -aes-256-cbc -d -pass file:key.txt -in archivoCIFRADO.encrypted -out archivoSINcifrar

```

Donde:

  * **-d:** Descifra los datos de entrada.

# Script para descifrar varios archivos de una vez

Como suele ser habitual, los [scripts bash][2] nos facilitan las tareas repetitivas, con los comandos de arriba, es trivial escribir un **script** que automatize el proceso de descrifrar todos los archivos de un directorio:

```bash
#/bin/bash

if [ $# -ne 1 ]; then
    echo "Usage: $0 <directorio a="a" los="los" archivos="archivos" cifrados="cifrados">"
    exit
fi

openssl rsautl -decrypt -inkey ./clave.pem -in "$1/key.enc" -out "$1/key.txt"
echo "openssl rsautl -decrypt -inkey ./clave.pem -in \"$1/key.enc\" -out \"$1/key.txt\""

OIFS="$IFS"
IFS=$'\n'


for i in `find $1 -type f -name "*.encrypted"`
do
    echo "Decrypting $1/$i"
    openssl enc -aes-256-cbc -d -pass file:"$1/key.txt" -in "$i" -out $1/$(basename "$i" .encrypted)
done

IFS="$OIFS"
```

Espero que os sea de utilidad.

# Referencias

- *Encrypt tar.gz file on create* »» <a href="http://askubuntu.com/questions/95920/encrypt-tar-gz-file-on-create/96182#96182" target="_blank">askubuntu.com</a>
- *how to encrypt a large file in openssl using public key* »» <a href="http://stackoverflow.com/questions/7143514/how-to-encrypt-a-large-file-in-openssl-using-public-key" target="_blank">stackoverflow.com</a>
- *Documentación oficial de openssl* »» <a href="http://www.openssl.org/docs/apps/openssl.html" target="_blank">Visitar sitio</a>



 [1]: https://elbauldelprogramador.com/editar-y-crear-archivos-cifrados-con-gpg-en-vim/
 [2]: https://elbauldelprogramador.com/
