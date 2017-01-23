---
author: alex
categories:
- articulos
color: '#E64A19'
date: '2016-01-01'
lastmod: 2016-08-10
layout: post.amp
mainclass: dev
permalink: /introduccion-a-ruby/
tags:
- ejemplos
- ruby
title: "Introducci\xF3n r\xE1pida a Ruby"
---

En la asignatura **PDOO** (**Programación y Diseño Orientado a Objetos**) tuve que hacer un seminario sobre ruby, que consistía en traducir un proyecto escrito en Java a Ruby. El objetivo era ver las diferencias existentes en ambos lenguajes.

**Ruby** fue creado por Yukihiro Matsumoto y es un lenguaje dinámico.

En este artículo voy a escribir únicamente el código Ruby, al final pondré disponible para descarga ambos proyectos, tanto en Java como en Ruby.

La estructura del programa consta de tres clases, *Persona*, *Alumno* y *Asignatura*. Heredando Alumno de Persona. Empecemos viendo la clase Persona:

<!--more--><!--ad-->

```ruby
require 'date' #Para trabajar con fechas
require 'time'

#Clase Persona
class Persona
  include Comparable

  #Declara metodos gets y sets
  attr_accessor :nombre, :fechaNacimiento

  def initialize(nombre, fechaNacimiento)
    #Inicializar atributos
    @nombre = nombre
    @fechaNacimiento = fechaNacimiento
  end

  def edad
    dob = fechaNacimiento() or return nil
    now = Time.now
    now.year - dob.year
    #now.year - dob.year - (dob.to_time.change(:year => now.year) > now ? 1 : 0)
  end

  def to_s
    "Persona [nombre=" + nombre + "], fechaNacimiento=" + fechaNacimiento.to_s + "]"
  end

  def cumple
    "Su cumpleanos es el ".concat fechaNacimiento.month.to_s.concat " del ".concat fechaNacimiento.day.to_s
  end

  def esMenorQue otro
    return fechaNacimiento <=> otro
  end

  def <=>(otraPersona)
    if self.fechaNacimiento < otraPersona.fechaNacimiento
      -1
    elsif self.fechaNacimiento > otraPersona.fechaNacimiento
      1
    else
      0
    end
  end
=begin
    los metodos getdianac, getmes etc no se implementan porque pueden ser facilmente accesibles con fechanacimiento.year etc
=end

end
```

Comentemos brevemente la sintaxis:

A diferencias de Java, en lugar de usar **import**, se usa **require** para incluir otras clases. Algo que me gustó bastante es la posibilidad de crear métodos de acceso, es decir, los típicos **get** y **set** con una simple instrución. Escribiendo ***attr_accessor :nombre, :fechaNacimiento*** estamos declarando los métodos de acceso a estos dos atributos de la clase. A los cuales podemos acceder con `instanciaObjetoPersona.fechaNacimiento()` para obtener el valor del atributo o `instanciaObjetoPersona.fechaNacimiento=(NuevaFecha)` para modificarlo. Es importante destacar que en Ruby los paréntess no son obligatorios.

Los constructores tienen siempre el nombre `initialize()`, en Java es el nombre de la clase.

Algo curioso, no existe **null** si no **nil**.

El método `toString` en java aquí se llama `to_s`.

Concretamente en esta clase se implementa la interfaz **Comparable**, usada para comprobar si un objeto es igual, menor o mayor que otro. En java es necesario redefinir el método `compareTo`, en Ruby se usa el método `<=>`, que hay que redefinir también, como se puede comprobar en el código.

Echemos un vistazo a la clase Asignatura:

```ruby
class Asignatura
  attr_accessor :codigo, :titulo, :creditosECTS

  def initialize(codigo, titulo, creditos)
    @codigo = codigo
    @titulo = titulo
    @creditosECTS = creditos
  end

  def to_s
    "La asignatura ".concat(titulo.to_s).concat(" con codigo ").concat(codigo.to_s).
        concat(", consta de ").concat(creditosECTS().to_s).concat(" creditos ECTS")
  end

end
```

