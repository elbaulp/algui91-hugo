+++
title = "Actualizar automáticamente el kernel en Gentoo"
date = "2017-09-15T17:44:41+02:00"
lastmod = "2017-09-23T12:22:08+01:00"
author = "alex"
mainclass = "linux"
image = "upgrade-gentoo-kernel-automatically.png"
categories = ["gentoo", "linux"]
tags = ["gentoo", "emerge", "kernel", "portage"]
description = "Tras varios años usando Gentoo y actualizando el kernel a mano con cada nueva versión, he decidido crear un script que haga el trabajo por mi."
url = "/actualizar-kernel-gentoo-automaticamente/"
+++

Llevo unos cuantos años usando [Gentoo](https://elbauldelprogramador.com/categories/gentoo/ "post sobre Gentoo"), y cada vez que salía una actualización del [kernel](https://elbauldelprogramador.com/tags/kernel/ "posts sobre kernel") terminaba visitando la página <a href="https://wiki.gentoo.org/wiki/Kernel/Upgrade" target="_blank" title="Kernel/Upgrade">Kernel/Upgrade</a> de la Wiki de Gentoo. Tras casi aprenderme los pasos de memoria, decidí que iba siendo hora de escribir un [script](https://elbauldelprogramador.com/tags/bash/ "post sobre bash") que automatizara el proceso.

El script es bastante simple, lo publico por si a alguien le resulta útil:

```bash
#!/usr/bin/env bash

## Upgrade gentoo kernel

# The first and only argument must be the folder name of the new kernel.

# Stop script when an error occurs
set -o errexit
set -o pipefail
set -o nounset
# For debugging purposes
set -o xtrace

readonly kernel_path='/usr/src/'

_usage () {
    local script_name="$0"
    echo "Usage: $0 <newkernelfolder>"
}

_main () {
    echo "Backing up old kernel..."
    cd "${kernel_path}/linux/"
    cp .config ~/kernel-config-"$(uname -r)"
    echo "Copying old configuration..."
    cp /usr/src/linux/.config /tmp/.config
    echo "Setting new kernel as default..."
    #ln -sf /usr/src/"$1" /usr/src/linux
    cp /tmp/.config /usr/src/linux/
    eselect kernel set 2
    cd /usr/src/linux/
    echo "Building..."
    make -j4 olddefconfig
    make -j4 modules_prepare
    make modules_install
    emerge --ask @module-rebuild
    make -j4
    make install
    echo "Please, update your EFI entry: cp /boot/vmlinuz-*-gentoo /boot/efi/boot/bootx64.efi"
}


if [[ $# -eq 1 ]]
then
    _main $1
else
    _usage
fi
```

Para usarlo basta con ejecutar:

<!--more--><!--ad-->

```bash
$ sudo ./updatekernel.sh <nombre-carpeta-kernel>
## por ejemplo
$ sudo ./updatekernel.sh linux-4.12.12-gentoo
```

El script se puede mejorar aún bastante, si te apetece **contribuir**, está alojado en mi repositorio de <a href="https://github.com/elbaulp/dotfiles/blob/master/home/bin/updatekernel.sh" target="_blank" title="elbaulp/dotfiles">Dotfiles.</a>

Tras escribir el script, me dí cuenta que portage tiene una opción para añadir hooks a los paquetes, concretamente hay uno para que el kernel se compile e instale automáticamente. Al probarlo me dí cuenta de que no usa el `.config` del kernel anterior. Seguramente se pueda configurar para que lo haga,  pero ya que escribí el script, decidí usarlo.


Espero que te sea útil!
