---
author: alex
categories:
- dev
mainclass: dev
date: '2016-01-01'
lastmod: 2017-10-08T16:43:08+01:00
image: 2012/12/logicbomb.png
url: /desafio-de-ingenieria-inversa-en-c-soluciones/
tags:
- asm
- c
- hacking
- Ingenieria inversa
title: "Desafío de ingeniería inversa en C. Soluciones"
---

<figure>
    <amp-img sizes="(min-width: 532px) 532px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" title="Bomba" alt="" src="/img/2012/12/logicbomb.png" width="532px" height="449px"></amp-img>
</figure>

Hace unas semanas [hablé de un desafío][1] propuesto por los profesores de Estructura de computadores de mi facultad. Ahora que ha finalizado el plazo de entrega de la práctica, escribo este artículo con los resultados que obtuve.

Como comenté, la practica consiste en averiguar dos contraseñas de un programa escrito en C compilado para 32 bits y sin opciones de depuración. El guión está escrito por los profesores Javier Fernandez y Mancia anguita bajo licencia **creative commons BY-NC-SA** y disponible para descargar más abajo en las referencias.

Todos los programas escritos por los alumnos estan basados en este:

```c
#include <stdio.h>    // para printf()
#include <stdlib.h>   // para exit()
#include <string.h>   // para strncmp()/strlen()
#include <sys/time.h> // para gettimeofday(), struct timeval

    char password[]="abracadabran";
int  passcode  = 7777;

void boom(){
    printf("***************n");
    printf("*** BOOM!!! ***n");
    printf("***************n");
    exit(-1);
}

void defused(){
    printf("·························n");
    printf("··· bomba desactivada ···n");
    printf("·························n");
    exit(0);
}

int main(){
#define SIZE 100
    char pass[SIZE];
    int  pasv;
#define TLIM 5
    struct timeval tv1,tv2; // gettimeofday() secs-usecs

    gettimeofday(&tv1;,NULL);

    printf("Introduce la contraseña: ");
    fgets(pass,SIZE,stdin);
    if (strncmp(pass,password,strlen(password)))
        boom();

    gettimeofday(&tv2;,NULL);
    if (tv2.tv_sec - tv1.tv_sec > TLIM)
        boom();

    printf("Introduce el código: ");
    scanf("%i",&pasv;);
    if (pasv!=passcode) boom();

    gettimeofday(&tv1;,NULL);
    if (tv1.tv_sec - tv2.tv_sec > TLIM)
        boom();

    defused();
}
```

<!--more--><!--ad-->

Al cual se le aplican los métodos deseados por el alumno para cifrar la contraseña que elija.

Conseguí descifrar 2 programas en total, aunque de unos de ellos solo la contraseña alfanumérica, luego veremos la razón. Empecemos con el primer programa:

# Primera Bomba

Puedes descargar el programa desde <a href="https://dl.dropbox.com/u/54765219/Bomba1" target="_blank">este enlace</a>:

Lo primero que hay que hacer es un estudio del comportamiento del programa usando **gdb** y **objdump -d**. Tras ejecutar el programa paso a paso con gdb y predecir cuales son los puntos críticos creé un archivo de configuración para gdb que me ayudara a facilitar el depurado:

```bash
b main
b *0x804a034
b *0x8048706
b *0x80486ec
b *0x80486e7
b *0x80486c9
b *0x80486c4
b *0x804871e
b *0x804872c
b *0x804874e
display /wx $eip
display /32xw $esp
display /s $eax
display /w (char*)$eax
display (char*)0x804a034
display /wx 0x804a03
```

Mediante el proceso de depurado, me dí cuenta que las instrucciones clave eran las siguientes; para la contraseña alfanumérica:

La dirección `0x804a034` es un puntero a la cadena de texto "**aeiouuuu**", con un espacio al final, esta es la contraseña codificada.

En algún punto del programa, se deben comparar la contraseña elegida con la introducida por el usuario con `strncmp`, en dicho punto, la contraseña debe estar decodificada. A base de depurar se observa que ese proceso comienza aquí:

```asm
80486c9: 0f b6 05 34 a0 04 08    movzbl 0x804a034,%eax
80486d0: 83 c0 01                add    $0x1,%eax
80486d3: a2 34 a0 04 08          mov    %al,0x804a034
```

