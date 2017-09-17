---
author: alex
categories:
- linux
date: 2016-08-17 08:06:32
description: How to change portage folders and temp folder to other directory
image: como-instalar-actualizar-elminar-paquetes-gentoo.png
introduction: How to change portage folders and temp folder to other directory
mainclass: linux
tags:
- gentoo
- portage
- howto
title: How to Change Portage Folders to Other Location in Gentoo
---

Recently I had a problem with `portage` and its `tmp` directory in `/var/tmp/portage` in [Gentoo](/tags/gentoo). I had no space left in the disk, the error message was:

```bash
There is NOT at least 10 GiB disk space at "/var/tmp/portage
```

So first I decided to change all the `portage` files to my secondary hard disk drive, here is how to change `portage` folders to a new location.



# Changing /etc/portage/make.conf file

<!--more--><!--ad-->

Suppose the new directory is `/home/hkr/ssd2/portage`.

The first thing to to is update the environment variables `PORTDIR, DISTDIR` and `PKGDIR` to point to the new location, so in the file `make.conf` we need to write:

```bash
PORTDIR="/home/hkr/ssd2/portage"
DISTDIR="${PORTDIR}/distfiles"
PKGDIR="${PORTDIR}/packages"
```

# Syncing portage tree

Now that we had updated the variables, we need to `sync` portage:

```bash
emerge --sync
```

After that, `portage` now knows about the new location, but there is one more thing to do.

# Symlinking make.profile to the new location

After syncing `portage`, one last thing to do is symlinking `make.profile` to the new location, previously it was a symlink to `/usr/portage/profiles/default/linux/amd64/13.0/desktop/`, but we need to update it to the new location. Here is how:

```bash
ln -s /home/hkr/ssd2/portage/profiles/default/linux/amd64/13.0/desktop /etc/portage/make.profile
```

Now everything is right and we have changed the `portage` location and get rid of the space problems.

# Changing only the tmp directory (/var/tmp/portage)

After doing the previous steps, I realized that it would be a better option to only change the location of the `tmp` portage directory (by default `/var/tmp/portage`), that was the original problem, because I did not had enough space left there. So a better option would be leave `make.conf` as we had it previously, and only add a new variable:

```bash
PORTAGE_TMPDIR="/home/hkr/ssd2/"
```

Hope it helps!.

# References

- [`/var/tmp/portage: not enough space`](https://forums.gentoo.org/viewtopic-t-774539.html "/var/tmp/portage: not enough space")
- [`moving portage folders`](https://forums.gentoo.org/viewtopic.php?t=120770 "moving portage folders [SOLVED]")
