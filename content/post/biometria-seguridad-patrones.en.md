---
author: cristina
categories:
- articulos
- security
mainclass: seguridad
date: 2017-10-20T11:50:46+02:00
description: "In this article we will talk about the existing different techniques from pattern recognition and how they can be used with biometric data."
image: hotlink-ok/Sistemas-biometricos-aplicados-a-la-seguridad.png
tags:
- biometrics
title: "Biometrics applied to security - Pattern Recognition"
url: "/en/biometrics-pattern-recognition/"
---

<figure>
    <a href="/img/hotlink-ok/Sistemas-biometricos-aplicados-a-la-seguridad.png"><img sizes="(min-width: 640px) 640px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/hotlink-ok/Sistemas-biometricos-aplicados-a-la-seguridad.png" title="Biometría Aplicada a La Seguridad - Reconocimiento De Patrones" alt="Biometría Aplicada a La Seguridad - Reconocimiento De Patrones" width="640px" height="405px" /></a>
    <span class="image-credit">image credits: pixabay<a href="https://pixabay.com/en/biometrics-eye-security-154660/"></a></span><br />
</figure>

The next article takes part of a team work done for the subject _Security in operating systems_ from the Granada computer engineering school (ETSIIT UGR). The group was composed by [@MPV_Prod](http://twitter.com/MPV_Prod) , [@_musicalnote](http://twitter.com/_musicalnote) and [@ElBaulP](http://twitter.com/elbaulp). This post is authored by @_musicalnote.

# Index

- [Biometrics applied to security - Introduction](/biometria-seguridad-introduccion "Biometrics applied to security - Introduction")
- Biometrics applied to security - Pattern recognition
- [Biometrics applied to security - Biometrics systems](/sistemas-biometricos "Biometrics applied to security - Biometrics systems")

<!--more--><!--ad-->

Pattern recognition
--------------------------

Previously, we have talk about the different techniques that exist to perform the identification of an individual. Now we will get into **how** it is possible to recognise a face, an iris or a signature with pattern matching.

### What is pattern recognition?

Is the science that describes and classifies objects, people, signals, representations, etc. Pattern recognition has multiple application fields, however the most related with [security](/security-now/ "security articles") is, definitely the biometric recognition of people. It is about assigning an identity to a person, or verify that it is what it says, by meassuring certain own characteristics. Characteristics as voice, face, fingerprints, iris, signature, etc.

### The problem of pattern recognition

We humans are so good recognising patterns. Our brain has some kind of algorithms, still unknown, that are much faster than any computer when recognising faces or voices, for explample.

### Approaches to Pattern Recognition

There are many type of aproaches, although they are used to be combined between them resulting in hybrid systems. All of them have two steps in common:

- Training or learning step
- Classification or test step

First of all, for building a pattern recognition system that can identify an individual through any of its personal characteristics we must have in our hands an ammount of data of such characteristic, so that the probability of creating a model that succeeds recognizing by this characteristic increase. However, a common mistake is to not have in consideration if those data are or not free from variability (noise introduced by sensors, scale changes, distortions, rotations...)  so that before training and testing the system, it is very important to clean that data or take a decision about the affected data (like not using them to train the classifier, for example). Finally, after training the system, we proceed to test it. For that purpose we give the system another dataset of the characteristic that we are analyzing, evaluating that way the ability of the recognizer to hit in its decisions.

### Feature extraction

In a recognizer, it is so important to consider the feature extraction (parametrization) to perform on the input, that is, selecting which characteristic vectors are we using. For example, in images we can use the bitmap. Is undoubtedly that parametrization will ease the problem, as through it the ammount of data to process decreases and we get the feature space turned, being easier to discriminate on it (see which samples are meaningful and which are not).


### Class separability

If we want to minimize the error of our biometrics system, we must try to make the data classification as accurate as possible, and for that we must select the classifier that best fits our data (distinct classifiers, distinct results...), by choosing correctly the classification criteria.

In the next figure we can see how both two classes are perfectly separable when using both vector components (2 dimensions), but if we reduce it to just one dimension, we can see that both classes are no longer separable, as they overlap.

<figure>
    <a href="/img/separability.png"><img sizes="(min-width: 320px) 320px, 100vw" on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/separability.png" title="class separability using two-dimensional vectors" alt="class separability using two-dimensional vectors" width="320px" height="316px" /></a>
</figure>

It is easy to ilustrate it in an image when the number of classes is low, as in this example, as we got just two classes. But the difficulty increases with the number of classes. How can we know if our classifier is doing well or not? How can we know if a characteristic is discriminating or not? In that case proceed to calculate the discriminating mean of the characteristic, from the mean distance between classes and normalizing by its variance.

### Introduction to intrusion detection

Applying biometrics techniques in [intrusion](/6-formas-usadas-por-los-cibercriminales-para-robar-o-vulnerar-credenciales-de-login/ "6 ways used by cybercriminals to steal or infringe login credentials") detection systems allow us to intensify the security of our system, for example, during the authentication, as we could establish a more detailed profile for each user, without having to worry about certain problems like for example if the user is writting the password so others can see it, or if the user share its password or if it is stolen... thus avoiding a possibility of attack that affects the IDS performance.

As is evident, the use of biometrics is not making impossible any security attack to the system, but at least it will ask every user to identify previously, through the authentication and validation mechanisms, so that any bad use or attack caused by an user and detected by an IDS will point to a concrete user.

Intrusion detection systems are still getting better, but it is already spoken that in the future advanced techniques of biometry could be developed, as for example, DNA recognition.

# Index

- [Biometrics applied to security - Introduction](/biometria-seguridad-introduccion "Biometrics applied to security - Introduction")
- Biometrics applied to security - Pattern recognition
- [Biometrics applied to security - Biometrics systems](/sistemas-biometricos "Biometrics applied to security - Biometrics systems")

# References

- [M. Tapiador Mateos and J. A. Sigüenza Pizarro, Tecnologías biométricas aplicadas a la
seguridad](http://www.amazon.es/gp/product/8478976361/ref=as_li_ss_tl?ie=UTF8&camp;=3626&creative;=24822&creativeASIN;=8478976361&linkCode;=as2&tag;=bmacoc-21 "M. Tapiador Mateos and J. A. Sigüenza Pizarro, Tecnologías biométricas aplicadas a la seguridad")
- [C. H. Chen and C. H. Chen, Handbook of Pattern Recognition and Computer Vision 4th edition](http://www.amazon.es/gp/product/9814656526/ref=as_li_ss_tl?ie=UTF8&camp;=3626&creative;=24822&creativeASIN;=9814656526&linkCode;=as2&tag;=bmab-21 "C. H. Chen and C. H. Chen, Handbook of Pattern Recognition and Computer Vision 4th edition")
- [Wikipedia, “Biometría, según wikipedia.”](https://es.wikipedia.org/wiki/Biometr%C3%ADa "Wikipedia, “Biometría, según wikipedia.”")
- [G. Argentina, “Historia de la biometría.”](http://www.biometria.gov.ar/acerca-de-la-biometria/historia-de-la-biometria.aspx "G. Argentina, “Historia de la biometría.”")