Estas tres instrucciones extraen la primera letra de la contraseña; la **a**, le suman 1 y la vuelven a colocar en la cadena de texto, quedando "**beiouuuu**".

Luego en este fragmento:

```asm
80486d8: 0f b6 05 36 a0 04 08    movzbl 0x804a036,%eax
80486df: 83 e8 02                sub    $0x2,%eax
80486e2: a2 36 a0 04 08          mov    %al,0x804a036
```

Se extrae la **i** y resta dos, quedando **g**, la tercera instrucción sustituye la **i** en la cadena, obteniendo como resultado "**begouuuu**".

No se realizan más modificaciones a la contraseña almacenada en el programa. Ahora toca averiguar qué operaciones se realizan sobre la contraseña introducida por el usuario:

La contraseña introducida por el usuario se encuentra en `0x28(%esp)`, el programa resta uno al segundo caracter de la contraseña introducida y lo sustituye:

```asm
80486e7: 0f b6 44 24 29          movzbl 0x29(%esp),%eax ; con 0x29(%esp) obtiene el segundo caracter
80486ec: 83 e8 01                sub    $0x1,%eax
80486ef: 88 44 24 29             mov    %al,0x29(%esp)
```

Luego, hace algo parecido con la cuarta letra de la contraseña introducida por el usuario:

```asm
80486f3: 0f b6 44 24 2b          movzbl 0x2b(%esp),%eax
80486f8: 83 c0 01                add    $0x1,%eax
80486fb: 88 44 24 2b             mov    %al,0x2b(%esp)
```

La diferencia es que esta vez suma uno, en lugar de restar.

Llegados al punto donde se llama a strncmp, vemos claramente en la pila qué parámetros se le están pasando:

```asm
2: x/32xw $esp
0xffffd2f0: 0xffffd318  0x0804a034  0x0000000a  0xffffd3a4
1: x/xw $eip
0x804871e <strncmp>: 0xfffe01e8
```

```bash
(%esp)    [0xffffd318] -> puntero a la contraseña introducida por el usuario
0x4(%esp) [0x0804a034] -> puntero a la contraseña del programa
0x8(%esp) [0x0000000a] -> longitud que se quiere comparar (10).
```

Teniendo en cuenta las transformaciones hechas, la contraseña a introducir es **bfgnuuuu** . ya que &#8216;f&#8217;-1 = &#8216;e&#8217; y &#8216;n&#8217;+1=&#8217;o&#8217;, resultando **begouuuu**

Una vez descubierta la contraseña alfanumérica, pasé a la numérica, que resultó ser bastante sencilla. Esta vez la clave de todo está en estas instrucciones:

```asm
804877a: a1 40 a0 04 08          mov    0x804a040,%eax
804877f: 05 f4 01 00 00          add    $0x1f4,%eax
8048784: a3 40 a0 04 08          mov    %eax,0x804a040
8048789: 8b 44 24 24             mov    0x24(%esp),%eax
804878d: 05 c8 00 00 00          add    $0xc8,%eax
```

Se suma 500 `(0x1f4)` a la contraseña original, resultando 1500, y 200 (0xc8) a la contraseña que introduzca el usuario.
Haciendo la comparación de 1000+500 con PASSINTRODUCIDA+200, se deduce que la contraseña que se debe introducir es 1300.

# Segunda Bomba

Puedes descargar el programa desde <a href="https://dl.dropbox.com/u/54765219/Bomba2" target="_blank">este enlace</a>.

Como en la bomba anterior, despues de investigar un poco, creé un archivo de sesión para gdb con los puntos críticos:

```bash
b main
b cambio
b *0x804882a
b begin
b change
b code
b *0x804880e
b *0x804888d
display /wx $eip
display /d $ecx
display /d $eax
display /d $edx
display /32xw $esp
display /s $eax
display /w (char*)$eax
display (char*)0x804a034
display /wx 0x804a034
```

Llegué a la siguiente conclusión:

La contraseña codificada es **C4b3Z0n**, pero únicamente se comprueba la primera letra.
Si el usuario introduce como contraseña **C4b3Z0n**, la bomba explota, ya que en la función `cambio`, se comprueba que la primera letra de la contraseña no sea igual a **C**, de ser igual, se llama a la bomba:

```asm
movzbl (%eax),%eax
cmp    $0x43,%al
jne    80486a1 <cambio>
call   804860c <boomb>

```

