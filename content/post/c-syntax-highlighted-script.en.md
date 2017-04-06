---
author: alex
categories:
- linux
- script
date: '2016-01-01'
lastmod: 2017-04-06T19:35:15+01:00
mainclass: linux
url: /c-syntax-highlighted-script/
title: C++ syntax highlighted script
---

I decided to create a small script that highlights the words reserved of c++.<br /> Here the code:

```bash
#!/bin/bash

rutaCodigo=`zenity --file-selection --title="Select a File"`
case $? in
0)
  keyWords="continue float new signed try auto default for operator sizeof typedef break delete friend private static union case do goto protected struct unsigned catch double if public switch virtual char else inline register template void enum int return this volatile const extern long short throw while bool cout cin using namespace"

  sed "s/^#include/#include/" < "$rutaCodigo" > temp # coloreo el include
  sed "s/^#define/#define/" < temp > "$rutaCodigo" # coloreo el define

  for word in $keyWords
  do
#Busco en el texto, cada palabra clave contenida en keyWords, y le añado la etiqueta span
sed "s/b$wordb/$word/" < "$rutaCodigo" > temp
    cp temp $rutaCodigo
  done
sed "s/^class /class/g" < "$rutaCodigo" > temp
  rm temp
  ;;
*)
  echo "No se seleciciono nada.";;
esac
```

**I am going to explain a bit the code:**

The variable *keyWords* contains the key words of c ++, fewer &#8220;class&#8221;, which later I will explain because. In this variable, the words have to be separated by a space, and all in the same line, In order that the &#8220;for&#8221; takes word to word.

Both following lines

```bash
sed "s/^#include..... and sed "s/^#define...
```

search the pattern &#8220;#define&#8221; or &#8220;#include&#8221;, initially of every line of the text, this is indicated by *^*, and replaces it with his corresponding style, to format the text. Once we enter the &#8220;for&#8221;, there is applied basically the same procedure that for it &#8220;define&#8221; and &#8220;include&#8221;, but with every word of the variable keyWords.

Finally, I do the same for the reserved word &#8220;class&#8221;, the motive for which I have left this one by the end, it is because the label <span class="class"> contains the word, &#8220;class&#8221;, and then the code would not go out well, since on having been this word inside the label span, it would replace it also.

How Use It:

It is necessary to create a css class for the blog, of this form:

```css
.prp { color: "#0a0"; font-weight: bold; }
.cpp { color: "#a40"; font-weight: bold; }
```

Once done this, we have to execute the script and introduce the code path to formatting with this style.

<a href="http://bashyc.blogspot.com/p/curso-c.html#ejercicio111" target="_blank">Here</a> you can see the result.

Regards, I hope that it is useful
