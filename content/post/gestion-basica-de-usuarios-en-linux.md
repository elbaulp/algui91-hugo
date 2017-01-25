---
author: alex
categories:
- linux
- script
color: '#2196F3'
date: '2016-01-01'
lastmod: 2016-08-15

mainclass: linux
url: /gestion-basica-de-usuarios-en-linux/
tags:
- script gestion de usuarios linux
title: "Gesti\xF3n b\xE1sica de usuarios en linux"
---

Hace un tiempo hice un script para gestionar los usuarios en linux de forma sencilla, personalmente creo que es fácil de usar. Sus características son las siguientes:

  1. Crear usuarios.
  2. Crear grupos.
  3. Añadir usuarios a un grupo.
  4. Eliminar usuarios o grupos.
  5. Eliminar un usuario de un grupo.
  6. Listar usuarios de un grupo

<!--more--><!--ad-->

Todos las acciones que realizamos se almacenan en un log que se muestra al finalizar el script, y despues éste se borra.

Si tenéis alguna duda, no dudeis en preguntar. Espero que sea de utilidad.

```bash
#!/bin/bash
sleep 1
echo
echo "*****************************************************************************"
echo "*                                                                           *"
echo "* Script para gestionar usuarios a traves de un GUI    >> GESTUSERS <<      *"
echo "*                                                                           *"
echo "* Fecha y hora de la ejecución del Script                                   *"
echo "* `date +%d-%m-%Y`   -   `date +%H:%M:%S`                                   *"
echo "*                                                                           *"
echo "* Puedes modificarlo y/o distribuirlo bajo los términos de la licencia GPL  *"
echo "*                                                                           *"
echo "* Autor: Alejandro Alcalde (algui91) - Mar. '10                             *"
echo "*                                                                           *"
echo "*****************************************************************************"
sleep 1

# Gestion de usuarios grafica
function main(){
  while [ true ]
  do
    opcion=`zenity --list --height=300 --radiolist \
              --title="Elija una opcion" \
               --column="" --column="Opcion" \
               "FALSE" "1 Crear Usuario con home" \
              "TRUE" "2 Crear grupo" \
              "FALSE" "3 Añadir usuario/Grupo" \
            "FALSE" "4 Eliminar Usuario/Grupo" \
               "FALSE" "5 Eliminar Usuario" \
               "FALSE" "6 Mostrar usuarios de un grupo" \
          "FALSE" "7 Eliminar grupo" \
              "FALSE" "8 Salir"`
    if [ "$?" == 1 ] ; then seleccion 7 ; fi #Si se pulsa cancelar y cerrar, lo evio al log
    seleccion `echo $opcion | cut -c 1` "$opcion" # Corto la opcion para quedarme solo con el numeros
  done
}
###################################################################################
function seleccion(){
  case $1 in
  1)
    user=`zenity --entry --width=300 --text "Nombre del usuario" --title "$2"`
    cod=`echo $?`
    if [ $cod == 0 ] #Pulso aceptar o cerrar
    then
      sudo adduser $user
      if [ "$?" == 1 ] # si la salida de adduser es 1, es que el usuario existe
      then
        zenity --warning --title="AddUser" --text="El usuario $user ya existe"
      else
        echo "creo el usuario $user" >> /tmp/log		#Almaceno las operaciones del usuario
        progress "Creando usuario" $user "$2"
      fi
    elif [ $cod == -1 ] #Error
    then
      zenity --error --no-wrap --title="Error" --text="Ocurrio un error"
    fi
    ;;
  2)
    group=`zenity --entry --width=300 --text "Nombre del grupo" --title "$2"` #Recogo el nombre del nuevo grupo
    cod=`echo $?`
    if [ $cod == 0 ] #Pulso aceptar o cerrar
    then
      creargrupo "$group" #llamo a mi funcion crear grupo
      if [ "$?" == 0 ] # si creargrupo devuevle 0, todo correcto
      then
        progress "Creando grupo" $group "$2"
        echo "creo el grupo $group" >> /tmp/log
      fi
    elif [ $cod == -1 ] #Error
    then
      zenity --error --no-wrap --title="Error" --text="Ocurrio un error"
    fi
    ;;
  3)
    listaUser=`cat /etc/passwd | cut -d: -f1 | sort` #extraigo del archivo passwd una lista de los usuarios ordenada
    user=`zenity --list --height=300 --title="Elija un usuario" --column="USER" $listaUser` #Meto los usuarios en el list
    cod=`echo $?`
    if [ $cod == 0 ] #Pulso Aceptar
    then
      lsgrp=`cat /etc/group | cut -d: -f1 | sort`
      grp=`zenity --list --height=300 --title="Elija un grupo" --column="GRUPOS" $lsgrp`
      sudo usermod -aG $grp $user # -a de append, que no lo quite de su anterior grupo, y -G para agregarlo a otro grupo como secundario
      zenity --info --no-wrap --title="$2" --text="Añadió a \'$user\' al grupo $grp"
      echo "Añadió a $user al grupo $grp" >> /tmp/log
    elif [ $cod == -1 ] #Error
    then
      zenity --error --no-wrap --title="Error" --text="Ocurrio un error"
    fi
    ;;
  4)
    listaUser=`cat /etc/passwd | cut -d: -f1 | sort`
    user=`zenity --list --height=300 --title="Elija un usuario" --column="USER" $listaUser`
    cod=`echo $?`
    if [ $cod == 0 ] #Pulso Aceptar
    then
      lsgrp=`cat /etc/group | cut -d: -f1 | sort`
      grp=`zenity --list --height=300 --title="Elija un grupo" --column="GRUPOS" $lsgrp`
      sudo deluser $user $grp # pasandole a deluser un usuario y un grupo, borra al usuario del grupo
      zenity --info --no-wrap --title="$2" --text="Eliminó a \'$user\' del grupo $grp"
      echo "Eliminó a $user del grupo $grp" >> /tmp/log
    elif [ $cod == -1 ] #Error
    then
      zenity --error --no-wrap --title="Error" --text="Ocurrio un error"
    fi
    ;;
  5)
    listaUser=`cat /etc/passwd | cut -d: -f1 | sort`
    user=`zenity --list --height=300 --title="Elija una opcion" --column="USER" $listaUser`
    cod=`echo $?`
    if [ $cod == 0 ] #Pulso aceptar o cerrar
    then
      zenity --question --title="deluser" --text="Borrar home de $user?"
      if [ $? == 0 ]
      then
        sudo deluser $user --remove-home
        echo "Elimino el usuario $user con su home" >> /tmp/log
        progress "Eliminando Usuario" $user "$2"
      else
        sudo deluser $user
        echo "Elimino el usuario $user y no su home" >> /tmp/log
        progress "Eliminando Usuario" $user "$2"
      fi
    elif [ $cod == -1 ] #Error
    then
      zenity --error --no-wrap --title="Error" --text="Ocurrio un error"
    fi
    ;;
  6)
    lsgrp=`cat /etc/group | cut -d: -f1 | sort`
    grp=`zenity --list --height=300 --title="Elija un grupo" --column="GRUPOS" $lsgrp`
    cod=`echo $?`
    if [ $cod == 0 ] #Pulso Aceptar
    then
      member=`cat /etc/group | grep $grp: | cut -d: -f4 | sort` #Localizo el nombre del grupo con grep $grp: y corto los miembros
      zenity --info --no-wrap --title="$2" --text="El grupo $grp tiene de miembros: $member"

      echo "Listó los miembros de $grp" >> /tmp/log
    elif [ $cod == -1 ] #Error
    then
      zenity --error --no-wrap --title="Error" --text="Ocurrio un error"
    fi
    ;;
  7)
    lsgrp=`cat /etc/group | cut -d: -f1 | sort`
    grp=`zenity --list --height=300 --title="Elija un grupo" --column="GRUPOS" $lsgrp`
    cod=`echo $?`
    if [ $cod == 0 ] #Pulso Aceptar
    then
      gksudo delgroup $grp
      zenity --info --no-wrap --title="$2" --text="El grupo $grp ha sido eliminado"

      echo "Elimino el grupo $grp" >> /tmp/log
    elif [ $cod == -1 ] #Error
    then
      zenity --error --no-wrap --title="Error" --text="Ocurrio un error"
    fi
    ;;

  8)
    if [ -e /tmp/log ]
    then

      zenity --text-info \
                          --title="LOG" \
                          --filename=/tmp/log
                          --editable 2>/tmp/tmp.txt
             rm /tmp/log /tmp/tmp.txt

           fi
           exit
    ;;
esac
}
###################################################################################
#Funcion para usar la barra de progreso
function progress(){
    (
    echo "0" ; sleep 1
          echo "# $1" ; sleep 1
          echo "25" ; sleep 1
          echo "75" ; sleep 1
          echo "100" ; sleep 1
          echo "# Finalizado"

          ) |
          zenity --progress \
            --title="$3" \
            --text="" \
            --percentage=0 \
            --width=300

          if [ "$?" = -1 ] ; then
                zenity --error \
                  --text="Suma Abortada."
          fi
}
###################################################################################
function creargrupo(){

  gksudo groupadd $1
  if [ "$?" == 9 ]
  then
    zenity --warning --title="Groupadd" --text="El grupo \'$1\' ya existe"
    return 1
  else
    return 0
  fi
}
###################################################################################
main
```

Si no visualizáis bien el código, haced clic [aquí.][1]

 [1]: http://pastebin.com/2UbqU3Yk
