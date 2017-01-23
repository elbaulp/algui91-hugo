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
permalink: /bash-syntax-highlighted-script/
title: Bash syntax highlighted script
---

As I said to you, I have done the bash highlighted syntax script, Still it does not highlight many words, but I will try to improve it. If there is some word that is not highlighted, simply add it to the variable KeyWords.<br /> Here the code:


```bash
#!/bin/bash

rutaCodigo=`zenity --file-selection --title="Select a File"`
case $? in
0)
  keywords="alias bg bind break builtin case cd command continue declare dirs disown do done echo elif else enable-in esac eval exec exit export fc fg fi for function getopts hash help history if in jobs kill let local logout popd pushd pwd read readonly return select set shift suspend test then time times trap type typeset ulimit umask unalias unset until wait while sed rm IFS cp mv mkdir"

 sed 's/#.*/&/' < "$rutaCodigo" > temp # & print the coincidence with the pattern
 cp temp "$rutaCodigo"

  for word in $keywords
  do
#I search in the text, every key word contained in keyWords, and add the label
sed "s/b$wordb/$word/" < "$rutaCodigo" > temp
    cp temp "$rutaCodigo"
  done
rm temp
  ;;
*)
  echo "No se seleciciono nada.";;
esac
```

I am going to explain a bit the code:

```bash
sed 's/#.*/&/'
```

This line is the one that takes charge highlighting the comments. We look for one &#8220;\*&#8221;, that are the comments in bash, and any character after &#8221; (. \*) &#8220;. &#8220;&&#8221;, it is in order that in this place, it prints everything what coincided with the pattern &#8221; (. *) &#8220;, that is to say, the comment.

There is a small problem, and is that I did not manage to form the regular expression 100 % correct for the comments, in any place in which one exists #, it will treat as a comment, this happens for example in (#!/bin/bash).

I hope that it is useful