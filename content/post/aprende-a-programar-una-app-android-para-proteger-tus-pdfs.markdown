---
author: jordi
categories:
- java
color: '#D32F2F'
date: 2015-07-07 15:38:30
description: "Hoy vamos a guiarte en el desarrollo de una aplicaci\xF3n Android que
  sirve para proteger tus documentos PDF de los ojos no autorizados, por medio de
  una contrase\xF1a."
image: Aprende-a-Programar-Una-App-Android-Para-Proteger-Tus-PDFs.jpg

mainclass: java
modified: null
tags:
- android
- pdf
- plugpdf
- lector pdf android
title: Aprende a Programar Una App Android Para Proteger Tus PDFs
---

Hoy vamos a guiarte en el desarrollo de una aplicación Android que sirve para proteger tus documentos PDF de los ojos no autorizados, por medio de una contraseña.

<figure>
<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/Aprende-a-Programar-Una-App-Android-Para-Proteger-Tus-PDFs.jpg" title="{{ page.title }}" alt="{{ page.title }}" width="450px" height="300px" />
</figure>

¿Por qué puede interesarte? Bien, esto es útil en varios escenarios, por ejemplo cuando quieres subir tus documentos sensibles a la nube, en formato PDF, y necesitas añadir una capa de seguridad encriptando el documento con un password.

<!--more--><!--ad-->

De hecho, como norma general, los usuarios de smartphones y tablets deberíamos preocuparnos por la seguridad de nuestros documentos sensibles, puesto que podemos terminar instalando decenas y decenas de apps que pueden acceder a nuestros recursos: tarjeta SD, cámara, contactos, localización, etc.

En algún momento dado, por algún fallo de alguna app instalada, o por algo inesperado, alguien podría acceder a nuestra información sensible. ¡Recuerda que en el mundo de la informática es bueno extremar las precauciones!

Dicho todo lo anterior, vamos a utilizar la librería PlugPDF. Este SDK ya viene de fábrica con una clase Java que se encarga de la protección de los documentos.

## PDF Protector ##

Este es el nombre que le vamos a poner a nuestra app de seguridad, disponible en la documentación oficial de PlugPDF: PDF Protector.

Es importante que sepas que el SDK considera dos contraseñas para encriptar los documentos: la contraseña de usuario (user) y la contraseña de propietario (owner, también llamada master).

La contraseña de usuario sirve para asegurar el documento cada vez que alguien lo va abrir. Por otro lado, la contraseña maestra (owner o master, como prefieras llamarla) es para proteger estas operaciones de gestión típicas:

- Imprimir
- Modificar el contenido
- Copiar el contenido
- Proteger las anotaciones
- Extraer información
- Rellenar campos de formulario

Lo que hace PDF Protector es preguntarte qué partes de tu PDF quieres asegurar.

<figure>
<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/Protege tus documentos PDF nativos.jpg" title="{{ page.title }}" alt="{{ page.title }}" width="960px" height="560px" />
</figure>
Figura 1. Protegiendo tus documentos PDF nativos

Como decimos, el user password es para proteger por contraseña la apertura del documento, y el master password para proteger las operaciones que desees. Así que cuando proteges tus PDF con un user password entonces te sale este diálogo al abrirlo.

<figure>
<amp-img on="tap:lightbox1" role="button" tabindex="0" layout="responsive" src="/img/Documento protegido por user password.jpg" title="{{ page.title }}" alt="{{ page.title }}" width="960px" height="560px" />
</figure>
Figura 2. Documento protegido por user password

Del mismo modo, las aplicaciones que intenten, por ejemplo, imprimir o modificar el contenido de tus documentos protegidos, también obtendrán el aviso correspondiente, indicando que dicha operación no es posible.

## El código, línea a línea ##

