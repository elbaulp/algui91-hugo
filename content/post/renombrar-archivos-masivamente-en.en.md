---
author: alex
categories:
- linux
mainclass: linux
date: "2017-10-30T11:39:16+02:00"
tags:
- script
title: Rename files in bulk in GNU/Linux
description: "If we want to rename all the files to delete the web page name from the file name, there is no need in going renaming file by file. using the rename command of GNU/Linux we can get it done so easily."
url: "/en/rename-files-in-bulk-linux/"
---

> Note: Thanks to [Cristina H](https://elbauldelprogramador.com/author/cristina/) for translating this post to english.

Sometimes when we get some files from the internet (usually music), each file contains in its name the name of the webpage from which it was downloaded.

If we want to rename all files to delete the web page from the file name, it is not necessary to rename files one by one, using the `rename` command from GNU/Linux we can get it done easily.

For example, lets say the files are as follows:

<!--more--><!--ad-->

```bash
hkr@hkr:~/Desktop/RAP/d$ ls
01. Rafael Lechowski (Flowklorikos) - Uno - www.HHGroups.com.mp3
02. Rafael Lechowski (Flowklorikos) - Lluvia y fuego - www.HHGroups.com.mp3
03. Rafael Lechowski (Flowklorikos) - Donde duele inspira - www.HHGroups.com.mp3
04. Rafael Lechowski (Flowklorikos) - Por amor al odio (con Gregory Isaacs) - www.HHGroups.com.mp3
05. Rafael Lechowski (Flowklorikos) - Soy loco por ti - www.HHGroups.com.mp3
06. Rafael Lechowski (Flowklorikos) - Desde el barro (con Carlos Talavera) - www.HHGroups.com.mp3
07. Rafael Lechowski (Flowklorikos) - Folio en blanco (Improvisacion) - www.HHGroups.com.mp3
08. Rafael Lechowski (Flowklorikos) - In-extremis - www.HHGroups.com.mp3
09. Rafael Lechowski (Flowklorikos) - Sucio (con Carlos Talavera) - www.HHGroups.com.mp3
10. Rafael Lechowski (Flowklorikos) - Artesano del arte insano - www.HHGroups.com.mp3
11. Rafael Lechowski (Flowklorikos) - Cosquijazz - www.HHGroups.com.mp3
12. Rafael Lechowski (Flowklorikos) - Mis ego depresiones - www.HHGroups.com.mp3
13. Rafael Lechowski (Flowklorikos) - 13 - www.HHGroups.com.mp3
```

We want to delete the following from their names: **Rafael Lechowski (Flowklorikos)** and **www.HHGroups.com**. For that we use the rename command with the following syntax:

```bash
rename 's/Rafael Lechowski (Flowklorikos) - //g' *.mp3
```

What we are saying with that expression is that we want to replace all that match with Rafael Lechowski (Flowklorikos) by nothing, that is, to delete it from the name. It is necessary to scape blanks and parenthesis. The *.mp3 means that we want to apply that renaming to all mp3 files.

As a result, now the files have the following names:

```bash
hkr@hkr:~/Desktop/RAP/d$ ls -1
01. Uno - www.HHGroups.com.mp3
02. Lluvia y fuego - www.HHGroups.com.mp3
03. Donde duele inspira - www.HHGroups.com.mp3
04. Por amor al odio (con Gregory Isaacs) - www.HHGroups.com.mp3
05. Soy loco por ti - www.HHGroups.com.mp3
06. Desde el barro (con Carlos Talavera) - www.HHGroups.com.mp3
07. Folio en blanco (Improvisacion) - www.HHGroups.com.mp3
08. In-extremis - www.HHGroups.com.mp3
09. Sucio (con Carlos Talavera) - www.HHGroups.com.mp3
10. Artesano del arte insano - www.HHGroups.com.mp3
11. Cosquijazz - www.HHGroups.com.mp3
12. Mis ego depresiones - www.HHGroups.com.mp3
13. 13 - www.HHGroups.com.mp3
```

The only missing thing, is to delete the www.HHGroups.com part. We get it done with the following command:

```bash
rename 's/ - www.HHGroups.com//g' *.mp3
```

And finally, we have all our files renamed:

```bash
hkr@hkr:~/Desktop/RAP/d$ ls -1
01. Uno.mp3
02. Lluvia y fuego.mp3
03. Donde duele inspira.mp3
04. Por amor al odio (con Gregory Isaacs).mp3
05. Soy loco por ti.mp3
06. Desde el barro (con Carlos Talavera).mp3
07. Folio en blanco (Improvisacion).mp3
08. In-extremis.mp3
09. Sucio (con Carlos Talavera).mp3
10. Artesano del arte insano.mp3
11. Cosquijazz.mp3
12. Mis ego depresiones.mp3
13. 13.mp3
```
