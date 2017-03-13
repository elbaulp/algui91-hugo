---
author: alex
categories:
- administracion de servidores
- articulos
- internet
date: '2016-01-01'
image: 2013/04/dns.jpg
lastmod: 2017-03-13T16:05:49+01:00
mainclass: servidores
url: /como-configurar-un-servidor-dns2/
tags:
- A records
- bind
- bind tutorial dns
- CNAME
- como crear dns localhost
- crear servidor dns
- como montar servidor dns
- como crear una zona primaria en dns
- configura un servidor dns
- "configuraci\xF3n de servidores"
- configuracion dns servidor dedicado
- configuracion refresco zona dns
- configuracion servidor dns
- configurar dns
- configurar servidor dns
- debian
- implementar servidor dns en debian
- MX records
- named.conf
- servidor debian
- servidor dns
- servidor dns debian
- servidores dns
- soa correo
- DNS
- servidor
title: "C\xF3mo configurar un servidor DNS - Parte 2 (La Zona Primaria)"
---

<figure>
        <a href="/img/2013/04/dns.jpg">
          <amp-img
            on="tap:lightbox1"
            role="button"
            tabindex="0"
            layout="responsive"
            src="/img/2013/04/dns.jpg"
            alt=""C\xF3mo configurar un servidor DNS - Parte 2 (La Zona Primaria)"
            title=""C\xF3mo configurar un servidor DNS - Parte 2 (La Zona Primaria)"
            sizes="(min-width: 450px) 450px, 100vw"
            width="450"
            height="361">
          </amp-img>
        </a>
</figure>

* [Cómo configurar un servidor DNS - Parte 1 (Introducción)][1]
* Cómo configurar un servidor DNS - Parte 2 (La Zona Primaria)
* [Cómo configurar un servidor DNS - Parte 3 (Zona Inversa y DNS secundario)][2]

Siguiendo con los artículos de cómo configurar un servidor DNS. En el anterior artículo dejamos pendiente echar un vistazo al archivo **named.conf.local**, que contiene información sobre los dominios que serán resueltos por el servidor DNS. Veamos el contenido:

```bash
zone "elbauldelprogramador.com" {
        type master;
        allow-transfer {DNS_SECUNDARIO;};
        file "/etc/bind/pri.elbauldelprogramador.com";
};
```

El contenido de **/etc/bind/pri.elbauldelprogramador.com**:

```bash
$TTL        3600
@       IN      SOA     ks3277174.kimsufi.com. correo.electronico.com. (
                        2013011703       ; serial, todays date + todays serial #
                        7200              ; refresh, seconds
                        540              ; retry, seconds
                        604800              ; expire, seconds
                        86400 )            ; minimum, seconds
;

elbauldelprogramador.com. 3600 A        5.39.89.44
elbauldelprogramador.com. 3600      MX    10   mail.elbauldelprogramador.com.
elbauldelprogramador.com. 3600      NS        ks3277174.kimsufi.com.
elbauldelprogramador.com. 3600      NS        ns.kimsufi.com.
mail 3600 A        5.39.89.44
www 3600 A        5.39.89.44
```

**SOA** es el acrónimo para *“Start Authority”*. Si recuerdas la figura 1 del artículo anterior, recordarás que DNS es una base de datos distrubuida. Comenzando en los root servers, las peticiones se van desplazando hasta llegar a su destino, en este caso, hasta llegar al servidor DNS que estamos configurando. Por esa razón, en el fichero de zona es necesario indicar dónde comienza su autoridad(*authority*). Ésta autoridad comienza precisamente en el fichero de zona. Los servidores **TLD** (*Top Level Domain ó Dominios de primer nivel*) esperan del servidor DNS que realice su parte del trabajo.

El registro **SOA** consta de varios campos. Es necesario proporcionar datos a esos campos para que otros servidores en internet puedan llevar a cabo sus peticiones. Los campos son:

<!--more--><!--ad-->

# Nombre

Define el nombre principal de la zona. El *@* es una abreviatura a la zona actual, es decir, para */pri.elbauldelprogramador.com* en este ejemplo. El nombre del servidor maestro para esta zona es ks3277174.kimsufi.com. Esto significa que en el archivo *named.conf* existe una entrada que apunta y este archivo vuelve apunta a su vez a la entrada en el archivo de configuración.

