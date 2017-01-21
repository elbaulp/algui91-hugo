---
author: alex
categories:
- articulos
color: '#F57C00'
description: "Ahorro de energ\xEDa es el tema hot para los usuarios de laptop que
  necesitan tener las cosas hechas cuando est\xE1n en movimiento y corriendo con el
  l\xEDmite de energ\xEDa de la bater\xEDa. Aqu\xED hay una lista de ingeniosos trucos
  Linux para ahorrar la energ\xEDa de tu bater\xEDa."
layout: post.amp
mainclass: articulos
permalink: /como-maximizar-la-vida-de-la-bateria-en-tu-laptop-linux/
tags:
- ahorro energia
- baterias notebook linux
- como usar powertop linux
- kernel
- laptop
- optimizar energia en ubuntu
title: "C\xF3mo maximizar la Vida de la Bater\xEDa en tu Laptop Linux"
---

[<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2012/07/sshot4cb822438c27c1.jpg" alt="" title="sshot4cb822438c27c" width="650px" height="306px" />][1]

***<a href="http://www.flickr.com/photos/wolfhound/3167885873/sizes/m/in/photostream/" target="_blank">Foto por Sighthound</a>***

Ahorro de energía es el tema hot para los usuarios de laptop que necesitan tener las cosas hechas cuando están en movimiento y corriendo con el límite de energía de la batería. Aquí hay una lista de ingeniosos trucos Linux para ahorrar la energía de tu batería.

Según<a href="http://www.lesswatts.org/tips/" target="_blank"> Less Watts.org</a>, la principal fuente de consejos sobre ahorro de energía en Linux, los siguientes componentes de nuestra computadora consumen la mayor parte de la vida de la batería y podemos alargarla ajustándolos:

1. Controlador de Red Ethernet
2. WiFi/Wireless
3. Tarjeta gráfica y Pantalla
4. Procesador
5. Discos y Sistema de archivos
6. Software

Te mostraremos algunos consejos básicos de ahorro de energía de la batería y algunos ajustes avanzados del hardware en Ubuntu.

<!--more--><!--ad-->


&nbsp;

**Consejos Básicos de Ahorro de Energía de la Batería**

[<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2012/07/linux_wallpaper1.jpg" alt="" title="linux_wallpaper" width="500px" height="375px" />][2]

***<a href="http://www.flickr.com/photos/acercanto/314496099/sizes/m/" target="_blank">Foto por acercanto</a>
***

Ubuntu viene con un módulo de manejo de energía que nos da un control básico para preservar la vida útil de la batería, abriendo &#8216;System&#8217; > &#8216;Preferences&#8217; > &#8216;Power Management&#8217;.

[<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2012/07/battery_power1.png" alt="" title="battery_power" width="620px" height="457px" />][3]

Podemos extender la vida de la batería seleccionando estas opciones de la pantalla de Power Management:

1. Putting our computer to sleep when it is inactive.

2. Setting our computer to hibernate mode when battery power is low.
3. Slowing down the hard disk spin.
4. Putting display to sleep when it is inactive.
5. Reducing the back light brightness.
6. Dimming display when the computer is idle.

**Wifi/Wireless**

[<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2012/07/wifi1.jpg" alt="" title="wifi" width="500px" height="375px" />][4]

***<a href="http://www.flickr.com/photos/juicelog/363018869/sizes/m/" target="_blank">Foto por Juicelog</a>
***

Nuestro radio Wifi/Wireless consume energía cuando recibe y envía data sobre la red y deberíamos apagarlo cuando no lo usamos. Esto podemos hacerlo si nuestra placa de red soporta el mecanismo de activado y desactivado del control de energía usando el comando &#8216;iwconfig&#8217; que podemos ejecutar en una consola de Ubuntu:

```bash
sudo iwconfig wlan0 txpower off
```

Usamos el siguiente comando para encender nuestra Wifi/Wireless nuevamente:

```bash
sudo iwconfig wlan0 txpower on
```

Nota: Reemplazar &#8216;wlan0&#8242; con el nombre de tu placa de red wireless que se muesta en &#8216;System&#8217; > &#8216;Administration&#8217; > &#8216;Network Tools&#8217; bajo la lista desplegable &#8216;Network Device&#8217;.

**Procesador**

[<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2012/07/4503427549_5ee84b6ea51.jpg" alt="" title="4503427549_5ee84b6ea5" width="500px" height="337px" />][5]

***<a href="http://www.flickr.com/photos/65819195@N00/4503427549/sizes/m/in/photostream/" target="_blank">Foto por chigmaroff</a>***

Linux provee un mecanismo de ajuste sencillo para ahorrar consumo de energía en nuestro procesador mediante la distribución de la carga de procesamiento entre los procesadores disponibles. Si tu laptop viene con multi-procesador, puedes tomar ventaja de la característica &#8216;balance de procesadores&#8217; de Linux para ahorrar consumo de energía, ejecutando este comando en una consola:

```bash
echo 1 &gt; /sys/devices/system/cpu/sched_mc_power_savings
```

**Discos y Sistema de archivos**

[<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2012/07/harddisk1.jpg" alt="" title="harddisk" width="500px" height="334px" />][6]

***Foto por fr3d.org***

Linux mantiene un set de meta data de los sistemas de archivos, incluyendo &#8216;atime&#8217; que muestra el último momento que el archivo fue usado. Aunque esta característica es muy útil para el administrador de sistemas, mantener el tracking de &#8216;atime&#8217; obliga a nuestra laptop escribir en el disco cada vez que un archivo es accedido, incrementando el consumo de la energía de la batería.

**Configurar Relatime**

Podemos desactivar &#8216;atime&#8217; para reducir la escritura en disco al costo de romper el software que depende de &#8216;atime&#8217;. Una alternativa es activar la opción &#8216;relatime&#8217; donde Linux actualizará los tiempos de acceso al archivo sólo si son más actuales que el tiempo de modificación. Este cambio permite que las utilidades puedan ver si la versión actual de un archivo fue leida, pero a su vez acorta significativamente las actualizaciones de &#8216;atime&#8217;.

El Kernel de Linux 2.6.20 y superiores deberían proveer la opción &#8216;relatime&#8217;.

Debe ejecutarse el siguiente comando en la consola para activar la opción &#8216;relatime':

```bash
mount -o remount,relatime /
```

&nbsp;

#### Opciones de Ahorro de Energía del Disco Rígido

Algunos fabricantes de discos rígidos implementan opciones de ahorro de energía en el hardware por lo tanto podemos reducir la energía que nuestro disco rígido consume. Podemos solo activar esta opción cuando vemos *AdvancedPM=yes* luego de ejecutar el siguiente comando en la consola:

```bash
hdparm -i /dev/sda
```

Este es un ejemplo de hdparm:

```bash
Model=FUJITSU, FwRev=000000A0, SerialNo=NS9BT742705B
Config={ HardSect NotMFM HdSw&gt;15uSec Fixed DTR&gt;10Mbs }
RawCHS=16383/16/63, TrkSize=0, SectSize=0, ECCbytes=0
BuffType=DualPortCache, BuffSize=8192kB, MaxMultSect=16, MultSect=16
CurCHS=16383/16/63, CurSects=16514064, LBA=yes, LBAsects=234441648
IORDY=yes, tPIO={min:240,w/IORDY:120}, tDMA={min:120,rec:120}
PIO modes: pio0 pio1 pio2 pio3 pio4
DMA modes: mdma0 mdma1 mdma2
UDMA modes: udma0 udma1 udma2 udma3 udma4 *udma5
<strong>AdvancedPM=yes</strong>: mode=0x80 (128) WriteCache=enabled
Drive conforms to: unknown: ATA/ATAPI-2,3,4,5,6,7
```

```bash
* signifies the current active mode

```

Podemos activar el modo de ahorro de energía usando el comando hdparm, por ejemplo:

```bash
hdparm -B 1 -S 12 /dev/sda
```

&nbsp;

#### Activar el Modo Laptop

Podemos mejorar la vida de la batería activando el modo Laptop Linux para que Linux reduzca las operaciones de E/S cuando nuestra laptop está con poca energía. No todo el hardware viene con el modo laptop por lo tanto necesitamos checkear si nuestro hardware soporta este modo ejecutando el siguiente comando:

```bash
sudo gedit /proc/sys/vm/laptop_mode
```

Si encontramos que el valor en el archivo de texto laptop_mode es 0, significa que el modo está desactivado. Simplemente setea este a 5 con gedit y guarda el archivo para activar el modo laptop.

### Software

Intel introdujo PowerTOP, un software que analiza el consumo de energía del software. <a href="https://www.linuxpowertop.org/powertop.php" target="_blank">Según Intel</a> PowerTOP trabaja mejor con la propiedad tickless idle (NO_HZ) activada (versión 2.6.21 o posterior). Actualmente, sólo kernels de 32-bit tienen soporte para tickless idle; se espera que los kernels de 64-bit agreguen esta característica en la versión 2.6.23.

&nbsp;

You can install PowerTop through the Ubuntu Software Centre and run it by typing the following command from your console.

```bash
sudo powertop
```

&#8220;Wakeups per second&#8221; es un buen indicador para nuestra eficiencia del consumo de energía de la laptop. Nuestra laptop ahorra la mayor cantidad de energía cuando &#8220;Wakeups per second&#8221; muestra un valor bajo. De acuerdo con Intel el número más bajo de wakeups en un entorno de Escritorio Gnome es 3 y deberíamos poder lograrlo ajustando la configuraci��n del hardware o cerrando algunos softwares activos en el sistema.

A continuación vemos un ejemplo de análisis de PowerTOP en el consumo de energía de mi laptop.

[<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/2012/07/powertop1.png" alt="" title="powertop" width="534px" height="514px" />][7]

De acuerdo con el análsis de PowerTOP la causa principal de wakeups en mi laptop es el &#8216;Rescheduling Interrupt&#8217; (reprogramación de la interrupción) que es frecuentemente invocado cuando mi laptop intenta desplegar la actividad del procesador a traves del core Dual Intel Centrino.La reprogramación de la interrupción ocurre cuando el mensaje del kernel IPI es enviado al core dormido para despertarlo del &#8216;low power sleep&#8217; y empezar a correr un proceso cuando el planificador decide descargar trabajo de un core hacia otro core dormido.

Una solución para minimizar las interrupciones es instalar <a href="https://irqbalance.org/" target="_blank">irqbalance</a> que las distribuye sobre los procesadores y cores en tu sistema.

### Referencias

<a href="http://www.lesswatts.org/" target="_blank">Lesswatt.org</a>. LessWatts tiene la intención de crear una comunidad alrededor del ahorro de energía en Linux.

<a href="http://www.linuxpowertop.org/powertop.php" target="_blank">Intel PowerTop</a>. PowerTOP es una herramienta Linux que encuentra los componentes del software que hacen que tu laptop use más energía que la necesaria cuando está inactiva.

&nbsp;

Vía | <a href="http://www.howtogeek.com/55185/how-to-maximize-the-battery-life-on-your-linux-laptop/" target="_blank">howtogeek</a>



 [1]: https://elbauldelprogramador.com/img/2012/07/sshot4cb822438c27c1.jpg
 [2]: https://elbauldelprogramador.com/img/2012/07/linux_wallpaper1.jpg
 [3]: https://elbauldelprogramador.com/img/2012/07/battery_power1.png
 [4]: https://elbauldelprogramador.com/img/2012/07/wifi1.jpg
 [5]: https://elbauldelprogramador.com/img/2012/07/4503427549_5ee84b6ea51.jpg
 [6]: https://elbauldelprogramador.com/img/2012/07/harddisk1.jpg
 [7]: https://elbauldelprogramador.com/img/2012/07/powertop1.png