En este caso hay poco que comentar, ya que es más sencilla que la anterior. Únicamente decir que se está redefiniendo el método `to_s`.

Por último, veamos la clase Alumno, la cual hereda de Persona:

```ruby
require './Persona.rb'
require './Asignatura'

class Alumno < Persona

  #Variable estática
  @@NUM_MAX_CRED = 60

  #Atributos
  attr_accessor :titulacion, :asignaturas
  def initialize(nombre,fechaNacimiento, titulacion)
    super(nombre, fechaNacimiento)
    @titulacion = titulacion
    @asignaturas = Hash.new(false) #Si no hay nada, devuelvo false
  end

  def Alumno.NUM_MAX_CRED= (x)
    @@NUM_MAX_CRED = x
  end

  def Alumno.NUM_MAX_CRED
    @@NUM_MAX_CRED
  end

  def to_s
    super.to_s.concat( "Esta estudiando ").concat(titulacion).concat(", creditos ").concat(getNumCreditos.to_s)
  end

  def getNumCreditos
    total = 0
    asignaturas.each_pair do |k,v|
      total += asignaturas[k].creditosECTS
    end
    total
  end

  def estaMatriculado(codAsig)
    asignaturas.has_key?(codAsig)
  end

  def matricularAsignatura(asig)
    if not estaMatriculado(asig.codigo) and (getNumCreditos + asig.creditosECTS) <= Alumno.NUM_MAX_CRED
      asignaturas[asig.codigo] = asig
    else
      raise 'El alumno ya esta matriculado en esta asignatura'
    end
  end

  def desmatricularAsignatura(codAsig)
    if estaMatriculado(codAsig)
      asignaturas.delete(codAsig)
    else
      raise 'ERROR: El alumno no esta matriculado en la asignatura '.concat(codAsig.to_s)
    end
  end

  def mostrarMatricula
    puts "El alumno se encuentra matriculado de las siguientes asignaturas:\n"
    asignaturas.each_pair do |k,v|
      puts "\tCodigo Asig: ".concat(k.to_s).concat(". Creditos ").concat(asignaturas[k].creditosECTS.to_s)
    end
  end

  def buscarAsignatura(codAsig)
    asignaturas[codAsig]
  end

  def anularMatricula
    asignaturas.clear
  end
end
```

Varias cosas a comentar. Para indicar la herencia de una clase sobre otra, se usa el operador <, en este caso **Alumno** heredará de **Persona**.
Las variables estáticas se definen anteponiendo dos @@ al nombre de la variable. (`@@NUM_MAX_CRED = 60`).
`asignaturas` es un objeto HashMap sobre el que podemos iterar, un ejemplo es el método `getNumCreditos`:

```ruby
total = 0
    asignaturas.each_pair do |k,v|
      total += asignaturas[k].creditosECTS
    end
total
```

Este método itera sobre el HashMap sumando los créditos de las asignaturas. **k** corresponde a la clave del HashMap, y **v** al valor.
Cabe destacar la asuencia de la sentencia `return` en todos los métodos.

Por último, el manejo de excepciones. En esta clase, se lanzan varias. Por ejemplo, el método `matricularAsignatura` lanzará una excepción si el alumno ya está matriculado o supera el número máximo de créditos.

Para probar el funcionamiento del programa, usaremos esta pieza de código:

