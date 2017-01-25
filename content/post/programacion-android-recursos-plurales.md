---
author: alex
categories:
- android
- opensource
color: '#689F38'
date: '2016-01-01'
lastmod: 2016-09-26

mainclass: android
url: /programacion-android-recursos-plurales/
tags:
- curso android pdf
title: "Programaci\xF3n Android: Recursos - Plurales"
---

### Introducción

Los recursos Plurals son un conjunto de strings. Estos strings representan una forma de escribir cantidades numéricas, por ejemplo, cuantos huevos hay en una cesta. Vamos a ver un ejemplo:

- Hay 1 huevo
- Hay 2 huevos
- Hay 10 huevos

Como puedes notar, las frases son iguales para los números 2 y 10. Sin embargo, la frase para 1 huevo es diferente. Android permite representar esta variación con el recurso llamado plurals. En el siguiente ejemplo vemos como se representan estas dos variaciones.

<!--more--><!--ad-->

```xml
<resources>
<plurals name="huevos_en_una_cesta">
   <item quantity="one">Hay 1 huevo</item>
   <item quantity="other">Hay %d huevos</item>
</plurals>
</resources>
```

Las dos variaciones se representan como dos cadenas de texto diferentes bajo el mismo plural. Ahora, podemos usarlo desde el código Java para mostrar correctamente la cadena correspondiente a la cantidad de huevos. El primer parámetro de ***getQuantityString()*** es el ID del plural. El segundo selecciona la cadena a usar. Cuando el valor de la cantidad es 1, usamos la cadena tal como es. Cuando el valor es distinto a 1, debemos pasar un tercer parámetro que será el valor a colocar en el lugar de %d. Siempre deberá haber al menos 3 parámetros si usamos cadenas formateadas en los plurales.

```java
Resources res = tu_actividad.getResources();
String s1 = res.getQuantityString(R.plurals.huevos_en_una_cesta, 0, 0);
String s2 = res.getQuantityString(R.plurals.huevos_en_una_cesta, 1, 1);
String s3 = res.getQuantityString(R.plurals.huevos_en_una_cesta, 2, 2);
String s4 = res.getQuantityString(R.plurals.huevos_en_una_cesta, 10, 10);
```

Con este código, cada cantidad se mostrará con su correcta cadena de texto.

Existen otras posibilidades que podemos aplicar al atributo *quantity* del elemento item. Para ello, recomiendo que lean el código fuente de Resources.java y PluralsRules.java para entenderlo correctamente. Aún así, dejo lo fundamental de estas dos ficheros para que entiendan bien el funcionamiento:

### PluralRules.java

```java
abstract class PluralRules {

    static final int QUANTITY_OTHER = 0x0000;
    static final int QUANTITY_ZERO  = 0x0001;
    static final int QUANTITY_ONE   = 0x0002;
    static final int QUANTITY_TWO   = 0x0004;
    static final int QUANTITY_FEW   = 0x0008;
    static final int QUANTITY_MANY  = 0x0010;

    static final int ID_OTHER = 0x01000004;

    abstract int quantityForNumber(int n);

    final int attrForNumber(int n) {
        return PluralRules.attrForQuantity(quantityForNumber(n));
    }

    static final int attrForQuantity(int quantity) {
        // see include/utils/ResourceTypes.h
        switch (quantity) {
            case QUANTITY_ZERO: return 0x01000005;
            case QUANTITY_ONE:  return 0x01000006;
            case QUANTITY_TWO:  return 0x01000007;
            case QUANTITY_FEW:  return 0x01000008;
            case QUANTITY_MANY: return 0x01000009;
            default:            return ID_OTHER;
        }
    }

    static final String stringForQuantity(int quantity) {
        switch (quantity) {
            case QUANTITY_ZERO:
                return "zero";
            case QUANTITY_ONE:
                return "one";
            case QUANTITY_TWO:
                return "two";
            case QUANTITY_FEW:
                return "few";
            case QUANTITY_MANY:
                return "many";
            default:
                return "other";
        }
    }

    static final PluralRules ruleForLocale(Locale locale) {
        String lang = locale.getLanguage();
        if ("cs".equals(lang)) {
            if (cs == null) cs = new cs();
            return cs;
        }
        else {
            if (en == null) en = new en();
            return en;
        }
    }

    private static PluralRules cs;
    private static class cs extends PluralRules {
        int quantityForNumber(int n) {
            if (n == 1) {
                return QUANTITY_ONE;
            }
            else if (n >= 2 && n < = 4) {
                return QUANTITY_FEW;
            }
            else {
                return QUANTITY_OTHER;
            }
        }
    }

    private static PluralRules en;
    private static class en extends PluralRules {
        int quantityForNumber(int n) {
            if (n == 1) {
                return QUANTITY_ONE;
            }
            else {
                return QUANTITY_OTHER;
            }
        }
    }
}
```

### Resources.java

```java
public CharSequence getQuantityText(int id, int quantity) throws NotFoundException {
        PluralRules rule = getPluralRule();
        CharSequence res = mAssets.getResourceBagText(id, rule.attrForNumber(quantity));
        if (res != null) {
            return res;
        }
        res = mAssets.getResourceBagText(id, PluralRules.ID_OTHER);
        if (res != null) {
            return res;
        }
        throw new NotFoundException("Plural resource ID #0x" + Integer.toHexString(id)
                + " quantity=" + quantity
                + " item=" + PluralRules.stringForQuantity(rule.quantityForNumber(quantity)));
    }

    private PluralRules getPluralRule() {
        synchronized (mSync) {
            if (mPluralRule == null) {
                mPluralRule = PluralRules.ruleForLocale(mConfiguration.locale);
            }
            return mPluralRule;
        }
    }

```

En la mayoria de los idiomas normalmente hay dos posibles valores, _one_ y _other_, pero para el Checo, los valores son _one_ para 1, _few_ del 2 al 4 y _other_ para el resto.

### Siguiente Tema: [Programación Android: Recursos - Trabajar con recursos XML arbitrarios][1]

 [1]: https://elbauldelprogramador.com/programacion-android-recursos-trabajar/