# Clase

Existen varios tipos de clases DNS. En nuestro caso solo se usará la clase *IN* o *Internet*, usadas para definir el mapeo entre la dirección IP y *BIND*.

# Tipo

El tipo de registro para el recurso DNS, en el ejemplo de arriba, el tipo es *SOA*.

# Nombre del servidor

Nombre completo del servidor de nombres primario. Debe acabar en un punto.

# Dirección de correo

Dirección de correo de la persona responsable del dominio. Nota cómo se sustituye el símbolo @ por un punto.

# Número de serie

Normalmente tiene el formato *YYYYMMDD* con dos dígitios más al final que indican el número de serie del día. El número de serie es útil para indicarle a servidor DNS secundario cuando debe actualizarse. Si el servidor esclavo al comprobar el número de serie ha cambiado, realizará una trasnferencia de zona (**zone transfer**).

# Refresh o actualización

En este campo indica al servidor DNS esclavo o secundario con qué frecuencia debería comprobar el estado del maestro. El valor está representado en segundos. En cada ciclo de refresco, el esclavo realiza la comprobación para saber cuando es necesaria una transferencia de zona (**zone transfer**). En el ejemplo el valor es 7200

# Retry o reintento

Frecuencia con la que el esclavo debería conectarse al maestro en caso de una conexión fallida.

# Expiry o expiración

Cantidad total de tiempo en la que el esclavo debería reintentar ponerse en contacto con el maestro antes de que expiren los datos que contiene. Referencias futuras serán dirigidas a los servidores root.

# TTL mínimo

Este campo define el tiempo de vida (*Time To Live*) para el dominio en segundos. Sirve para responder a peticiones de subdominios que no existen en los registros. Cuando esté configurado, el servidor DNS responderá con una respuesta del tipo **no domain** o **NXDOMAIN**. Dicha respuesta será cacheada. El TTL establece la duración del cacheo para la respuesta.

Después de estos campos, se especifican los servidores de nombres para el dominio. **NS** es el acrónimo de **Name Server**. Como se ha visto un poco más arriba, el servidor de nombres principal del ejemplo es *ks3277174.kimsufi.com*. También se define el sevidor DNS secundario o esclavo, en este caso *ns.kimsufi.com*.

Además de los registros *NS*, se definen los registros **MX**, que identifican el servidor de correo para el dominio, el número 10 define la prioridad del servidor de correo. Así como el registro de tipo **A**, que asocia un nombre a una dirección ip.

En el ejemplo existe un único registro **MX**, pero puede haber más. Por ejemplo:

```bash
MX 10 mail.elbauldelprogramador.com.
MX 20 mail.otrodominio.com.
```

Si se envia un email al dominio, el servidor de correo que envía el email intenta conectarse a *mail.elbauldelprogramador.com* ya que tiene prioridad 10, si no puede establecer conexión, lo intentará con *mail.otrodominio.com*.

El último tipo de registro que vamos a ver es el de tipo **CNAME** (*Canonical Name*). Se suele referir a ellos como registros alias del tipo **A**. Por ejemplo:

```bash
ftp        CNAME www
```

significa que *ftp.elbauldelprogramador.com* es un alias de *www.elbauldelprogramador.com*. Es decir, *ftp.elbauldelprogramador.com* apunta al mismo servidor que *www.elbauldelprogramador.com*. Un registro **CNAME** debe apuntar a un registro de tipo **A** y solo de tipo **A**.

En el siguiente artículo se verá el archivo de zona inversa y la configuración del servidor DNS secundario, así como el uso del comando *dig*.

# Referencias

- *Traditional DNS Howto* »» <a href="http://www.howtoforge.com/traditional_dns_howto" target="_blank">Visitar sitio</a>

 [1]: https://elbauldelprogramador.com/como-configurar-un-servidor-dns/ "Cómo configurar un servidor DNS – Parte 1 (Introducción)"
 [2]: https://elbauldelprogramador.com/como-configurar-un-servidor-dns3/ "Cómo configurar un servidor DNS – Parte 3 (Zona Inversa y DNS secundario)"