Llegados a este punto, si no ha explotado, se compara la primera letra con "Q", si la primera letra de la contraseña introducida es **"Q"** también, se cambia por **"c"**.
Todo lo mencionado anteriormente se hace dentro de la función cambio.
En resumen, la función cambio comprueba que la primera letra no sea **"C"**, si no es **"C"**, compara con **"Q"**, de ser **"Q"**, la cambia por una **"c"**, dicha **"c"**, la cambiará la función `change` por una **"C"**, concretamente aquí:

```asm
80486be: 0f b6 00                movzbl (%eax),%eax          ; Extrae la primera letra
80486c1: 3c 63                   cmp    $0x63,%al            ; La compara con 'C'
80486c3: 75 06                   jne    80486cb <change>     ; Si no son iguales sale de la funcion
80486c5: 8b 45 08                mov    0x8(%ebp),%eax       ; si son iguales carga la contraseña entera en eax
80486c8: c6 00 43                movb   $0x43,(%eax)         ; y sustituye la primera letra por 'C'
```

Por tanto, la contraseña que el usuario debe introducir es **c4b3Z0n**, para que al realizar el cambio quede como C4b3Z0n. Si se introduce por contraseña **Q4b3Z0n**, se reemplaza por **c4b3Z0n** que es distinto de **C4b3Z0n**, detonando la bomba.

En este ejecutable no conseguí descubrir la contraseña numérica por la siguiente razón, el código que realiza las operaciones es:

```asm
080486cd <code>:
80486cd: 55                      push   %ebp
80486ce: 89 e5                   mov    %esp,%ebp
80486d0: 83 ec 18                sub    $0x18,%esp
80486d3: c7 45 e8 00 00 00 00    movl   $0x0,-0x18(%ebp)
80486da: c7 45 f4 00 00 00 00    movl   $0x0,-0xc(%ebp)
80486e1: c7 45 ec 00 00 00 00    movl   $0x0,-0x14(%ebp)
80486e8: 81 45 08 1a 27 00 00    addl   $0x271a,0x8(%ebp)
80486ef: 81 45 08 e8 03 00 00    addl   $0x3e8,0x8(%ebp)
80486f6: 83 45 08 02             addl   $0x2,0x8(%ebp)
80486fa: 8b 45 08                mov    0x8(%ebp),%eax
80486fd: 89 45 f0                mov    %eax,-0x10(%ebp)
8048700: eb 4f                   jmp    8048751 <code>
8048702: 8b 4d f0                mov    -0x10(%ebp),%ecx
8048705: ba 67 66 66 66          mov    $0x66666667,%edx
804870a: 89 c8                   mov    %ecx,%eax
804870c: f7 ea                   imul   %edx
804870e: c1 fa 02                sar    $0x2,%edx
8048711: 89 c8                   mov    %ecx,%eax
8048713: c1 f8 1f                sar    $0x1f,%eax
8048716: 29 c2                   sub    %eax,%edx
8048718: 89 d0                   mov    %edx,%eax
804871a: c1 e0 02                shl    $0x2,%eax
804871d: 01 d0                   add    %edx,%eax
804871f: 01 c0                   add    %eax,%eax
8048721: 89 ca                   mov    %ecx,%edx
8048723: 29 c2                   sub    %eax,%edx
8048725: 89 d0                   mov    %edx,%eax
8048727: 89 45 f4                mov    %eax,-0xc(%ebp)
804872a: 8b 45 f4                mov    -0xc(%ebp),%eax
804872d: 01 45 e8                add    %eax,-0x18(%ebp)
8048730: 8b 4d f0                mov    -0x10(%ebp),%ecx
8048733: ba 67 66 66 66          mov    $0x66666667,%edx
8048738: 89 c8                   mov    %ecx,%eax
804873a: f7 ea                   imul   %edx
804873c: c1 fa 02                sar    $0x2,%edx
804873f: 89 c8                   mov    %ecx,%eax
8048741: c1 f8 1f                sar    $0x1f,%eax
8048744: 89 d1                   mov    %edx,%ecx
8048746: 29 c1                   sub    %eax,%ecx
8048748: 89 c8                   mov    %ecx,%eax
804874a: 89 45 f0                mov    %eax,-0x10(%ebp)
804874d: 83 45 ec 01             addl   $0x1,-0x14(%ebp)
8048751: 83 7d ec 04             cmpl   $0x4,-0x14(%ebp)
8048755: 7e ab                   jle    8048702 <code>
8048757: 83 7d e8 17             cmpl   $0x17,-0x18(%ebp)
804875b: 74 07                   je     8048764 <code>
804875d: e8 aa fe ff ff          call   804860c <boomb>
8048762: eb 05                   jmp    8048769 <code>
8048764: e8 d9 fe ff ff          call   8048642 <bomb>
8048769: 8b 45 08                mov    0x8(%ebp),%eax
804876c: c9                      leave
804876d: c3                      ret
```

