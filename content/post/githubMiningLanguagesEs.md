+++
author = "cristina"
categories = ["datamining"]
date = "2017-04-25T18:34:49+02:00"
description = "En este post recibirás las primeras indicaciones en la creación de una aplicación para usar la API de github, y analizarás la popularidad de los lenguages de programación en tu comunidad de amigos a partir de datos extraídos de github"
image = "FriendsLanguagesUsage.png"
mainclass = "datamining"
tags = ["github","minería","comunidad","API"]
title = "Minería en tu comunidad de github con R - Analizando la popularidad de los lenguajes"
+++

En este post vamos a explorar nuestra comunidad de github, considerando nuestros amigos (nuestros seguidores) en esta red social. En primer lugar daremos algunas indicaciones para crear una aplicación y empezar a usar la API de github. Después extraeremos la información que necesitamos para realizar nuestro análisis, y así obtener que lenguajes de programación son más usados por nueustros amigos, y cuales los menos usados. ¡Exploremos la popularidad de los lengajes en nuestra comunidad!

# 1. Crear la app, instalar paquetes, autenticarse

## 1.1 Registrar la app

Antes de nada, ya que queremos acceder a datos públicos de github, ncesitaremos registrar una app con autenticación para ello. Esto nos permitirá no tener límite de llamadas a la API. 
Así que dirígete a [github developer program page](https://developer.github.com/program/ "la página del programa de desarrolladores de github") y clica en __Register now__. Luego, selecciona una cuenta (debe aparecer un listado de tus cuentas de github) y en la pestaña de __Personal settings__ selecciona  __Authorized applications__.

Si ya tienes una aplicación autorizada para acceder a la API de github, deberás visualizarla aquí.  Sino tienes ninguna app registrada aún, vete a __OAuth applications__ (bajo _Personal settings_) y selecciona __Register a new application__.

Ahora tienes que registrar tu nueva app, darle un nombre, una descripción... completa los campos y en __Callback URL__ introduce: [localhost:1410](http://localhost:1410/ "localhost:1410"), que es la url a la que github devolverá cuando se autentique la app.

Ahora que tienes registrada tu app, se generarán su __Client ID__ y __Client Secret__. Puedes verlos en __OAuth applications -> Your App__. Recuerda mantenerlos siempre en secreto y a salvo.

¡Bien! pues ya eres miembro del programa de _developers_. Lo siguiente que haremos es instalar los paquetes de R que vamos a usar para trabajar.

## 1.2 Instalación de paquetes 

Usaremos la versión 3 de la API de GitHub para obtener los datos [github v3 API](https://developer.github.com/v3/ "github v3 API"). Ya que la API devuelve los datos en formato JSON, vamos a usar la función `fromJSON`, que nos permitirá usar la url de la API directamente y nos parsea los datos JSON devueltos en formato _dataframe_. Ésta función se encuentra en el paquete `jsonlite`, así que tenemos que instalar ese paquete si no lo tenemos ya instalado:

```r
install.packages('jsonlite')
```

Si no tienes instalado el paquete `stringr`, instálalo tal como acabamos de hacer con `jsonlite`. Lo usaremos para hacer operaciones comunes con _strings_. Instala también `ggplot2` si no lo tienes instalado. Lo usaremos para las gráficas.

Para conectarse a la app the github, necesitaremos instalar el paquete `rgithub`. Puedes hacerlo directamente desde el código fuente en github. Date cuenta que tiene depende del paquete `devtools`:

```r
require(devtools)
install_github("cscheid/rgithub")
```

Tras la instalación, carga las librerías:

```r
# load libraries
library(github)
library(jsonlite)
library(stringr)
library(ggplot2)
```

## 1.3 Autentica el acceso

Necesitaremos autenticar el acceso, y lo haremos a través de la función `interactive.login` del paquete `rgithub`, pasándole nuestro __ID__ y __secreto__. MI recomendación es que pongas estas líneas en un fichero separado y no las compartas con nadie. Sólo haz un _source_ del fichero cuando necesites autenticarte o ejecuta las líneas de nuevo.


```r
# github app autentication
clientID<-"your_client_id_goes_here"
clientSecret<-"your_secret_goes_here"
context<-interactive.login(clientID,clientSecret)
```

# 2. Obtener la información de tus amigos

Ya estás autenticado. Lo que  sigue es obtener tus seguidores de GitHub. Para obtener los usuarios que nos siguen e información sobre ellos, usaremos la función `get.my.followers`:

```r
# get your followers
myFollowers<-get.my.followers(context)
```

Podemos comprobar fácilmente cuantos seguidores tenemos usando la función `length`:

```r
# get number of my followers
numFollowing<-length(myFollowers$content)
```

Ahora que tenemos nuestros seguidores, vamos a crear un _dataframe_ para guardar toda la información obtenida. Primero, extraemos cada línea de contenido de la lista de _myFollowers_, y la vamos añadiendo a una variable _dataset_ usando la función `rbind`:

```r
# create a dataset with your followers
dataset<-unlist(myFollowers$content[[1]])

for(i in 2:length(myFollowers$content)){
  dataset<-rbind(dataset,unlist(myFollowers$content[[i]]))
}
```

Ahora que tenemos el _dataframe_, nombra a las columnas como se llamaban originalmente en _myFollowers$content_ y guárdalo en un _csv_ para poder reusarlo:

```r
# create a data frame and save it for later use
dataset<-unname(dataset)
dataset<-as.data.frame(dataset)
colnames(dataset)<-c(names(myFollowers$content[[1]]))
write.csv(dataset,file="CrisFollowers.csv")
```
Obviamente lo puedes guardar con el nombre que quieras. Pero no olvides la extensión.

# 3. Obtener la información de los repositorios de tus amigos y crear un nuevo conjunto de datos
 
Como ya te habrás percatado, en los últimos datos que extraímos había información acerca del nombre de nuestros seguidores, su id,avatar, tipo... y algunas url de interés. Sin embargo, en esa información no aparecía la información de los repositorios que necesitamos para nuestro análisis, como nombres de los repositorios, lenguaje de los repositorios, número de líneas de código...

Debemos obtener esa iformación. Si has explorado un poco el dataset, te habrás dado cuenta de que existe una columna, llamada  __repos_url__ que nos dice que la url para obtener los repositorios dado un usuario cualquiera, es: __https://api.github.com/users/user/repos__. Por ejemplo, para obtener la información de cuales son mis repositorios, etc, deberemos llamar a la API  __https://api.github.com/users/CritinaHG/repos__ , y obtendremos los datos que queremos en formato JSON.

Así que obtendremos esos datos para cada usuario leyendo el dataset que creamos anteriormente, obteniendo de él los nombres de nuestros seguidores, componiendo la correspondiente url de sus repos y parseando los datos obtenidos de la API usando la función `fromJSON`:


```r
# read latest created csv 
myFriends<-read.csv("CrisFollowers.csv")

# extract the names
unname<-as.character(myFriends$login)

# extract data from friends' public repositories
compdata<- NULL

for(i in 1:nrow(myFriends)){
  data<-fromJSON(paste0("https://api.github.com/users/",str_trim(unname[i],side = "both"),"/repos?clientID&clientSecret"))
  if(length(data)!=0){
    data<-data[,-4]
    compdata<-rbind(compdata,data)
  }
}

# write data for reuse
write.csv(compdata,"UsersWithRepoInfo.csv")
```

Debes sustituir __clientID__ y __clientSecret__ por el id y secreto de tu app, generados al principio del post. No es necesario especificarle estos parámetros, pero hacerlo nos permite evitar limitaciones en las peticiones. Se elimina la 4º columna porque contiene información redundante, y se usa `rbind` para ir agregando los datos que se van obteniendo al nuevo _dataset_.

# 4. Haciendo un poco de procesamiento

Lee (si no tienes leído) el _dataset_ `activeFriends<-read.csv("UsersWithRepoInfo.csv")`. Vamos a hacerle algunas transformaciones a los datos para hacerlos más manejables con R.

En primer lugar, como la zona horaria es UTC+2 (La de Madrid), necesitamos establecer el parámetro timezone. Construimos una función para realizar el formateo y lo aplicamos a data columna con fechas del _dataset_:

```r
# make date format supported by R
date.format<-function(datestring){
  date<-as.POSIXct(datestring,format="%Y-%m-%d %H:%M:%S",tz="Europe/Madrid", usetz=TRUE)
}

# update dates with new format
activeFriends$created_at<-date.format(activeFriends$created_at)
activeFriends$updated_at<-date.format(activeFriends$updated_at)
activeFriends$pushed_at<-date.format(activeFriends$pushed_at)
```
















