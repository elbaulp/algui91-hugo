---
author: alex
categories:
- sin categoria
color: '#2196F3'
date: '2016-12-12'
lastmod: 2016-08-15
layout: post.amp
mainclass: linux
permalink: /grub-customizer-20/
title: Grub Customizer 2.0
---

<figure>
    <amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" alt="Grub Customizer 2.0" width="800" height="508" src="https://lh3.ggpht.com/_1QSDkzYY2vc/TOmPPw_WKsI/AAAAAAAACUo/3JHDf60vuSc/s800/grub-customizer-2.0.png"></amp-img>
</figure>

__With the release of version 2.0, Grub Customizer becomes the most complete GRUB 2 graphical configuration tool__


Grub Customizer - a new graphical GRUB 2 and BURG settings manager -, 2.0 has been released today with a lot of enhancements: <b>you can now select the default boot entry</b>, change the menu visibility and timeout, set kernel parameters, disable recovery entries and change screen resolution (GFX_MODE) - all by using Grub Customizer.

<figure>
    <amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" width="695" height="465" alt="Grub Customizer appearance" src="https://lh4.ggpht.com/_1QSDkzYY2vc/TOmPgMD2l4I/AAAAAAAACUs/O4iov5Q5lMY/s800/grub-customizer-appearence.png"></amp-img>
    <figcaption>(Grub Customizer 2.0 - Appearance preferences)</figcaption>
</figure>

Besides the above new features, <b>Grub Customizer 2.0</b> also brings some GRUB 2 only specific settings (they don&#8217;t work for BURG) like changing the menu colors or background image. Please note that these appearance options worked for me in Ubuntu 10.04 but did not work in Ubuntu 10.10 - however this might happen because I&#8217;ve messed a lot with the GRUB 2 configuration (including running the <a href="http://www.webupd8.org/2010/10/script-to-fix-ubuntu-plymouth-for.html" title="Script To Fix The Ubuntu Plymouth For Proprietary Nvidia And ATI Graphics Drivers">script for fixing the Plymouth</a>).

<figure>
    <amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" alt="Grub 2 - colors" width="633" height="476" src="https://lh3.ggpht.com/_1QSDkzYY2vc/TOmWY9zu60I/AAAAAAAACUw/T1I8twGbj9g/s800/grub2-colors.png"></amp-img>
    <figcaption>(GRUB 2 with new colors)</figcaption>
</figure>

## Install Grub Customizer in Ubuntu:

```bash
sudo add-apt-repository ppa:danielrichter2007/grub-customizer
sudo apt-get update
sudo apt-get install grub-customizer
```

Once installed, you can find it under <i>Applications > System Tools > Grub Customizer</i>.

For other Linux distributions: download <a class="external" href="https://code.launchpad.net/grub-customizer">Grub Customizer @ Launchpad</a> (you&#8217;ll have to get it through BZR).

_For a similar BURG only tool, see <a href="http://www.webupd8.org/2010/11/burg-manager-10-released-with-option-to.html">Burg Manager</a>._

## Source

Source: <a href="http://www.webupd8.org/2010/11/grub-customizer-20-can-change-default.html" target="_blank">webupd8.org</a>