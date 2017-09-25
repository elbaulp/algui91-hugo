---
author: alex
categories:
- articulos
mainclass: articulos
date: 2017-03-09T18:01:44+01:00
description: "Emacs: A useful recopilation of commands and actions"
image: chuleta-atajos-teclado-emacs.png
introduction: "Emacs: A useful recopilation of commands and actions"
tags:
- emacs
- cheatsheet
- prelude
- ensime
title: "Emacs cheatsheet, Shortcuts and useful packages for beginners"
---

There is a bunch of post about [cheatsheets](https://elbauldelprogramador.com/en/tags/cheatsheet "cheatsheets")  in this blog:

>- [Dig CheatSheet](/dig-chuleta-basica-de-comandos/ "Chuleta básica de comandos Dig")
>- [Git CheatSheet](/mini-tutorial-y-chuleta-de-comandos-git/ "Chuleta de comandos para Git")
>- [GPG CheatSheet](/chuleta-de-comandos-para-gpg/ "Chuleta de comandos para GPG")
>- [MarkDown CheatSheet](/chuleta-markdown-para-wordpress/ "Chuleta de comandos de Markdown")

Today CheatSheet is going to be about _Emacs_. But I want this cheatsheet to be different, my idea is that all of you using emacs help this cheatsheet grow with your own tips and favorite commands & packages.

I've been using [emacs](https://elbauldelprogramador.com/en/tags/emacs "emacs") for a few months now and I'm pretty happy about it. It is very powerful. Now, lets start with the collaborative Emacs CheatSheet:

# Useful packages

## Yasnippet

[YaSnippet](https://www.emacswiki.org/emacs/Yasnippet "Official yasnippet site") is a template system for emacs, it is a _must have_ package for every emacs user. By default _YaSnippet_ has a set of pre-defined snippets for practically every language, but it is possible to configure our own ones. For example:

<!--more--><!--ad-->

Every blog post in this blog has a [Frontmatter](https://elbauldelprogramador.com/en/tags/frontmatter/ "Frontmatter"), one of its variables holds the last time the post was modified, in order to quickly write the current date, I've created the following _YaSnippet_:

```bash
# -*- mode: snippet -*-
# name: Modified
# key: mod
# # modified: 2016-$1-$2T$3:$4$0
# --
lastmod = "`(format-time-string "%Y-%m-%dT%H:%M:%S+01:00")`"$0
```

In the comments some metadata is written, such as the _snippet_ name, and the key that is going to be associated with that snippet, `mod` in this case. So every time `mod TAB` is written, the snippet is expanded, writing something like this:

```bash
lastmod = "2017-03-08T16:58:45+01:00"
```

Here is another example:

```bash
# -*- mode: snippet -*-
# name: CodeBlock
# key: code
# --
\`\`\`$1
$2
\`\`\`
```

This _snippet_ expand to a Markdown code block, `$1` is the first position where the cursor is placed to start writing, `$2` the second and so on. Here is the result:


    ```<Cursor is placed here first>
    <After writing the first time and pressing TAB, cursor is placed here>
    ```


# Miscellaneous / Common tasks

## Search & replace in multiple files at once

__Problem__:

Search using a [regular expression](https://elbauldelprogramador.com/en/tags/regex/ "regular expression") or a simple text in multiple files at once, or a entire directory and replace all the matches found.

__Solution:__

1. Run `M-x find-name-dired` and write the directory where files in which to look for matches are.
2. Press `t` to “mark” all directory files.
3. Press `Q` to run the command `query-replace` for every file marked.
4. Write down the regex, for every file matches it is necessary to confirm the operation, in order to replace the contents in all the files at once, press `A`.

__Source__: [Using Emacs to recursively find and replace in text files not already open](http://stackoverflow.com/a/271136/1612432 "Using Emacs to recursively find and replace in text files not already open")

## Rectangular selection

__Problem:__

When wanting to select a region of text and perform an action in it, for example remove white spaces, add some text right before each sentence and so on.

__Solution:__

Suppose the following text:

```bash
line 1
line 2
line 3
line 4
```

The desired text is:

```bash
- line 1
- line 2
- line 3
- line 4
```

In order to accomplish this, select the region and press `C-x r t`, emacs will ask the text to introduce, then press enter and that's it. There are more operations for rectangular selection:

- `C-x r k`: _Kill_ the text of the region-rectangle, saving its contents as the "last killed rectangle" (kill-rectangle).
- `C-x r d`: _Delete_ the text of the region-rectangle (delete-rectangle).
- `C-x r y`: _Yank_ the last killed rectangle with its upper left corner at point (yank-rectangle).
- `C-x r o`: _Insert_ blank space to fill the space of the region-rectangle (open-rectangle). This pushes the previous contents of the region-rectangle rightward.
- `M-x clear-rectangle`: _Clear_ the region-rectangle by replacing its contents with spaces.
- `M-x delete-whitespace-rectangle`: _Delete_ whitespace in each of the lines on the specified rectangle, starting from the left edge column of the rectangle.
- `C-x r t string RET`: _Replace_ rectangle contents with string on each line. (string-rectangle).
- `M-x string-insert-rectangle RET string RET`: _Insert_ string on each line of the rectangle.

__Source__: [GNU Emacs Manual](http://www.delorie.com/gnu/docs/emacs/emacs_68.html "GNU Emacs Manual")

## Replace a character with a new line

__Problem:__

Imagine a bad formatted text, and in need to replace a character by a new line. This usually happens when reading files with different codifications in which the new line is interpreted differently (Windows and Linux). For example, in the below text we want to replace `^N` with a new line:

```bash
Lorem ipsum dolor sit amet^N, consectetur adipiscing elit.^N Fusce vestibulum.
```

__Solution:__

1. Press `M-x replace-string`.
2. Write the text to replace, in this case `^N`.
3. Insert the new line character, for this:
   1. `C-q`: In order to tell emacs we want to insert a raw character.
   2. `C-j`: This key combination represents a new line.
4. Hit `Enter` and the resulting text is:

```bash
Lorem ipsum dolor sit amet
, consectetur adipiscing elit.
 Fusce vestibulum.
```

__Source:__ [How to replace a character with a newline in Emacs?](http://stackoverflow.com/a/613029/1612432 "How to replace a character with a newline in Emacs?")


## Delete trailing white spaces at the end of a line

Simply execute `M-x delete-trailing-whitespace`.

## Save frequently used commands.

In a previous post this problem was explained in detail: [_Cómo crear comandos personalizados en Emacs_](/como-crear-comandos-personalizados-en-emacs "Cómo crear comandos personalizados en Emacs").

## Manage emacs backups

__Problem:__

By default _emacs_ saves a backup copy of the file being edited in the same directory, but ending in `~` , I find this very annoying. There is a way of telling _emacs_ to save its backups in another directory.

__Solution:__

Edit your `~/.emacs/init.el`:

```elisp
;; Set a directory for backup files
(setq backup-directory-alist `(("." . "~/.saves")))
(setq delete-old-versions t
    kept-new-versions 6
    kept-old-versions 2
    version-control t)
```

__Source:__ [How do I control how Emacs makes backup files?](http://stackoverflow.com/a/151946/1612432 "How do I control how Emacs makes backup files?")

## Execute an action for all opened buffers

__Problem:__

Some actions above, like searching & replacing in multiple files at once perform the action, but not save the changes in the files. In order to save the buffers to the files, _ibuffer_ comes in handy.

__Solution:__

To replace the default _bufer_ by _ibuffer_ add the following to emacs config:

```elisp
;; make ibuffer the default
(global-set-key "\C-x\C-b" 'ibuffer)
```

For now on, every time the _buffer_ window is opened, emacs will open _ibuffer_ by default. To select all file buffers opened and save them:

1. Press `t` to select all files.
2. Press `S` to save all the marked buffers.

__Source:__ [Execute a particular command on multiple emacs buffers](http://stackoverflow.com/a/14293998/1612432 "Execute a particular command on multiple emacs buffers")

## Vertical align with the given character

- `M-x align-regex =`

## Convert to uppercase/lowercase

- `C-x C-u`: Convert the selected region to uppercase.
- `C-x C-l`: Convert the selected region to lowercase.
- `M-l`: Convert the next word to lowercase.
- `M-u`: Convert the next word to uppercase.
- `M-c`: Capitalize the next word.

## Replace tabs by spaces and vice versa

- `M-x tabify`: Replace spaces by tabs in the selected region.
- `M-x untabify`: Above inverse, replace all tabs by spaces.

- Source: [mdk.fr](https://mdk.fr/blog/emacs-replace-tabs-with-spaces.html "Emacs: replace tabs with spaces")

# Prelude

Github's prelude description:

> _Prelude_ is an enhanced Emacs 24 distribution that should make your experience with Emacs both more pleasant and more powerful.

It works as well on emacs 25 though, I am using this version in [Gentoo](https://elbauldelprogramador.com/en/tags/gentoo "Gentoo") and works well.

Prelude installation is very easy, all steps are described in its <a href="https://github.com/bbatsov/prelude" target="_blank" title="repositorio de Github">GitHub repo</a>.

# Contribute to this cheatsheet

If you want to contribute to this Emacs cheatsheet, you can add your useful packages and shortcuts via <a href="https://github.com/elbaulp/algui91-hugo/edit/master/content/post/chuleta-atajos-teclado-emacs.en.markdown" target="_blank" title="Pull Request">Pull Request</a>.
