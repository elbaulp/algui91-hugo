---
author: alex
categories:
- linux
- gentoo
color: '#2196F3'
date: 2016-08-04 09:05:17
description: 'Solve configure: error you don''t have NSS installed or your version
  is too old'
image: null
introduction: null
lang: en

mainclass: linux
modified: null
tags:
- gentoo
- emerge
- firefox
title: Can't Update to Firefox 48 in Gentoo, NSS Version Too Old
---

Today, when I check for updates in my _Gentoo_ machine, the new Firefox 48 was released. But when I tried to update I kept getting this error:

```bash
configure: error: you don't have NSS installed or your version is too old
```

<!--more--><!--ad-->

I tried to enable the `NSS` _USE_ flag, but did not work, so I went to the [Gentoo forums](https://forums.gentoo.org/viewtopic-p-7951120.html#7951120 "Can't update to firefox 48") and asked there. After a few minutes they answered me, it is a current [bug](https://bugs.gentoo.org/show_bug.cgi?id=590424) that need to be solved. But fortunately there is a workaround until the bug is fixed:

```bash
echo "=dev-libs/nss-3.24 ~amd64" >> /etc/portage/package.accept_keywords
emerge -u nss
emerge =www-client/firefox-48.0
```

Executing the above in a terminal as root will force portage to install the version 3.24 of _NSS_, and then firefox will not complain about the old version.

Once firefox 48 is installed, we can enjoy the [new multiprocessing feature](http://arstechnica.com/information-technology/2016/08/firefox-48-ships-bringing-rust-mainstream-and-multiprocess-for-some/ "Firefox 48 ships, bringing Rust mainstream and multiprocess for some").

Thanks to _fedeliallalinea_ for solving me the problem in the forums!
