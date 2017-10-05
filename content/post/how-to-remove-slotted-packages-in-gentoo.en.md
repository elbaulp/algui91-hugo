+++
description = "Little guide on how to remove slotted packages in Gentoo"
tags = ["howto", "gentoo", "portage", "emerge"]
date = "2017-02-04T12:53:37+01:00"
title = "How to remove slotted packages in gentoo"
categories = ["linux"]
mainclass = "linux"
image = "como-instalar-actualizar-elminar-paquetes-gentoo.png"
author = "alex"
+++

Recently I had a problem trying to remove slotted packages in Gentoo, here is how I did it.

First use `equery list <pkg>` to list package matching PKG:

```bash
$ equery list emacs
 * Searching for emacs ...
[IP-] [  ] app-editors/emacs-24.5-r3:24
[IP-] [  ] app-editors/emacs-25.1:25
```

There are two [emacs](https://elbauldelprogramador.com/en/tags/emacs "emacs") packages, slotted in `:24` and `:25`, respectively. In order to remove the older version, execute:

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

After removing the package, check what packages depended on it:

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

The last step:

```bash
sudo emerge --update --deep --with-bdeps=y --newuse -atv @world
```

# References

- Gentoo Forums | <a href="https://forums.gentoo.org/viewtopic-t-845023-view-previous.html?sid=ef04c0fc53b4e635179ee854aaed2fbd" target="_blank" title="Remove Slotted Packages">Remove Slotted Packages</a>
