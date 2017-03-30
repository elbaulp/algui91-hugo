---
author: alex
categories:
- how to
- linux
date: '2016-01-01'
lastmod: 2017-03-30T17:09:13+01:00
mainclass: linux
url: /configurar-xmonad-con-trayer-y-fondo-de-pantalla-aleatorio/
tags:
- feh
- trayer
- xmonad
title: Configurar xmonad con trayer y fondo de pantalla aleatorio
---

A lo largo de los años he probado varios gestores de ventanas, como fluxbox, [openbox][1] y el más reciente xmonad, casi puedo decir que es el definitivo por su capacidad de configuración.

La <a href="http://www.haskell.org/haskellwiki/Xmonad/Config_archive/John_Goerzen%27s_Configuration" target="_blank">instalación</a> es muy sencilla. En este artículo voy a profundizar más en los dos aspectos que más problemas me han causado, configurar apropiadamente trayer y establecer fondos de pantalla aleatoriamente.

<!--more--><!--ad-->

> __NOTA__: Hace tiempo que dejé de usar _xmonad_ ahora uso [DWM](https://elbauldelprogramador.com/instalar-y-configurar-dwm-el-gestor-de-ventanas-mas-eficiente/ "Instalar y configurar DWM, el gestor de ventanas más eficiente")

# Configurar trayer

La documentación oficial de xmonad configura **trayer** de forma se ejecute al iniciar sesión modificando el archivo **~/.xsession** tal que así:

```bash
#!/bin/bash

# Load resources

xrdb -merge .Xresources

# Set up an icon tray

trayer --edge top --align right --SetDockType true --SetPartialStrut true
 --expand true --width 10 --transparent true --tint 0x191970 --height 12 &

# Set the background color<

xsetroot -solid midnightblue

# Fire up apps

gajim &

xscreensaver -no-splash &

if [ -x /usr/bin/nm-applet ] ; then
   nm-applet --sm-disable &
fi

if [ -x /usr/bin/gnome-power-manager ] ; then
   sleep 3
   gnome-power-manager &
fi

exec xmonad

```

Este xsession no me lanzaba trayer, así que lo saqué fuera a un script aparte:

```bash
#!/bin/bash

trayer --edge top --align right --SetDockType true --SetPartialStrut true --expand true --width 15 --height 20 --transparent true --tint 0x000000 --monitor 1 &

if [ -x /usr/bin/nm-applet ] ; then
   nm-applet --sm-disable &
fi

if [ -x /usr/bin/gnome-power-manager ] ; then
   sleep 1
   gnome-power-manager &
fi

```

<p class="alert">
  NOTA: En el portatil tuve problemas con gnome-power-manager y decidí instalar xfce4-power-manager, que funcionó correctamente
</p>

Finalmente, añadí el script al crontab con la opción @reboot, que en teoría debe ejecutarse en cada inicio del pc (ejecutando **crontab -e**):

```bash
SHELL=/bin/bash
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin

@reboot /home/hkr/bin/trayerxmonad.sh

```

Pero no dió resultado, así que como última opción, asigne una combinación de teclas al script en el archivo de configuración de xmonad (**xmonad.hs**):

```bash
import XMonad
import XMonad.Config.Azerty
import XMonad.Hooks.DynamicLog
import XMonad.Hooks.ManageDocks
import XMonad.Util.Run(spawnPipe)
import XMonad.Util.EZConfig
import Graphics.X11.ExtraTypes.XF86
import XMonad.Layout.Spacing
import XMonad.Layout.NoBorders(smartBorders)
import XMonad.Layout.PerWorkspace
import XMonad.Layout.IM
import XMonad.Layout.Grid
--import XMonad.Actions.GridSelect
import Data.Ratio ((%))
import XMonad.Actions.CycleWS
import qualified XMonad.StackSet as W
import System.IO

myWorkspaces  = ["1","2","3","4","5","6", "7"]
myLayout = onWorkspace "4" pidginLayout $ onWorkspaces ["2", "7"] nobordersLayout $ tiled1 ||| Mirror tiled1 ||| nobordersLayout
 where
  tiled1 = spacing 5 $ Tall nmaster1 delta ratio
  --tiled2 = spacing 5 $ Tall nmaster2 delta ratio
  nmaster1 = 1
  nmaster2 = 2
  ratio = 2/3
  delta = 3/100
  nobordersLayout = smartBorders $ Full
  gridLayout = spacing 8 $ Grid
  --gimpLayout = withIM (0.20) (Role "gimp-toolbox") $ reflectHoriz $ withIM (0.20) (Role "gimp-dock") Full
  pidginLayout = withIM (18/100) (Role "buddy_list") gridLayout
myManageHook = composeAll
     [ className =? "File Operation Progress"   --> doFloat
     , resource =? "desktop_window" --> doIgnore
     , className =? "xfce4-notifyd" --> doIgnore
     --, className =? "Iron" --> doShift "1:main"
     , className =? "Firefox" --> doShift "2"
     , className =? "Gimp" --> doFloat
     , className =? "Vlc" --> doShift "7"
     ]
main = do
    xmproc <- spawnPipe "/usr/bin/xmobar ~/.xmobarrc"
    xmonad $ defaultConfig
        { manageHook = manageDocks <+> myManageHook -- make sure to include myManageHook definition from above
                        <+> manageHook defaultConfig
        , layoutHook = avoidStruts $ myLayout
        , logHook = dynamicLogWithPP xmobarPP
            { ppOutput = hPutStrLn xmproc
               , ppTitle = xmobarColor "#2CE3FF" "" . shorten 50
            }
        , modMask = mod4Mask     -- Rebind Mod to the Windows key
        , workspaces     = myWorkspaces
        , normalBorderColor = "#60A1AD"
        , focusedBorderColor = "#68e862"
        , borderWidth    = 2
        } `additionalKeys`
        [ ((mod4Mask .|. shiftMask, xK_z), spawn "xscreensaver-command -lock")
        , ((mod4Mask, xK_KP_Enter), spawn "exe=`dmenu_run -b -nb black -nf yellow -sf yellow` && eval "exec $exe"") -- spawn dmenu
        , ((mod4Mask, xK_Return), spawn "terminator") -- spawn terminator terminal
        , ((mod4Mask, xK_w), spawn "/usr/bin/firefox")
        , ((mod4Mask, xK_f), spawn "nautilus --no-desktop")
        , ((mod4Mask, xK_s), spawn "~/Pictures/wall_aleatorio.sh")
        , ((0, xF86XK_HomePage), spawn "gedit ~/.xmonad/xmonad.hs") -- hit a button to open the xmonad.hs file
        , ((mod4Mask, xK_m), spawn "vlc") -- hit a button to run mpd with ncmpcpp
        , ((mod4Mask .|. shiftMask, xK_F4), spawn "sudo shutdown -h now") -- to shutdown
        , ((0, xF86XK_AudioLowerVolume), spawn "amixer set Master 3%-") -- decrease volume
        , ((0, xF86XK_AudioRaiseVolume), spawn "amixer set Master 3%+") -- increase volume
        , ((0, xF86XK_AudioMute), spawn "amixer set Master toggle") -- mute volume
        --, ((controlMask .|. shiftMask, xK_Right), spawn "ncmpcpp next") -- play next song in mpd
        --, ((controlMask .|. shiftMask, xK_Left), spawn "ncmpcpp prev") -- play previous song
        , ((mod4Mask, xK_Up ), windows W.swapUp) -- swap up window
        , ((mod4Mask, xK_Down ), windows W.swapDown) -- swap down window
        , ((mod4Mask, xK_KP_Add ), sendMessage (IncMasterN 1)) -- increase the number of window on master pane
        , ((mod4Mask, xK_KP_Subtract ), sendMessage (IncMasterN (-1))) -- decrease the number of window
        , ((controlMask,        xK_Right   ), sendMessage Expand) -- expand master pane
        , ((controlMask,        xK_Left   ), sendMessage Shrink) -- shrink master pane
        , ((controlMask, xK_Print), spawn "sleep 0.2; scrot -s")
        , ((0, xK_Print), spawn "gnome-screenshot -i")
        , ((0, xF86XK_Calculator), spawn "~/bin/trayerxmonad.sh")
        , ((mod4Mask .|. shiftMask, xK_e), spawn "~/Desktop/eclipse/eclipse") -- eclipse
        ]

```

Concretamente la tecla con el iconito de la calculadora:

```bash
, ((0, xF86XK_Calculator), spawn "~/bin/trayerxmonad.sh")

```

# Configurar fondos de pantalla aleatorios

Antes de continuar, es necesario instalar **feh** para establecer fondos de pantalla:

```bash
sudo aptitude install feh
```

Para conseguir que cada x tiempo el fondo de pantalla cambie, creé un script, que selecciona aleatoriamente una imagen de una carpeta:

```bash
#!/bin/bash
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin
export DISPLAY=:0.0

picsfolder="/home/hkr/Pictures/HD/"
cd $picsfolder

files=(*.jpg)
N=${#files[@]}

((N=RANDOM%N))
randomfile1=${files[$N]}

feh --bg-fill $picsfolder$randomfile1

```

Seguidamente, configuré crontab para que ejecutara dicho script cada 5 minutos por ejemplo:

```bash
$ hkr-> crontab -l
SHELL=/bin/bash
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin
*/5 * * * * /home/hkr/Pictures/wall_aleatorio.sh

```

Así luce mi escritorio con xmonad:

<figure>
        <a href="/img/2013/01/Screenshot-from-2013-01-02-1852312-1024x409.png">
          <amp-img
            on="tap:lightbox1"
            role="button"
            tabindex="0"
            layout="responsive"
            src="/img/2013/01/Screenshot-from-2013-01-02-1852312-1024x409.png"
            alt="xmonad Desktop"
            title="xmonad Desktop"
            sizes="(min-width: 1024px) 1024px, 100vw"
            width="1024"
            height="409">
          </amp-img>
        </a>
        <figcaption>Mi escritorio en Xmonad</figcaption>
</figure>


# Referencias

- *Askubuntu* »» <a href="http://askubuntu.com/questions/117978/script-doesnt-run-via-crontab-but-works-fine-standalone" target="_blank">Visitar sitio</a>


 [1]: https://elbauldelprogramador.com/configurar-dos-pantallas-en-openbox/
