+++
title = "Arduino Zumo Line Follower and Obstacle avoider"
author = ["alex"]
description = "Arduino project of a Zumo 32U4 robot line follower and obstacle avoider"
date = 2018-09-16T18:42:00+02:00
lastmod = 2018-09-16T18:44:47+02:00
tags = ["arduino"]
categories = ["dev"]
url = "/en/arduino-line-follower-obstacles"
draft = false
+++

> This project is a job assignment for a course on Robotics and Neurobotics at the
> Master on Data Science of the University of Granada. Its authors are [Cristina
> Heredia](/en/author/cristina) and [Alejandro Alcalde](/en/author/alex).

This project is composed of **two parts**. **First part** consist on program a robot
(Zumo 32U4) that follows a determined path marked by black lines. In addition it
must avoid any obstacle it encounters. In case of being in front of an obstacle,
the robot stops a few seconds and beeps, if time passes and the obstacle is
still on the path, the robots will turn around and will continue in the opposite
direction. **Second part** is about implementing this behavior in VREP simulator.
Lets begin.


## Arduino {#arduino}

In this section the Zumo 32U4 is capable of drive by itself with the following
functionalities:

-   Line follower.
-   Object detection and avoidance.
-   Alert sounds to the obstacles.

For the line follower three **line sensors** are used to detect the path.

Before starting, the robot needs to calibrate its **gyroscope** and line sensors.
Pressing button `A` once will calibrate the gyroscope, pressing it a second time
will calibrate line sensors.

It is worth mentioning we have started with the Line follower example from
Arduino IDE. The following code modifications has been made:

We have integrated code from `MazeSolver`, which makes uses of the gyroscope, in
particular, files `TurnSensor.h` and `TurnSensor.cpp`. This allow us to
calibrate the gyroscope.

To **detect obstacles** a proximity sensor is used. The distance between the robot
and the obstacle is set to 6. When the robot sees and obstacle and stops, it
plays a sound similar to a **car's horn**. Finally, when the robot waits for more
than three seconds and the obstacle is still there, it plays another sound and
turns around. Next we show a video:


### Video {#video}

<iframe width="560" height="315" src="<https://www.youtube-nocookie.com/embed/UwPJgL0ix_8>" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>


## VREP {#vrep}

The VREP project has implemented a **line follower** robot which stops in front of
an obstacle. If the obstacle is removed during the simulation the robot will
continue his path, otherwise it will stay still.

In this implementation, we have used the code from _LineFollowerBubbleRob_ from
the VREP examples. The code is shown below:

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

What this code does is keep track of the time passed since the robot first
stops in order to know when to check the proximity sensor again.


### VREP Video {#vrep-video}

<iframe width="560" height="315"
src="<https://www.youtube-nocookie.com/embed/dixjPmbJ1Ts>" frameborder="0"
allow="autoplay; encrypted-media" allowfullscreen></iframe>

Hope you find it interesting!

[//]: # "Exported with love from a post written in Org mode"
[//]: # "- https://github.com/kaushalmodi/ox-hugo"
