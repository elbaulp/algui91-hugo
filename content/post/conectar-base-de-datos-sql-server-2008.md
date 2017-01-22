---
author: alex
categories:
- android
- aplicaciones
- basededatos
color: '#689F38'
date: '2016-12-12'
lastmod: 2016-09-06
layout: post.amp
mainclass: android
permalink: /conectar-base-de-datos-sql-server-2008/
tags:
- android jdbc sqlserver 2008
- android sqlserver
- conectar java con oracle
- curso android pdf
- programar base datoss java
title: "Conectar base de datos sql Server 2008 a aplicaci\xF3n Java remotamente"
---

En anteriores entradas expliqué como he ido desarrollando una aplicación para [Android](/curso-programacion-android/ "Curso de programación en Android") que enviaba mensajes al pc para un proyecto de fin de curso.

Bien, ahora voy a explicar en que consiste la aplicación exactamente, que aún no lo he hecho.Se trara de desarrollar un programa para bares, en la cual cada camarero tendrá una PDA, o dispositivo Android, desde la cual anotará los pedidos de los clientes. La PDA enviará estos pedidos al servidor que contiene una Base de datos, y este imprimirá los tickets.

Para esto es necesario establecer una conexión PDA-Base de datos del Servidor.

<!--more--><!--ad-->

Lo primero que hay que hacer es intalar SQL server 2008 y configurarlo para que se pueda acceder de dos formas (con autentificación windows y con autentificación SQl server), esto se pregunta durante la instalación de SQL server, posteriormente hay que crear un usuario SQL server, [aqui se explica como hacerlo][2]. Tambien debemos permitir [conexiones remotas.][3]

Ahora vamos al código, (que he sacado de un ejemplo de la web de [microsoft][4]), al cual solo he añadido una consulta a una tabla de mi base de datos.

Ahora vamos a crear un proyecto, yo lo he creado en ecplise, es necesario agregarle las librerías JDBC para que hagan de puente entre la aplicación y la base de datos. En ecplise se añaden en las propiedades del proyecto/JAva Build Path/Libraries, estas librerías podeis descargarlas de [aqui][5], si no lo hacéis en ecplise, en este [enlace][6] se ve como configurarlo

También puedes ver cómo <a href="/conectar-base-de-datos-oracle/">Conectar una base de datos ORACLE a aplicación Java remotamente</a>

Dejo el código por aquí:

```java
import java.sql.Statement;

public class Test {
 private java.sql.Connection connection = null;
 private final String url = "jdbc:microsoft:sqlserver://";
 private final String serverName = "192.168.1.38";
 private final String portNumber = "1433";
 private final String databaseName = "db_WifiBar";
 private final String userName = "algui91";
 private final String password = "1234";
 private final String statement = "select * from prueba;";
 // Informs the driver to use server a side-cursor,
 // which permits more than one active statement
 // on a connection.
 private final String selectMethod = "Direct";

 // Constructor
 public Test() {}

 private String getConnectionUrl() {
  return url + serverName + ":" + portNumber + ";databaseName=" + databaseName + ";selectMethod=" + selectMethod + ";";
 }

 private java.sql.Connection getConnection() {
  try {
   Class.forName("com.microsoft.jdbc.sqlserver.SQLServerDriver");
   connection = java.sql.DriverManager.getConnection(getConnectionUrl(),
    userName, password);
   if (connection != null)
    System.out.println("Connection Successful!");
  } catch (Exception e) {
   e.printStackTrace();
   System.out.println("Error Trace in getConnection() : " + e.getMessage());
  }
  return connection;
 }

 /*
  * Display the driver properties, database details
  */

 public void displayDbProperties() {
  java.sql.DatabaseMetaData dm = null;
  java.sql.ResultSet result = null;
  try {
   connection = this.getConnection();
   if (connection != null) {
    dm = connection.getMetaData();
    System.out.println("Driver Information");
    System.out.println("\tDriver Name: " + dm.getDriverName());
    System.out
     .println("\tDriver Version: " + dm.getDriverVersion());
    System.out.println("\nDatabase Information ");
    System.out.println("\tDatabase Name: " + dm.getDatabaseProductName());
    System.out.println("\tDatabase Version: " + dm.getDatabaseProductVersion());

    Statement select = connection.createStatement();
    result = select.executeQuery(statement);

    while (result.next()) {
     System.out.println("Nombre: " + result.getString(1) + "\n");
     System.out.println("Apellido: " + result.getString(2) + "\n");
     System.out.println("Dni: " + result.getString(3) + "\n");
    }
    result.close();
    result = null;
    closeConnection();
   } else
    System.out.println("Error: No active Connection");
  } catch (Exception e) {
   e.printStackTrace();
  }
  dm = null;
 }

 private void closeConnection() {
  try {
   if (connection != null)
    connection.close();
   connection = null;
  } catch (Exception e) {
   e.printStackTrace();
  }
 }

 public static void main(String[] args) throws Exception {
  Test myDbTest = new Test();
  myDbTest.displayDbProperties();
 }
}
```

Y la sálida de ejecutar la aplicación:

```bash
Connection Successful!
Driver Information
Driver Name: SQLServer
Driver Version: 2.2.0022
Database Information
Database Name: Microsoft SQL Server
Database Version: Microsoft SQL Server Yukon - 10.0.1600
Algunos datos de la BD
Nombre: Alejandro
Apellido: Alcalde
Dni: 12345678
```

Espero que os sirva de ayuda, he escrito esta entrada rápido por falta de tiempo, así que si algo no se entiende no dudes en preguntar e intentaré ayudarte.

 [2]: http://kbase.gfi.com/showarticle.asp?id=KBID002804
 [3]: http://www.blogdemegastar.com/2010/09/pasos-para-configurar-sql-server-2008.html
 [4]: http://support.microsoft.com/kb/313100
 [5]: http://www.akadia.com/download/documents/sqlsrv_jdbc.tar.gz
 [6]: http://www.akadia.com/services/sqlsrv_jdbc.html