Gran parte de este código se usa para calcular un simple módulo, la razón; gcc realiza esta optimización porque la instrucción `div` a pesar de ser una sola, es más lenta que todo este código. Si quieres profundizar más en este tema, en las referencias hay un enlace a stackoverflow que explica qué método se sigue para calcular el módulo.

#  El código de mi programa Bomba

Para escribir mi programa me basé en técnicas de ofuscación que encontré por internet, con un poco de imaginación se puede hacer muy dificil la lectura de un programa:

```c
/*
  ============================================================================
  Name        : Boom.c
  Author      : Alejandro Alcalde
  Version     : 0.1
  Description : Práctica sobre ingeniería inversa
  ============================================================================
*/

#include <stdio.h>    // para printf()
#include <stdlib.h>   // para exit()
#include <string.h>   // para strncmp()/strlen()
#include <sys/time.h> // para gettimeofday(), struct timeval

#define SIZE 15
#define ESTO printf(
#define ES "%sn"
#define OFUSCACION ,(char *) v);

//char password[] = "abracadabran";
                                                                               int passcode = 555;

void boom() {
    printf("***************n");
    printf("*** BOOM!!! ***n");
    printf("***************n");
    exit(-1);
}

void defused() {
    printf("·························n");
    printf("··· bomba desactivada ···n");
    printf("·························n");
    exit(0);
}

double password[3];

char* decode(char* p){
    int a = 0;
    char* f;
    f = (char*) malloc(sizeof(char)*SIZE);

    for (a = 0; a < 10; a++)
        f[a] = p[a * 2 + 1];
    return f;
}

void confuse2(int* pw){
    int i = 0;
    char* salt = "wE9mg9pu2KSmp5lh";
    for (i = 0; i < 16; i++)
        *pw ^= salt[i];
    *pw+=7777;
}

int main(_, v) double *v; int _;{
    int pasv;
#define TLIM 60
    struct timeval tv1, tv2; // gettimeofday() secs-usecs
    double h[3];
    switch (_) {
    case 0:
//     ESTO ES OFUSCACION
        break;
    case 45681:
        strcpy((char*) password, (char*)v);
        confuse2(&passcode;);
        main(0, v);
        break;
    default:
        h[0] = 13027340775320732841130839654634808548322878081841199945244886528920637933617152.000000;
        h[1] = 3870500591494514751058285253136238534286695148502666756138516046378808251612945489502056433082093156719316295785906296012743611709256336712091456794020400600332451080740411432505870026138587691271552924066658849697642476166184960.000000;
        h[2] = 0;
        main(45681, h);
        //main(45681, "@M?eg \PoiRlLldo!�");
        break;
    }

    //Pedimos datos al usuario
    char f[SIZE];
    gettimeofday(&tv1;,NULL);

    printf("Introduce la contraseña: ");
    fgets(f,SIZE,stdin);

    if (strncmp(f,decode((char*)password),strlen(decode((char*)password))))
        boom();

    gettimeofday(&tv2;,NULL);
    if (tv2.tv_sec - tv1.tv_sec > TLIM)
        boom();

    printf("Introduce el código: ");
    scanf("%i",&pasv;);
    confuse2(&pasv;);
    if (pasv!=passcode)
        boom();

    gettimeofday(&tv1;,NULL);
    if (tv1.tv_sec - tv2.tv_sec > TLIM)
        boom();

    defused();

    return 0;
}
```

