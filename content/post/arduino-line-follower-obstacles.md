+++
title = "Arduino Zumo Siguelineas Evita obstaculos"
author = ["alex"]
description = "Proyecto Arduino con un Zumo que sigue líneas y evita obstáculos"
date = 2018-09-16T18:42:00+02:00
lastmod = 2018-09-16T18:42:08+02:00
tags = ["arduino", "robótica"]
categories = ["dev", "how-to", "articulos"]
url = "arduino-sigue-lineas-obstaculos"
draft = false
mainclass = "dev"
+++

> Este proyecto forma parte de un trabajo para la asignatura _Robótica Móvil y
> Neurobótica_ del _Máster en Ciencia de Datos_ de la ETSIIT. Sus autores son
> [Cristina Heredia](/author/cristina/) y [Alejandro Alcalde.](/author/alex/) El código está disponible en [_HerAlc/LineFollowerObstacles_](https://github.com/HerAlc/LineFollowerObstacles)

El proyecto se compone de **dos partes**. La **primera** consiste en crear un robot
que siga un camino pre-establecido marcado con líneas, además, debe evitar
cualquier obstáculo que se encuentre en el camino. En caso de encontrarse con un
obstáculo, el robot se detiene unos segundos y avisa, si pasado un tiempo el
obstáculo sigue presente, el robot da media vuelta y sigue en camino contrario.
La **segunda parte** se trata de implementar este funcionamiento en el entorno
simulado Vrep.


## Arduino {#arduino}

Para esta parte se ha implementado un Zumo capaz de conducir por sí mismo con las siguientes funcionalidades:

-   Sigue Líneas
-   Detección de obstáculos y toma de decisiones.
-   Avisos sonoros a los obstáculos.

Para el sigue líneas se usan tres **sensores sigue  líneas** para detectar cambios de intensidad.

Antes de comenzar, el robot necesita calibrar el **giroscopio** y los sensores sigue líneas. Para ello hay que pulsar el botón `A` una vez, esto calibra el giroscopio. Pulsar el botón `A` una segunda vez calibra los sensores sigue líneas.

Cabe mencionar que se parte del ejemplo Sigue Líneas de Arduino, disponible en el IDE de Arduino, las modificaciones realizadas han sido las siguientes:

Se integra código del ejemplo `MazeSolver`, que hace uso del giroscopio, en concreto los ficheros `TurnSensor.h` y `TurnSensor.cpp`. Esto permite calibrar el giroscopio, el cual es necesario para conseguir que el robot de media vuelta e inicie el camino contrario si el obstáculo que encuentra en su camino no se retira en tres segundos.

Para la **detección de obstáculos** se hace uso de un sensor de proximidad. La distancia a la que se para el robot se fija al valor 6. Cuando el robot se detiene al encontrar un obstáculo, avisa con una melodía simple compuesta por nosotros y similar al **claxon** de un vehículo. Finalmente, cuando el robot espera más de tres segundos y el obstáculo sigue presente, avisa con otra melodía compuesta por nosotros e inicia al camino en sentido opuesto girando 180 grados.


### Vídeo {#vídeo}

<iframe width="560" height="315" src="<https://www.youtube-nocookie.com/embed/UwPJgL0ix_8>" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>


## VREP {#vrep}

Para el proyecto en VREP se ha implementado un robot **Sigue Líneas** que se detiene ante la presencia de un obstáculo. Si el obstáculo se retira durante la simulación, el robot sigue su camino. Si el obstáculo no se retira, el robot permanece sin moverse para evitar chocar con él.

Para seguir las líneas se ha adaptado el ejemplo de VREP _LineFollowerBubbleRob_ para hacerlo funcionar con Zumo, usando el modelo proporcionado en clase. La adaptación ha consistido en modificar el código de _BubbleRob_, que solo tiene dos motores, y hacerlo funcionar en el Zumo, con cuatro motores. Para ello se han tenido que ajustar parámetros de torque, peso etc de acuerdo al Zumo. También se desactivó el comportamiento cíclico de los motores.

Para evitar obstáculos se añade al robot un sensor de proximidad frontal, de forma similar al que se hizo en clase. Cuando el objeto se detecta a una distancia mínima pre-establecida, se detienen los motores del robot durante tres segundos. Transcurrido este tiempo, se vuelven a leer los datos del sensor de proximidad para comprobar si el objeto sigue presente o no. En caso de estar presente, el robot permanece parado, de lo contrario reanuda su marcha.

A continuación se muestra el código principal que controla el Zumo.

```lua
function sysCall_actuation()
    currTime = sim.getSimulationTime()
    result,distance=sim.readProximitySensor(noseSensor)

    if (result == 1 and distance < .25) then
        speed = 0
        if (objectDetected == false) then
            timeOjectDetected = sim.getSimulationTime()
            objectDetected = true
        end
        --sim.addStatusbarMessage(tostring(timeOjectDetected))
    end
    timeWaitingDetectedObject = currTime - timeOjectDetected
    sim.addStatusbarMessage(tostring(timeWaitingDetectedObject))
    -- After 3 seconds, check if continue foward or turn back
    if (timeWaitingDetectedObject > 3 ) then
        result,distance=sim.readProximitySensor(noseSensor)
        if (result == 0) then
            speed = -5
            timeOjectDetected = 0
            objectDetected = false
        end
    end

    -- read the line detection sensors:
    sensorReading={false,false,false}
    for i=1,3,1 do
        result,data=sim.readVisionSensor(floorSensorHandles[i])
        if (result>=0) then
            -- data[11] is the average of intensity of the image
            sensorReading[i]=(data[11]<0.3)
        end
    end

    rightV=speed
    leftV=speed

    if sensorReading[1] then
        leftV=0.03*speed
    end
    if sensorReading[3] then
        rightV=0.03*speed
    end
    -- When in forward mode, we simply move forward at the desired speed
    sim.setJointTargetVelocity(frontLeftMotor,leftV)
    sim.setJointTargetVelocity(frontRightMotor,rightV)
    sim.setJointTargetVelocity(rearLeftMotor,leftV)
    sim.setJointTargetVelocity(rearRightMotor,rightV)
end
```

En el código se lleva la cuenta del tiempo transcurrido desde la última vez que se detuvo el robot, para decidir cuando se debe hacer la siguiente lectura del sensor de proximidad. La distancia máxima de detección de objetos se fija a 0.25.

Para el funcionamiento del sigue líneas se emplean tres sensores sigue líneas (Izquierdo, central y derecho), ubicados en la parte delantera del Robot. Dichos sensores se colocan con el eje z hacia abajo. De todos los datos proporcionados por los sensores se usa la intensidad media de la imagen para ajustar la velocidad de los motores. Aunque se incorporó un sensor central, no ha sido necesario su uso, ya que el robot sigue las líneas bien con los otros dos.

En los ficheros adjuntos se proporcionan vídeos de ejemplo de ambas prácticas.


### Vídeo VREP {#vídeo-vrep}

<iframe width="560" height="315" src="<https://www.youtube-nocookie.com/embed/dixjPmbJ1Ts>" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

[//]: # "Exported with love from a post written in Org mode"
[//]: # "- https://github.com/kaushalmodi/ox-hugo"
