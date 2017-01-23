---
author: alex
categories:
- linux
- script
color: '#2196F3'
date: '2016-01-01'
lang: en
lastmod: 2016-08-15
layout: post.amp
mainclass: linux
permalink: /c-syntax-highlighted-script/
title: C++ syntax highlighted script
---

I decided to create a small script that highlights the words reserved of c++.<br /> Here the code:

```bash
<span class="path">#!/bin/bash</span>

rutaCodigo=`zenity --file-selection --title="Select a File"`
<span class="bash">case</span> $? <span class="bash">in</span>
0)
  keyWords="continue float new signed try auto default for operator sizeof typedef break delete friend private static union case do goto protected struct unsigned catch double if public switch virtual char else inline register template void enum int return this volatile const extern long short throw while bool cout cin using namespace"

  <span class="bash">sed</span> "s/^#include/<span class="prp">#include</span>/" < "$rutaCodigo" > temp # coloreo el include
  <span class="bash">sed</span> "s/^#define/<span class="prp">#define</span>/" < temp > "$rutaCodigo" # coloreo el define

  <span class="bash">for</span> word <span class="bash">in</span> $keyWords
  <span class="bash">do</span>
<span class="comentario">#Busco en el texto, cada palabra clave contenida en keyWords, y le añado la etiqueta span</span>
<span class="bash">sed</span> "s/b$wordb/<span class="cpp">$word</span>/" < "$rutaCodigo" > temp
    <span class="bash">cp</span> temp $rutaCodigo
  <span class="bash">done</span>
<span class="bash">sed</span> "s/^class /<span class="cpp">class</span>/g" < "$rutaCodigo" > temp
  <span class="bash">rm</span> temp
  ;;
*)
  <span class="bash">echo</span> "No se seleciciono nada.";;
<span class="bash">esac</span>
```

** I am going to explain a bit the code: **

The variable * keyWords * contains the key words of c ++, fewer &#8220;class&#8221;, which later I will explain because. In this variable, the words have to be separated by a space, and all in the same line, In order that the &#8220;for&#8221; takes word to word.

Both following lines

```bash
sed "s/^#include..... and sed "s/^#define...
```

search the pattern &#8220;#define&#8221; or &#8220;#include&#8221;, initially of every line of the text, this is indicated by * ^ *, and replaces it with his corresponding style, to format the text. Once we enter the &#8220;for&#8221;, there is applied basically the same procedure that for it &#8220;define&#8221; and &#8220;include&#8221;, but with every word of the variable keyWords.

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