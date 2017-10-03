+++
author = "cristina"
categories = ["datascience"]
mainclass = "datascience"
date = "2017-04-24T21:13:39+02:00"
lastmod = "2017-10-03T14:23:02+01:00"
description = "In this post you will be given the first directions for creating an application to use the github API and will analyse the programming languages popularities in your community from github data"
image = "FriendsLanguagesUsage.png"
tags = ["github","data-mining","community","API"]
title = "Mining your github community with R - Analysing languages popularity"
+++

In this post we are exploring our github community considering our friends (or followers) in that social network. We will first give some directions for creating an application and starting to use the github API. Then we will extract the information we need to perform our analysis and get what programming languages do our friends use and what is the most popular and the less popular language. Let's explore the languages popularity in your community!

# 1.  Create the app, install packages, authenticate

## 1.1 App registration

First of all, as we want to access public data from Github, we need to register an app with authentication to do that. This will allow us to have no limit of calls.
So go to [github developer program page](https://developer.github.com/program/ "github developer program page") and click on __Register now__. Then select an account and in __Personal settings__ tabs select __Authorized applications__.

If you already have an authorized aplication to access gitHub API, you must see it here. Otherwise if you don't have any registered app, then go to __OAuth applications__ and click on __Register a new application__.

There you have to register your new application, giving it a name, a description... Fill the fields and in __Callback URL__ enter [localhost:1410](http://localhost:1410/ "localhost:1410") which is the URL that github will return once the app is authenticated.

Now you have registered your app, the __Client ID__ and __Client Secret__ for your app will be generated. You can see them clicking on __OAuth applications -> Your App__. Remember to keep them secret and safe!

Wow! you're now a member of the developer program. The next thing we will do is installing the R packages we are going to use to work with gitHub from [R](https://elbauldelprogramador.com/en/tags/r/ "R").

<!--more--><!--ad-->

## 1.2 Packages installation

We will use the version 3 of GitHub API to access data [github v3 API](https://developer.github.com/v3/ "github v3 API"). As all the data from the API will be received in JSON format, we are going to use the function `fromJSON` which will let us use the API url directly, and will parse the JSON data returned to a data frame format. That function is on package `jsonlite`, so we must install it if you don't have it installed:

```r
install.packages('jsonlite')
```

If you have not installed `stringr` package, install it as we just do with `jsonlite`. We are using it to make some common operations on strings. Install `ggplot2` if you have not, too. We must use it to make the graphics, and install `httpuv`, a package to work with HTTP.

For connecting to the GitHub app, we will need to install `rgithub` package. We do it directly from github source code. Note that it have a dependency on package `devtools`:

```r
require(devtools)
install_github("cscheid/rgithub")
```

After installing, load the packages:

```r
# load libraries
library(github)
library(jsonlite)
library(stringr)
library(ggplot2)
```

## 1.3 Authenticate the access

We will need to authenticate the access, and we will do it through the function `interactive.login` from the `rgithub` package, passing to it our __ID__ and __secret__. My recommendation to you is to put that lines in a separate file and not share it with anyone or anywhere.
Then just source the file when you need to authenticate, or just execute its lines.

```r
# github app autentication
clientID<-"your_client_id_goes_here"
clientSecret<-"your_secret_goes_here"
context<-interactive.login(clientID,clientSecret)
```

# 2. Get your friends info

Now you're authenticated, lets get your followers on GitHub. The function `get.my.followers` will give us the people following us and some info about them:

```r
# get your followers
myFollowers<-get.my.followers(context)
```
we can easily check how many people is following us using `length` function:

```r
# get number of my followers
numFollowing<-length(myFollowers$content)
```

Now we have our followers, lets create a dataframe to store all the info returned. First, we extract each content line in _myFollowers_ list, and append them in a _dataset_ variable using `rbind` function:

```r
# create a dataset with your followers
dataset<-unlist(myFollowers$content[[1]])

for(i in 2:length(myFollowers$content)){
  dataset<-rbind(dataset,unlist(myFollowers$content[[i]]))
}
```

Then we make it a data frame, name the columns as they were originally named in _myFollowers$content_ list and save it as a csv for later use:

```r
# create a data frame and save it for later use
dataset<-unname(dataset)
dataset<-as.data.frame(dataset)
colnames(dataset)<-c(names(myFollowers$content[[1]]))
write.csv(dataset,file="CrisFollowers.csv")
```

Obviously you can save it with whatever name you like. But don't forget the extension.


# 3. Get our friends' repositories information and create a new dataset

As you sure have seen, in the last information we extracted, there's info about our followers name, id, avatar, type, and some url of interest. However, that info doesn't includes our friends repositories info as repo name, repo language, repo lines of code...

That info is fundamental to make our analysis, so we must get it. If you have took a look to the latest extracted data, you must have realized that there's a column named __repos_url__ which tells us that the url to get the repos from a user is __https://api.github.com/users/user/repos__ . For example, to get my repos information we should call __https://api.github.com/users/CritinaHG/repos__ , and we will get the data in JSON format from the API.

So we are getting that data for each of our followers, by reading the already created dataset and getting our followers names, composing their repo url and parsing the returned data from the API using the `fromJSON` function:

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

In __clientID__ and __clientSecret__ you should put your ID and secret generated at the begining of the post. It is not necesary but this will let us avoid request limitations. We remove the 4º column because it has redundant data. Whith `rbind` function we are appending the new data obtained to the existing one.

# 4. Lets do some data processing

Lets read (if you have not read it yet) the dataset : `activeFriends<-read.csv("UsersWithRepoInfo.csv")` We are going to perform some transformations over it to make data more readable for the analysis in R.

First, as the data timezone is UTC+2 (also Madrid timezone) we need to set the timezone parameter. Let's build a function to do that and apply it to every date column:

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

Feel free to explore the dataset. You will have noticed that there're some very interesting columns for our analysis, and others that are not so. Next we are doing is selecting the most interesting columns for our analysis:


```r
# selecting just the interesting cols
activeFriends<-activeFriends[,c("id","name","full_name","private","description","fork","created_at","updated_at","pushed_at","homepage","size","stargazers_count","watchers_count","language",                             "has_issues","has_downloads","forks_count","open_issues_count","forks","open_issues","watchers")]
```

Now binarize the columns which have True and False values:

```r
activeFriends$private<-as.integer(activeFriends$private)
activeFriends$has_issues<-as.integer(activeFriends$has_issues)
activeFriends$fork<-as.integer(activeFriends$fork)
activeFriends$has_downloads<-as.integer(activeFriends$has_downloads)
```

Finally, in the `full_name` column we must just get the user name, because the repos names are already included in `name` column. It can be achieved by spliting each item by the slash, and getting the first:

```r
# Getting the username
activeFriends$full_name<-unlist(lapply(strsplit(as.character(activeFriends$full_name),split = '/',fixed = TRUE),function(x) (x[1])))
```

Save it if you want, for later reuse.

# 5. Analizing programming language popularity

We can get a first understanding of the data distribution like the mean, median, max or min of each column using `summary` over our dataset. That is just an example of the output for my community, showing the metrics for the first columns:

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

Now lets dive into what concern us: see what programming languages are being used in our friends' community, and how much they're used. For that purpose we can start creating a contingency table to give ourselves a quick look at our answer:

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

With `nrow(languagesAndUse)` we can get the number of different languages our friends are using. For mine it is 31.
We can also see that there are many repos with _JavaScript_ code between my 30 friends, however _Scala_, _Lua_, _Arduino_, _TypeScript_, _Groovy_, _Lex_, _Prolog_, _GDScript_... each one of these seems to have been used just for one person in my community.

Finally, we use `qplot` from `ggplot2` package to plot an hibstogram representation of the usage of langugages in our github community:

```r
languages<-na.omit(activeFriends$language)
langUssage<-qplot(languages,geom = "bar",xlab = "Language", ylab="Usage",fill=I("cornflowerblue"))
langUssage+theme(axis.text.x = element_text(angle = 90,hjust = 1)) +ggtitle("Programming languages used by my friends")+theme(plot.title = element_text(hjust = 0.5))
```

Where we use `na.omit` to omit from data representation those languages which are NA (cannot have been extracted). The resulting hibstogram is the following:

<figure>
    <amp-img sizes="(min-width: 603px) 603px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/FriendsLanguagesUsage.png" title="Programming languages used in my github community" alt="Programming languages used in my github community" width="603" height="380"></amp-img>
    <figcaption>Languages use in my github community </figcaption>
</figure>

So, as we can see, in the representation, _JavaScript_ is the language most used with 67 repos containing _JavaScript_ code. Then [_Java_](https://elbauldelprogramador.com/en/tags/java), _C++_ and [_Python_](https://elbauldelprogramador.com/en/tags/python) are also very popular in my community.

We find that _Tex_ code is in 38 repositories, so [_LaTeX_](https://elbauldelprogramador.com/en/tags/latex) is also very present in my friends' community. They're also many repos with _HTML_, and much more less with _CSS_, _Ruby_, _R_ and _C_ code. Then come some languages not loved that much by the people such as _PHP_, _C#_ or _CLIPS_ that are contained in less than 10 repositories.

Finally, we can see that there're less than 5 repos with _Dart_, _Go_,_Haskell_, _Jupyter_, _PostScript_ and _Mathematica_ code, and just one using [_Scala_](https://elbauldelprogramador.com/en/tags/scala), _Groovy_, _Lua_ or _TypeScript_. So that answers my own question: as my favorite programming language is Scala, I wanted to know if my friends use it too.

So What happens in your friends community?
Are the languages used similarly than in my friends' community? Is JavaScript also the top used language?

# References:

- <a href="http://amzn.to/2ozoB3R" target="_blank">Mastering Social Media Mining with R</a>
