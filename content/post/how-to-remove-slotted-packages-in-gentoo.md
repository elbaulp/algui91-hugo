+++
description = "Pequeña guía de cómo eliminar paquetes _sloted_ en Gentoo"
tags = ["gentoo", "portage", "emerge", "slotted package"]
date = "2017-02-04T12:53:37+01:00"
title = "Cómo eliminar un paquete slotted en Gentoo"
categories = ["gentoo", "linux"]
image = "como-instalar-actualizar-elminar-paquetes-gentoo.png"
mainclass = "linux"
author = "alex"
+++

Hace poco tuve un problema intentando eliminar un paquete de los llamados _slotted_ en Gentoo, a continuación muestro cómo lo resolví.


Primero debemos usar `equery list <pkg>` para listar los paquetes que coinciden con el nombre del paquete a eliminar:

```bash
$ equery list emacs
 * Searching for emacs ...
[IP-] [  ] app-editors/emacs-24.5-r3:24
[IP-] [  ] app-editors/emacs-25.1:25
```

Hay dos paquetes de [emacs](https://elbauldelprogramador.com/tags/emacs "emacs") instalados, cada uno en un _slot_ distinto, `:24` y `:25`. Para borrar el más antiguo, ejecutamos:

```bash
$ sudo emerge -C emacs-24.5-r3:24
Password:
 * This action can remove important packages! In order to be safer, use
 * `emerge -pv --depclean <atom>` to check for reverse dependencies before
 * removing packages.

 app-editors/emacs
    selected: 24.5-r3
   protected: none
     omitted: 25.1

All selected packages: =app-editors/emacs-24.5-r3

>>> 'Selected' packages are slated for removal.
>>> 'Protected' and 'omitted' packages will not be removed.

>>> Waiting 5 seconds before starting...
>>> (Control-C to abort)...
>>> Unmerging in: 5 4 3 2 1
>>> Unmerging (1 of 1) app-editors/emacs-24.5-r3...
 * Regenerating site-gentoo.el for GNU Emacs (postrm) ...
[ ok ]
 * ... 4 site initialisation files included.

 * Regenerating GNU info directory index...
 * Processed 140 info files.
```

Tras eliminar el paquete, comprobamos qué otros paquetes dependían de él

```bash
 $ equery depends emacs-24.5-r3:24
 * These packages depend on emacs-24.5-r3:24:
app-emacs/emacs-common-gentoo-1.5 (virtual/emacs)
app-emacs/markdown-mode-2.1 (>=virtual/emacs-23)
app-emacs/quilt-el-0.48.0 (>=virtual/emacs-23)
app-emacs/scala-mode-2.10.3 (>=virtual/emacs-23)
dev-python/cython-0.24.1 (emacs ? virtual/emacs)
dev-scheme/guile-1.8.8-r3 (emacs ? virtual/emacs)
dev-util/cmake-3.6.3 (emacs ? virtual/emacs)
dev-util/desktop-file-utils-0.23 (emacs ? virtual/emacs)
dev-util/ninja-1.6.0 (emacs ? virtual/emacs)
dev-vcs/git-2.10.2 (emacs ? virtual/emacs)
net-dns/libidn-1.33 (emacs ? virtual/emacs)
virtual/editor-0 (app-editors/emacs)
virtual/emacs-24 (app-editors/emacs:24)
```

Por último:


```bash
sudo emerge --update --deep --with-bdeps=y --newuse -atv @world
```

# Referencias

- Gentoo Forums | <a href="https://forums.gentoo.org/viewtopic-t-845023-view-previous.html?sid=ef04c0fc53b4e635179ee854aaed2fbd" target="_blank" title="Remove Slotted Packages">Remove Slotted Packages</a>
