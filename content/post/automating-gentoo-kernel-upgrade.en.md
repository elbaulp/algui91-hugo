+++
title = "Upgrading Gentoo kernel automatically"
date = "2017-09-15T17:44:34+02:00"
lastmod = "2017-09-23T12:22:14+01:00"
author = "alex"
mainclass = "linux"
image = "upgrade-gentoo-kernel-automatically.png"
categories = ["linux"]
tags = ["emerge", "howto", "gentoo"]
description = "After a few years using Gentoo and upgrading each new kernel version manually, I decided to automate the process, here is how."
url = "/en/upgrade-gentoo-kernel-automatically/"
+++


I've been using [Gentoo](https://elbauldelprogramador.com/en/tags/gentoo "Posts about Gentoo") for a few years now. And every time a new kernel version went out, I ended visiting <a href="https://wiki.gentoo.org/wiki/Kernel/Upgrade" target="_blank" title="Gentoo's wiki Kernel/Upgrade page">Gentoo's wiki page Kernel/Upgrade</a> and following its steps to upgrade the kernel.

But I thought it would be better to automate the process, so I wrote a simple *bash script* that from now on will do the work for me. It may be useful for other Gentoo users:

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

To use it, simply write:

```bash
$ sudo ./updatekernel.sh linux-4.12.12-gentoo
```

Where `linux-4.12.12-gentoo` is the name of the new kernel.

**Contributions** are welcome, because there is still room for improvement, you can check the script in my <a href="https://github.com/elbaulp/dotfiles/blob/master/home/bin/updatekernel.sh" target="_blank" title="elbaulp/dotfiles">Dotfiles repository.</a>


<!--more--><!--ad-->

After writing the script, I saw [portage](https://elbauldelprogramador.com/en/tags/portage/ "portage posts") already have hooks for execute actions when new **ebuilds** are downloaded, but when I tried it I realized that the `.config` from my previous kernel was not being picked up. I am sure there is a way to tell portage hooks to use the previous config, but since I've already wrote the script, I decided to use it.

Hope you find the script useful!

# Update

I posted this script on the <a href="https://www.reddit.com/r/Gentoo/comments/70b8sl/upgrading_gentoo_kernel_automatically/" target="_blank" title="Gentoo Subreddit /r/Gentoo">Gentoo subreddit /r/Gentoo</a> and it has received a lot of comments. Some redditors had posted its own ways to update a kernel automatically, here are some of them:

- <a href="https://www.reddit.com/r/Gentoo/comments/70b8sl/upgrading_gentoo_kernel_automatically/dn1zjmj/" target="_blank" title="htay6r7ce script">htay6r7ce</a> script:

```bash
eselect kernel list
eselect kernel set #

# Use current kernel config and store copy
gunzip /proc/config.gz -c > /root/config; cp /root/config /root/config-$(uname -r)

#  Optionally change module settings in the config file, or use --menuconfig
#  with genkernel.
genkernel --makeopts=-j9 --splash --kernel-config=/root/config all

# Update packages with kernel modules
emerge -1 @module-rebuild

# Cleanup old files
for name in $(ls /lib/modules/ | sort -V | head -n -3); do
  rm -rf /boot/{initramfs,kernel,System.map}-genkernel-x86_64-${name:?}
  rm -rf /lib/modules/${name:?}
done

# Update boot config file
grub-mkconfig -o /boot/grub/grub.cfg
```

- <a href="https://www.reddit.com/r/Gentoo/comments/70b8sl/upgrading_gentoo_kernel_automatically/dn3x5hp/" target="_blank" title="Btirooh Script">Btirooh script</a> its repo <a href="https://github.com/jeekkd/gentoo-kernel-build" target="_blank" title="jeekkd/gentoo-kernel-build">jeekkd/gentoo-kernel-build</a>.
- <a href="https://www.reddit.com/r/Gentoo/comments/70b8sl/upgrading_gentoo_kernel_automatically/dn32vf3/" target="_blank" title="KernelKunt">KernelKunt</a> has its script on github: <a href="https://github.com/t4nki/kupdate" target="_blank" title="t4nki/kupdate">t4nki/kupdate</a>
- And finally, <a href="https://www.reddit.com/r/Gentoo/comments/70b8sl/upgrading_gentoo_kernel_automatically/dn2tgbk/" target="_blank" title="sQu1rr">sQu1rr</a> kernel update on <a href="https://gist.github.com/sQu1rr/6d40a81a40de44b5f4e5b2b50899f888" target="_blank" title="Github Gists">github gists.</a>

All of them are far more elaborate than mine, so I will try to use them and improve mine.
