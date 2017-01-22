---
author: alex
categories:
- linux
- opensource
- procesos
color: '#2196F3'
date: '2016-12-12'
lastmod: 2016-10-01
layout: post.amp
mainclass: linux
permalink: /liberada-la-version-10-de-htop/
tags:
- htop
title: "Liberada la versi\xF3n 1.0 de htop"
---

Si monitorizáis el estado de vuestros sistemas con [Linux][1] probablemente conozcáis el célebre comando top, que permite acceder a esa información en modo consola de una forma más visual de la que suele ofrecer el simple ‘ps’. Y seguro que también conocéis htop, que ocho años después acaba de anunciar su versión 1.0.

Podéis **consultar las mejoras** en la <a target="_blank" href="http://htop.sourceforge.net/index.php?page=downloads">página oficial del proyecto en SourceForge</a>, y por supuesto tenéis a vuestra disposición tanto el <a target="_blank" href="http://htop.sourceforge.net/index.php?page=downloads#sources">código fuente</a> como [binarios][2] preparados para diversas distribuciones. Quien quiera agradecer al autor su trabajo, puede <a target="_blank" href="http://sourceforge.net/donate/index.php?group_id=108839">invitarle a una cervecita.</a>

El autor explica en la página del proyecto las mejoras de esta nueva versión:

<!--more--><!--ad-->

I am extremely happy to announce htop 1.0!

Time flies, I can&#8217;t believe it&#8217;s been eight years of development
already. It seems like yesterday that I&#8217;ve decided to stop writing PID
numbers every time I wanted to kill a process and started this
project. I am very happy to see this little project grow into a
reality, see it being included in repositories for many distributions,
reading nice reviews arond the web, receiving many contributions from
coders from all over the world who helped making htop better and
better over the years, and getting short &#8220;thank you!&#8221; emails that
always make my day. Thanks to all distro packagers, reviewers, code
contributors, users. The free software community is amazing; if it
wasn&#8217;t for all of you, htop wouldn&#8217;t be what it is now. Version
numbers are more symbolic than anything, but the stability of htop 0.9
in the past year and the cool new features introduced in this release
compelled me to call this version 1.0. We all deserve this little
&#8220;achievement&#8221;.

*   Performance improvements
*   Support for splitting CPU meters into two or four columns (thanks to Wim Heirman)
*   Switch from PLPA, which is now deprecated, to HWLOC.
*   Bring back support for native Linux sched_setaffinity, so we don’t have to use HWLOC where we don’t need to.
*   Support for typing in user names and column fields in selection panels.
*   Support for UTF-8 tree drawing (thanks to Bin Guo)
*   Option for counting CPUs from zero (thanks to Sean Noonan)
*   Meters update in every screen (no longer halting while on Setup, etc.)
*   Stricter checks for command-line options (thanks to Sebastian Pipping)
*   Incremental filtering (thanks to Seth Heeren for the idea and initial implementation)
*   Try harder to find the ncurses header (thanks to Moritz Barsnick)
*   Man page updates (thanks to Vincent Launchbury)
*   BUGFIX: Support larger numbers for process times.  (thanks to Tristan Nakagawa for the report.)
*   BUGFIX: Segfault in BarMeterMode_draw() for small terminal widths (patch by Sebastian Pipping)

Que traduzco a continuación:

El tiempo vuela, no puedo creer que hayan pasado ya 8 años de desarrollo. Parece que fue ayer cuando decidí dejar de escribir números de PID cada vez que quería matar un proceso y empecé este proyecto. Estoy muy contento de ver este proyecto crecer hasta llegar a ser una realida, verlo incluido en los repositorios de muchas distribuciones, leer agradables revisiones por toda la web, recibir correos de muchos contribuidores de todo el mundo que han ayudado a htop a mejorar con los años, y recibir emails cortos que simplemente decían &#8220;gracias!&#8221; y me alegraban el día. Gracias a todos los empaquetadores de distros, revisores, contribuidores de código, usuarios. La comunidad del software libre es increible; si no fuera por todos ellos, htop no sería lo que es hoy. Los números de las versiones son méramente simbólicos, pero la estabilidad de htop 0.9 el los años pasados y las nuevas características introducidas en esta &#8220;release&#8221;, me obliga a llamar a esta versión la 1.0. Todos merecemos este pequeño logro.

Para instalarlo tan solo debéis escribir en el terminal:

```bash
sudo aptitude install htop
```

Al ejecutarlo veremos algo parecido a lo siguiente:

<figure>
	<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" alt="linux htop" width="800" height="640" src="https://4.bp.blogspot.com/-ZCdSHEPwhvc/TswerYkwIZI/AAAAAAAAB1U/j909jru88cU/s800/Screenshot-Terminal.png"></amp-img>
</figure>

Vía <a target="_blank" href="http://www.muylinux.com/2011/11/22/ocho-anos-despues-llega-htop-1-0/">MuyLinux</a>

Fuente <a target="_blank" href="http://htop.sourceforge.net/index.php?page=main">htop.sourceforge.net</a>

 [1]: https://elbauldelprogramador.com/tags/linux
 [2]: http://htop.sourceforge.net/index.php?page=downloads#binaries