```ruby
#!/usr/bin/env ruby

require './Persona.rb'
require './Alumno.rb'

if __FILE__ == $0

  arrayPersonas = Hash.new

  #Creando personas y Alumnos
  alex = Persona.new("Alejandro Alcalde",Date.new(1991,2,10))
  pepe = Persona.new("Pepe",Date.new(1980,2,8))
  alumno1 = Alumno.new("Nombre del alum1",Date.new(1980,2,8),"Ing. Informatica")
  alumno2 = Alumno.new("Nombre del alum2",Date.new(1980,2,8),"Ing. Teleco")

  #Almacenarlas en un HashMap
  arrayPersonas[alex.nombre] = alex
  arrayPersonas[pepe.nombre] = pepe
  arrayPersonas[alumno1.nombre] = alumno1
  arrayPersonas[alumno1.nombre] = alumno2

  #Creacion de Asignaturas
  asig1 = Asignatura.new(1000,"Ing.Informatica",6)
  asig2 = Asignatura.new(1001,"Ing.Informatica",6)
  asig3 = Asignatura.new(1002,"Ing.Informatica",6)
  asig4 = Asignatura.new(1003,"Ing.Informatica",6)
  asig5 = Asignatura.new(1004,"Ing.Informatica",6)
  asig6 = Asignatura.new(1005,"Ing.Informatica",6)
  asig7 = Asignatura.new(1006,"Ing.Informatica",6)

  #Imprimir las personas
  puts "Mostrando personas almacenadas en el sistema"
  arrayPersonas.each_pair do |k,v|
    puts arrayPersonas[k]
  end

  #Matriculas a alumnos en asignaturas
  if alex.respond_to?("matricularAsignatura")
    alex.matricularAsignatura(asig1) #Nunca se ejecuta, porque alex es Persona
  end
  if alumno1.respond_to?("matricularAsignatura")
    alumno1.matricularAsignatura(asig1)
    alumno1.matricularAsignatura(asig7)
  end

  alumno1.mostrarMatricula
  puts "El numero total de creditos del alumno es ".concat(alumno1.getNumCreditos.to_s)
  puts "Desmatriculando al almuno de una asignatura..."
  alumno1.desmatricularAsignatura(1000)
  alumno1.mostrarMatricula
  puts "Intentando desmatricular de asignatura no matriculada..."
  begin
    alumno1.desmatricularAsignatura(1000)
  rescue Exception => e
    puts e.message
  end
  puts
  puts "To string de Alumno, reutilizando el de persona"
  puts alumno1.to_s

end
```

En este fragmento de código se muestra un ejemplo del tratado de excepciones, en lugar del clásico `try{...}catch(){...}` en Ruby se usa la siguiente sintaxis:

```ruby
begin
    alumno1.desmatricularAsignatura(1000)
  rescue Exception => e
    puts e.message
  end

```

Debido a la ausencia de tipos en Ruby, el lenguaje proporciona un mecanismo para comprobar si el objeto responde a un método concreto, es decir, si lo tiene implementado. Esto se logra con `nombreObjeto.respond_to?("NombreMétodo")`

Vamos a ejecutar el programa:

```bash
hkr-> ruby Main.rb
Mostrando personas almacenadas en el sistema
Persona [nombre=Alejandro Alcalde], fechaNacimiento=1991-02-10]
Persona [nombre=Pepe], fechaNacimiento=1980-02-08]
Persona [nombre=Nombre del alum2], fechaNacimiento=1980-02-08]Esta estudiando Ing. Teleco, creditos 0
El alumno se encuentra matriculado de las siguientes asignaturas:
  Codigo Asig: 1000. Creditos 6
   Codigo Asig: 1006. Creditos 6
El numero total de creditos del alumno es 12
Desmatriculando al almuno de una asignatura...
El alumno se encuentra matriculado de las siguientes asignaturas:
    Codigo Asig: 1006. Creditos 6
Intentando desmatricular de asignatura no matriculada...
ERROR: El alumno no esta matriculado en la asignatura 1000

To string de Alumno, reutilizando el de persona
Persona [nombre=Nombre del alum1], fechaNacimiento=1980-02-08]Esta estudiando Ing. Informatica, creditos 6
```

Como mencioné al principio, el código de ambos programas está disponible para descargar:

Como introducción al lenguaje Ruby, ya que nunca lo había usado, leí el siguiente artículo:

- *Ruby in Twenty MinutesRuby in Twenty Minutes* »» <a href="http://www.ruby-lang.org/en/documentation/quickstart/" target="_blank">Visitar sitio</a>