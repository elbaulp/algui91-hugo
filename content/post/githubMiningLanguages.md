+++
author = "cristina"
categories = ["datascience"]
mainclass = "datascience"
date = "2017-04-25T18:34:49+02:00"
lastmod = "2017-10-03T14:23:36+01:00"
description = "En este post recibirás las primeras indicaciones en la creación de una aplicación para usar la API de github, y analizarás la popularidad de los lenguajes de programación en tu comunidad de amigos a partir de datos extraídos de github"
image = "FriendsLanguagesUsage.png"
tags = ["github","minería de datos","comunidad","API"]
title = "Minería en tu comunidad de github con R - Analizando la popularidad de los lenguajes"
+++

En este post vamos a explorar nuestra comunidad de [Github](https://elbauldelprogramador.com/tags/git/ "Github"), considerando nuestros amigos (nuestros seguidores) en esta red social. En primer lugar daremos algunas indicaciones para crear una aplicación y empezar a usar la [API](https://elbauldelprogramador.com/tags/api/ "API")  de github. Después extraeremos la información que necesitamos para realizar nuestro análisis, y así obtener que lenguajes de programación son más usados por nuestros amigos, y cuales los menos usados. ¡Exploremos la popularidad de los lenguajes en nuestra comunidad!


# 1. Crear la app, instalar paquetes, autenticarse

## 1.1 Registrar la app

Antes de nada, ya que queremos acceder a datos públicos de github, ncesitaremos registrar una app con autenticación para ello. Esto nos permitirá no tener límite de llamadas a la API.
Así que dirígete a [github developer program page](https://developer.github.com/program/ "la página del programa de desarrolladores de github") y clica en __Register now__. Luego, selecciona una cuenta (debe aparecer un listado de tus cuentas de github) y en la pestaña de __Personal settings__ selecciona  __Authorized applications__.

Si ya tienes una aplicación autorizada para acceder a la API de github, deberás visualizarla aquí.  Sino tienes ninguna app registrada aún, vete a __OAuth applications__ (bajo _Personal settings_) y selecciona __Register a new application__.

Ahora tienes que registrar tu nueva app, darle un nombre, una descripción... completa los campos y en __Callback URL__ introduce: [localhost:1410](http://localhost:1410/ "localhost:1410"), que es la url a la que github devolverá cuando se autentique la app.

Ahora que tienes registrada tu app, se generarán su __Client ID__ y __Client Secret__. Puedes verlos en __OAuth applications -> Your App__. Recuerda mantenerlos siempre en secreto y a salvo.

¡Bien! pues ya eres miembro del programa de _developers_. Lo siguiente que haremos es instalar los paquetes de [R](https://elbauldelprogramador.com/tags/r/ "R") que vamos a usar para trabajar.

<!--more--><!--ad-->

## 1.2 Instalación de paquetes

Usaremos la versión 3 de la API de GitHub para obtener los datos [github v3 API](https://developer.github.com/v3/ "github v3 API"). Ya que la API devuelve los datos en formato [JSON](https://elbauldelprogramador.com/tags/json/ "JSON"), vamos a usar la función `fromJSON`, que nos permitirá usar la url de la API directamente y nos parsea los datos JSON devueltos en formato _dataframe_. Ésta función se encuentra en el paquete `jsonlite`, así que tenemos que instalar ese paquete si no lo tenemos ya instalado:

```r
install.packages('jsonlite')
```

Si no tienes instalado el paquete `stringr`, instálalo tal como acabamos de hacer con `jsonlite`. Lo usaremos para hacer operaciones comunes con _strings_. Instala también `ggplot2` si no lo tienes instalado. Lo usaremos para las gráficas y `httpuv`, un paquete para poder trabajar con HTTP.

Para conectarse a la app the github, necesitaremos instalar el paquete `rgithub`. Puedes hacerlo directamente desde el código fuente en github. Date cuenta que depende del paquete `devtools`:

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

Necesitaremos [autenticar](https://elbauldelprogramador.com/tags/seguridad/ "Post sobre seguridad") el acceso, y lo haremos a través de la función `interactive.login` del paquete `rgithub`, pasándole nuestro __ID__ y __secreto__. Mi recomendación es que pongas estas líneas en un fichero separado y no las compartas con nadie. Sólo haz un _source_ del fichero cuando necesites autenticarte o ejecuta las líneas de nuevo.

```r
# github app autentication
clientID<-"your_client_id_goes_here"
clientSecret<-"your_secret_goes_here"
context<-interactive.login(clientID,clientSecret)
```

# 2. Obtener la información de tus amigos

Ya estás autenticado. Lo que sigue es obtener tus seguidores de GitHub. Para obtener los usuarios que nos siguen e información sobre ellos, usaremos la función `get.my.followers`:

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

Ahora que tenemos el _dataframe_, nombra a las columnas como se llamaban originalmente en _myFollowers$content_ y guárdalo en un _csv_ para poder reutilizarlo:

```r
# create a data frame and save it for later use
dataset<-unname(dataset)
dataset<-as.data.frame(dataset)
colnames(dataset)<-c(names(myFollowers$content[[1]]))
write.csv(dataset,file="CrisFollowers.csv")
```

Obviamente lo puedes guardar con el nombre que quieras. Pero no olvides la extensión.

# 3. Obtener la información de los repositorios de tus amigos y crear un nuevo conjunto de datos

Como ya te habrás percatado, en los últimos datos que extraímos había información acerca del nombre de nuestros seguidores, su id, avatar, tipo... y algunas url de interés. Sin embargo, en esa información no aparecía la información de los repositorios que necesitamos para nuestro análisis, como nombres de los repositorios, lenguaje de los repositorios, número de líneas de código...

Debemos obtener esa información. Si has explorado un poco el dataset, te habrás dado cuenta de que existe una columna, llamada  __repos_url__ que nos dice que la url para obtener los repositorios dado un usuario cualquiera, es: __https://api.github.com/users/user/repos__. Por ejemplo, para obtener la información de cuales son mis repositorios, etc, deberemos llamar a la API  __https://api.github.com/users/CritinaHG/repos__ , y obtendremos los datos que queremos en formato JSON.

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

En primer lugar, como la zona horaria es UTC+2 (o la de Madrid), necesitamos establecer el parámetro timezone. Construimos una función para realizar el formateo y lo aplicamos a cada columna con fechas del _dataset_:

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

Siéntete libre de explorar el conjunto de datos. Seguro que estás pensando que en él hay columnas que nos interesan para nuestro análisis, y otras que no tanto. Lo siguiente que haremos será seleccionar las que más nos interesan para nuestro análisis:

```r
# selecting just the interesting cols
activeFriends<-activeFriends[,c("id","name","full_name","private","description","fork","created_at","updated_at","pushed_at","homepage","size","stargazers_count","watchers_count","language",                             "has_issues","has_downloads","forks_count","open_issues_count","forks","open_issues","watchers")]
```

Podemos binarizar las columnas que tienen solo valores True o False:

```r
activeFriends$private<-as.integer(activeFriends$private)
activeFriends$has_issues<-as.integer(activeFriends$has_issues)
activeFriends$fork<-as.integer(activeFriends$fork)
activeFriends$has_downloads<-as.integer(activeFriends$has_downloads)
```

Por último, la columna `full_name` contiene el nombre de usuario junto con el nombre del repositorio. Extraemos de aquí sólo el nombre de usuario, pues el nombre del repositorio ya se incluye en la columna `name`. Lo hacemos separando cada item por la barra que separa los nombres, y tomando el primer elemento:

```r
# Getting the username
activeFriends$full_name<-unlist(lapply(strsplit(as.character(activeFriends$full_name),split = '/',fixed = TRUE),function(x) (x[1])))
```

Guárdalo si quieres, para reutilizarlo más tarde.

# 5. Analizando la popularidad de los lenguages de programación

Podemos hacernos una primera idea de cómo están distribuidos los datos, cual es la media, mediana, máximo, mínimo... para cada columna, usando la función `summary` en el _dataset_.
Éste es sólo un ejemplo parte de la salida de esta función que se obtiene para mi comunidad de amigos, mostrando las métricas mencionadas para las primeras columnas:

```r
summary(activeFriends)
       id                 name      full_name            private                                                                      description
Min.   : 2054512   IV      :  4   Length:524         Min.   :0   Asignatura de infraestructuras virtuales para el Grado de Informática     :  4
1st Qu.:32878832   blog    :  3   Class :character   1st Qu.:0   Repositorio para la asignatura Infraestructura Virtual de 2016-2017       :  3
Median :51252063   DAI     :  3   Mode  :character   Median :0   An example repo in Ruby for continuous integration with Travis CI         :  2
Mean   :51191269   IV16-17 :  3                      Mean   :0   Curso de LaTeX organizado por AMAT para alumnos de Trabajo de Fin de Grado:  2
3rd Qu.:70082791   swap1415:  3                      3rd Qu.:0   Diferentes scripts para representación de carreras en cifras              :  2
Max.   :88848228   TFG     :  3                      Max.   :0   (Other)                                                                   :404
                   (Other) :505                                  NA's                                                                      :107
```

Ahora vamos al tema que nos concierne: ver que lenguajes de programación se están usando en nuestra comunidad de amigos, y cuánto se usan. Para este cometido, podemos comenzar por crear una tabla de contingencia, para dar un primer vistazo a nuestra respuesta:

```r
languagesAndUse<-table(activeFriends$language)
languagesAndUse

         Arduino                C               C#              C++            CLIPS              CSS             Dart
               1               13                7               55                5               19                2
      Emacs Lisp              GAP         GDScript               Go           Groovy          Haskell             HTML
               2                1                1                3                1                2               48
            Java       JavaScript Jupyter Notebook              Lex              Lua         Makefile      Mathematica
              60               67                3                1                1                6                2
             PHP       PostScript           Prolog           Python                R             Ruby            Scala
               8                2                1               56               12               24                1
           Shell              TeX       TypeScript
               7               38                1
```

Con `nrow(languagesAndUse)` podemos ver el número de lenguages diferentes que se están usando en nuestra comunidad de amigos. En la mía son 31.
También podemos apreciar que hay muchos repos con código _JavaScript_  entre mis 30 amigos, sin embargo, parece que _Scala_, _Lua_, _Arduino_, _TypeScript_, _Groovy_, _Lex_, _Prolog_, _GDScript_... sólo son usados por una persona.

Finalmente, usamos `qplot` del paquete `ggplot2` para crear un hibstograma que represente el uso de los lenguajes de programación en nuestra comunidad de github:

```r
languages<-na.omit(activeFriends$language)
langUssage<-qplot(languages,geom = "bar",xlab = "Language", ylab="Usage",fill=I("cornflowerblue"))
langUssage+theme(axis.text.x = element_text(angle = 90,hjust = 1)) +ggtitle("Programming languages used by my friends")+theme(plot.title = element_text(hjust = 0.5))
```

Donde usamos `na.omit` para omitir de la representación de los datos los valores NA (lenguajes que no se hayan podido extraer). El hibstograma resultante es el siguiente:

<figure>
    <img sizes="(min-width: 603px) 603px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/FriendsLanguagesUsage.png" title="Programming languages used in my github community" alt="Lenguajes de programación usados en mi comunidad de github" width="603" height="380"></img>
    <figcaption>Lenguajes usados en mi comunidad de github </figcaption>
</figure>

Así que, como podemos ver en la representación, _JavaScript_ es el lenguage más usado, habiendo 67 repos en total en mi comunidad de amigos que contienen código _JavaScript_. También [_Java_](/tags/java), _C++_ y [_Python_](https://elbauldelprogramador.com/tags/python) son muy populares en mi comunidad.

Encontramos código _Tex_ en 38 repositorios, por lo que [_LaTeX_](https://elbauldelprogramador.com/tags/latex/) está bastante presente en mi comunidad de amigos. También hay muchos repos con código _HTML_, y muchos menos con código _CSS_, _Ruby_, _R_ and _C_. Tras ellos, lenguages conocidos pero no amados por muchos, como [_PHP_](https://elbauldelprogramador.com/tags/php), _C#_ o _CLIPS_, que están presentes en menos de 10 repositorios.

Por último, se puede aprecidar que hay menos de 5 repositorios en total con código _Dart_, _Go_,_Haskell_, _Jupyter_, _PostScript_ y _Mathematica_, y que sólo hay un usuario de mi comunidad usando [_Scala_](https://elbauldelprogramador.com/tags/scala), _Groovy_, _Lua_ o _TypeScript_. Ésto responde a mi pregunta, ya que, como mi lengugaje favorito es Scala, quería saber cuántos de mis seguidores lo usaban.

Y bueno, ¿Qué sucede en tu comunidad de amigos?
¿Se usan los mismos lenguajes que en la mía? ¿Sigue Siendo JavaScript el más usado?

# Referencias:

- <a href="http://amzn.to/2q94XbW" target="_blank">Mastering Social Media Mining with R</a>