Entonces amigos y amigas, una vez presentado el problema que queremos resolver, [**clicad aquí**](https://plugpdf.com/protect-your-android-pdfs-with-a-password/ "Proteger con contraseña tus PDF") para acceder al artículo original de la documentación oficial de PlugPDF que explica, línea a línea, cómo podéis implementar esta app de seguridad en la práctica. Allí encontraréis todo el contexto necesario para hacer correr esta herramienta.

Es recomendable, eso sí, que antes eches un vistazo a la serie de tutoriales oficiales llamada **[Building Android PDF Apps](https://plugpdf.com/tag/building-android-pdf-apps/ "Building Android PDF Apps")**, y también al **[API Reference](https://plugpdf.com/api-references/ "API Reference PlugPDF")**. Los how-tos desarrollan unos ejemplos súper sencillos cuya dificultad va aumentando poco a poco a medida que los vas completando.

Total, que cuando ya estás familiarizado con la librería, solo tienes que programar un método `openDocument(final String fileName, String password)` como el siguiente para lanzar el diálogo de alerta de la Figura 2.

```java

    /**
     * Tries to open the given PDF.
     *
     * It first assumes that the document is not password protected, in which case initializes the
     * GUI; otherwise, displays the user a password dialog box.
     *
     * @param fileName The file's path
     * @param password The file's password
     */
    public void openDocument(final String fileName, String password) {
      // if the PDF is not password protected the GUI is initialized
      try {
        doc = new PDFDocument(fileName, password);
        if (doc != null) {
          initGUI();
        }
      }
      // contrarily, a password dialog is displayed
      catch (PlugPDFException.WrongPassword e) {
        PasswordDialog dialog = new PasswordDialog(this) {
             public void onInputtedPassword(String password) {
            openDocument(fileName, password);
          }
        };
        dialog.show();
      } catch (Exception e) {
        Log.e("PlugPDF", "[ERROR] open fail because, ", e);
      }
    }

```

El método initGUI() se encarga de inicializar la pantalla que muestra la Figura 1.

```java

    /**
     * Initializes a Graphic User Interface (GUI) for the user to encrypt his/her PDF file.
     */
    protected void initGUI() {
      setContentView(R.layout.encrypt_pdf);
      // text fields
      userPwdEditText = (EditText) findViewById(R.id.userPwdEditText);
      masterPwdEditText = (EditText) findViewById(R.id.masterPwdEditText);
      // checkboxes
      checkPrint = (CheckBox) findViewById(R.id.checkPrint);
      checkModifyContent = (CheckBox) findViewById(R.id.checkModifyContent);
      checkCopyContent = (CheckBox) findViewById(R.id.checkCopyContent);
      checkModifyAnnot = (CheckBox) findViewById(R.id.checkModifyAnnot);
      checkFillField = (CheckBox) findViewById(R.id.checkFillField);
      checkExtract = (CheckBox) findViewById(R.id.checkExtract);
      checkDocumentAssembly = (CheckBox) findViewById(R.id.checkDocumentAssembly);
      // buttons
      encryptButton = (Button) findViewById(R.id.encryptButton);
      // listeners
      encryptButton.setOnClickListener(new View.OnClickListener() {
        @Override
        public void onClick(View arg0) {
          if (encryptPDF(doc.getFilePath())) {
            setResult(RESULT_OK);
          } else {
            setResult(RESULT_CANCELED);
          }
          finish();
        }
      });
    }

```

Luego, para proteger las operaciones de gestión que hemos listado antes, hay que programar el método `encryptPDF(String filePath)`:

```java

    /**
     * Encrypts the given PDF.
     *
     * @param filePath The file's path
     * @return true if the file was successfully encrypted, otherwise false
     */
    public boolean encryptPDF(String filePath) {
      try {
        int perm = PDFDocument.getUserAccessPermissions(
          checkPrint.isChecked(),
          checkModifyContent.isChecked(),
          checkCopyContent.isChecked(),
          checkModifyAnnot.isChecked(),
          checkFillField.isChecked(),
          checkExtract.isChecked(),
          checkDocumentAssembly.isChecked());
        doc.setEncrypt(userPwdEditText.getText().toString(), masterPwdEditText.getText().toString(), perm);
        doc.saveFile();
        doc.release();
        return true;
      }
      catch (Exception e) {
        Log.e("PDF Protector", "Exception", e);
        return false;
      }
    }

```

Este código es el que se ejecuta cuando el usuario clica en el botón Accept de la Figura 1.

El método `getUserAccessPermissions` de `PDFDocument` recibe en la variable `perm` los permisos que quieres establecer, y luego se los tienes que pasar a `setEncrypt` (método que también pertenece a `PDFDocument`) para encriptar el documento con dichos permisos.

¡Ya hemos terminado! Esperamos que el tutorial de hoy os haya gustado. Consigue tu **[tu licencia PlugPDF gratis](https://plugpdf.com/download/)** ahora y comienza a desarrollar herramientas de seguridad PDF hoy mismo.
