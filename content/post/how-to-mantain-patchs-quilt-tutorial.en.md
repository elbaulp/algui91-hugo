+++
author = "alex"
date = "2017-01-30"
title = "How to manage multiple patches - A Quilt tutorial"
description = "Quilt Tool allow us to easily manage multiple patchs in a program"
tags = ["quilt", "software", "patchs"]
categories = ["dev"]
image = ""
mainclass = "dev"
+++

I am using [DWM](https://elbauldelprogramador.com//tags/dwm/ "DWM") since a couple of years, even wrote a patch to allow the user color its status bar (https://elbauldelprogramador.com/statuscolor-dwm-6-1/ "Colorear la barra de estado con Simple StatusColor en DWM 6.1"). Since then, I never check out the new code in DWM that was being released because I did not think I would be able to merge the new code with my personalized DWM. That was until I discovered <a href="https://github.com/jceb/dwm-patches" target="_blank" title="DWM-Patches">DWM-Patches</a> and learned to use _quilt_.

# What is Quilt?

Well, here is its `man` description:

> Quilt is a tool to manage large sets of patches by keeping track of the changes each patch makes. Patches can be applied, un-applied, refreshed, etc. The key philosophical concept is that your primary output is patches.

<!--more--><!--ad-->

# Basic usage

Lets see an easy example, suppose the file below:

```text
# fichero.txt
line 1
line 2
line 3
```

`fichero.txt` would be our base file.

# Creating a patch

To create a new patch, we need to execute `quilt new patch1.diff`:

```bash
$ quilt new patch1.diff
Patch patches/patch1.diff is now on top
```

# Making changes

Now, tell `quilt` what file we want to edit:

```bash
$ quilt edit fichero.txt
File fichero.txt added to patch patches/patch1.diff
```

Now, we are all set to edit the file, lets write one sentence:

```text
linea 1
edit 1 (by patch1.diff)
linea 2
linea 3
```

# See the changes

Once we have finish editing the file, we can see its diff:

```diff
$ quilt diff
Index: _drafts/fichero.txt
===================================================================
--- _drafts.orig/fichero.txt
+++ _drafts/fichero.txt
@@ -1,3 +1,4 @@
 linea 1
+edit 1 (by patch1.diff)
 linea 2
 linea 3
```

# Creating the patch

The patch it is not created yet, for that we need to execute:

```bash
$ quilt refresh
Refreshed patch patches/patch1.diff
```

# Manage Patches

All right, now in `patches/` there is a patch called `patch1.diff`, it store our changes to `fichero.txt`. Right now we only have one patch, in order to undo all the changes and restore `fichero.txt` to its original state we must execute:

```bash
$ quilt pop
Removing patch patches/patch1.diff
Restoring fichero.txt

No patches applied
```

Now `fichero.txt` do not have our modification:

```text
$ cat fichero.txt
linea 1
linea 2
linea 3
```

If we have more than one patch, `quilt pop` accepts as input the patch name, or `-a` option to remove all applied patches. Lets create one second patch:


# Second patch

Before creating a new patch, it is necessary to apply the first, or if we had many, all of them:

```bash
$ quilt push -a
Applying patch patches/patch1.diff
patching file fichero.txt

Now at patch patches/patch1.diff
```

Now we can create a second patch:

```bash
$ quilt new patch2.diff
Patch patches/patch2.diff is now on top
```

## List the patch stack

In order to see how many patchs we have, execute `quilt series`:

```bash
$ quilt series
patches/patch1.diff
patches/patch2.diff
```

The bottom patch is `patch2`, right now it is empty, because at the moment we have not edit anything. For this patch we are goint to modify `fichero1.txt` and create a second one, `fichero2.txt`

```bash
$ quilt add fichero2.txt
File fichero2.txt added to patch patches/patch2.diff
$ quilt add fichero.txt
File fichero.txt added to patch patches/patch2.diff
$ echo "Line created by patch2.diff" >> fichero.txt
$ echo "New file created by patch2.diff" > fichero2.txt
```

``` diff
$ quilt diff
Index: _drafts/fichero.txt
===================================================================
--- _drafts.orig/fichero.txt
+++ _drafts/fichero.txt
@@ -2,3 +2,4 @@ linea 1
 edit 1 (by patch1.diff)
 linea 2
 linea 3
+Line created by patch2.diff
Index: _drafts/fichero2.txt
===================================================================
--- /dev/null
+++ _drafts/fichero2.txt
@@ -0,0 +1 @@
+New file created by patch2.diff
```

Finally, all that is left is apply the changes with `quilt refresh`:

```bash
$ quilt refresh
Refreshed patch patches/patch2.diff
```

When finished editing, it is recommended to restore the initial state, undoing all the patchs:

```bash
$ quilt pop -a
Removing patch patches/patch2.diff
Restoring fichero.txt
Removing fichero2.txt

Removing patch patches/patch1.diff
Restoring fichero.txt

No patches applied

$ ll

-rw-r--r-- 1 hkr hkr   24 Jan 30 18:31 fichero.txt
drwxr-xr-x 2 hkr hkr 4.0K Jan 30 18:29 patches/
drwxr-xr-x 2 hkr hkr 4.0K Jan 30 18:31 .pc/
```

To apply them again:

```bash
$ quilt push -a
Applying patch patches/patch1.diff
patching file fichero.txt

Applying patch patches/patch2.diff
patching file fichero.txt
patching file fichero2.txt

Now at patch patches/patch2.diff

$ ll

-rw-r--r-- 1 hkr hkr   38 Jan 30 18:32 fichero2.txt
-rw-r--r-- 1 hkr hkr   89 Jan 30 18:32 fichero.txt
drwxr-xr-x 2 hkr hkr 4.0K Jan 30 18:29 patches/
drwxr-xr-x 4 hkr hkr 4.0K Jan 30 18:32 .pc/
```

In order to see a real, more complicated example, visit my  <a href="https://github.com/algui91/myDWM" target="_blank" title="DWM">DWM</a> repo.

# Bibliography

- UsingQuilt | <a href="https://wiki.debian.org/UsingQuilt" target="_blank" title="Using Quilt | Debian Wiki">wiki.debian.org</a>
- How To Survive With Many Patches | <a href="https://stuff.mit.edu/afs/athena/system/i386_deb50/os/usr/share/doc/quilt/quilt.html" target="_blank" title="How to survive with many patches">stuff.mit.edu</a>