Explicaré por encima su funcionamiento. En la función `main` se evalua el primer argumento, que contiene el número de parámetros pasados a la función, contanto también con el nombre del programa, como no pasamos ningún argumento el valor por defecto será 1, y como este valor no se encuentra en el <code>switch</code>, entra en el <code>default</code>, Los números tan largos que ves son la contraseña representada en formato <strong>double</strong>, en concreto esta cadena <strong>@M?eg \PoiRlLldo!�</strong>. Tras asignar la contraseña a un array de doubles, llamo recursivamente a la función <code>main</code>, pasando como argumento el número 65381 y el array con la contraseña. De modo que esta vez el <code>switch</code> entra en la segunda sentencia (<code>case 45681:</code>), en la que se copia el array con la contraseña en double a una cadena de caracteres.

Por muy complicado que parezca, el código ensamblador solo tiene un punto clave para descubrir la contraseña:

En cualquier optimización, ya sea <a href="/peso-hamming-y-optimizacion/">0, 1 o 2</a>, para averiguar la contraseña basta con poner un punto de ruptura en la función <code>decode</code>:

```asm
08048870 <decode>:
8048870: 53                      push   %ebx
8048871: 83 ec 18                sub    $0x18,%esp
8048874: c7 04 24 0f 00 00 00    movl   $0xf,(%esp)
804887b: 8b 5c 24 20             mov    0x20(%esp),%ebx
804887f: e8 4c fc ff ff          call   80484d0 <malloc>
8048884: 31 d2                   xor    %edx,%edx
8048886: 66 90                   xchg   %ax,%ax
8048888: 0f b6 4c 53 01          movzbl 0x1(%ebx,%edx,2),%ecx
804888d: 88 0c 10                mov    %cl,(%eax,%edx,1)
8048890: 83 c2 01                add    $0x1,%edx
8048893: 83 fa 0a                cmp    $0xa,%edx
8048896: 75 f0                   jne    8048888 <decode>
8048898: 83 c4 18                add    $0x18,%esp
804889b: 5b                      pop    %ebx
804889c: c3                      ret
804889d: 8d 76 00                lea    0x0(%esi),%esi
```

En la que se va extrayendo de la cadena <strong>@M?eg \PoiRlLldo!�</strong> los caracteres impares, mediante un for:

```asm
 8048888: 0f b6 4c 53 01          movzbl 0x1(%ebx,%edx,2),%ecx
 804888d: 88 0c 10                mov    %cl,(%eax,%edx,1)
 8048890: 83 c2 01                add    $0x1,%edx
 8048893: 83 fa 0a                cmp    $0xa,%edx
 8048896: 75 f0                   jne    8048888 <decode>
```

Con lo cual, antes de retornar de la función, si miramos el valor de EBX encontramos la contraseña a usar para desactivar la bomba.

La clave está en cómo interpretar en el main, concretamente en la línea

```asm
80486d5: 89 54 24 04             mov    %edx,0x4(%esp)
```

el valor de EDX, pues es un double, que oculta la cadena cifrada __@M?eg \PoiRlLldo!�__.

Valor que veremos si examinamos en gdb con <code>x /gs $edx</code>

También podemos deducir el tamaño de la contraseña mirando la pila antes de llamar a <code>strncmp</code>, pues el tercer valor de la pila <strong>0x8(%esp)</strong>, es la longitud. En cuanto al pin, la clave está en mirar este trozo de código:

```asm
 80486b0: 0f be 08                movsbl (%eax),%ecx
 80486b3: 83 c0 01                add    $0x1,%eax
 80486b6: 31 ca                   xor    %ecx,%edx
 80486b8: 3d 90 89 04 08          cmp    $0x8048990,%eax
 80486bd: 75 f1                   jne    80486b0 <main>
 80486bf: 81 c2 61 1e 00 00       add    $0x1e61,%edx
```


Que va sumando al pin el resultado de hacer un XOR de su valor con el valor de una letra almacenada en %ecx y al resultado le suma 7777.
Con lo cual tenemos que conseguir un número al que al hacerle todas estas operaciones de 8305, que resulta ser 555.

# Referencias

- __Calculating modulo in assembly__ \| <a href="http://stackoverflow.com/questions/4361979/calculating-modulo-in-assembly" target="_blank">Visitar sitio</a>
- __Obfuscation__ \| <a href="http://www.brandonparker.net/code_obf.php" target="_blank">Visitar sitio</a>

[1]: https://elbauldelprogramador.com/desafio-de-ingenieria-inversa-en-c/
