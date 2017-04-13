---
author: alex
amp:
  elements: [amp-youtube]
categories: android
color: '#689F38'
date: 2016-06-14 07:45:21
description: "En este artículo se verá cómo almacenar datos del usuario en
  una base de datos SQLite o SharedPreferences"
image: hotlink-ok/ProgramacionAndroid-Persistencia-de-Datoscard.png
introduction: "Ejemplo de cómo guardar datos de usuario en Android"

mainclass: android
modified: null
tags:
- Bases de Datos Android
- Persistencia de datos Android
- Curso de Android
- "programación Android"
- tutoriales Android
- fragments Android
title: "Programación Android: Persistencia De Datos"
---

En el anterior artículo dimos un repaso a [fondo del típico Hola Mundo](/android/tutorial-android-hola-mundo-a-fondo/ "Programación Android: Hola Mundo a Fondo"), hoy vamos a ver cómo trabajar con persistencia de datos en Android.

<!--more--><!--ad-->

La mayoría de apps necesitan guardar datos, ya sea para no perder la información cuando se ejecuta el método `onPause()`, información de preferencias o cantidades mayores de información en [bases de datos](/bases-de-datos "Curso de base de datos"). Los distintos métodos de almacenamiento disponibles son:

- Pares clave-valor de tipos de datos simples en un fichero _Shared Preference_.
- Ficheros de cualquier tipo en el sistema de archivos.
- Bases de datos en SQLite.

<amp-youtube
    data-videoid="vgKSdjQGJII"
    layout="responsive"
    width="480" height="270"></amp-youtube>

## Pantalla principal

Empezaremos describiendo la pantalla principal (`DataPersistencyMainActivity`), su función es la siguiente:

Si se tiene una colección de datos relativamente pequeña en forma de pares clave-valor, se puede usar la API de SharedPreferences. Un objeto  de éste tipo apunta a un archivo conteniendo pares de datos. Pueden ser  privados o públicos.

Ésta API no debe confundirse con la API de Preference, que ayuda a construir  una interfaz gráfica para las preferencias de nuestra aplicación (Por debajo ésta usa [SharedPreferences](http://developer.android.com/training/basics/data-storage/shared-preferences.html)

Para mayores cantidades de datos se usarán bases de datos en SQLite. (El código se va explicando en los comentarios).

En el código siguiente están tanto la parte que trata con el `SharedPreferences` como el que accede a la base de datos. Para la base de datos es necesario crear un `AsyncTask` (El el código de abajo se nombra a esta clase `insertPerson`) que se encarga de realizar las consultas en un hilo separado al principal, para no bloquear la interfaz gráfica. Todo está comentado en el código.

```java
public class DataPersistencyMainActivity extends Activity {

    public static final String EDIT_TEXT_SHARED_PREFERENCES = "ejShared";
    private SharedPreferences mSharedPrefs;
    private PersonDbBHelper mDbHelper;
    private TextView mDbRecordsText;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_datapersistency_main);

        mSharedPrefs = getPreferences(Context.MODE_PRIVATE);

        // Inicializar elementos gráficos...
        // ...

        // Comprobamos si hay datos guardados.
        String value = mSharedPrefs.getString(EDIT_TEXT_SHARED_PREFERENCES, "");
        if (value != "") {
            editTextSharedPrefs.setText(value);
        }

        mDbHelper = new PersonDbBHelper(this);
        // Mostrar los datos en la base de datos si existen.
        new getPersons().execute();

        editTextSharedPrefs.setOnEditorActionListener(new OnEditorActionListener() {

            @Override
            public boolean onEditorAction(TextView v, int actionId, KeyEvent event) {
                if (actionId == R.id.save_shared || actionId == EditorInfo.IME_NULL) {

                    /*
                     * Con getSharedPreferences() es posible crear varios archivos de preferencias
                     * identificados por nombre.
                     * Con getPreferences(), usado desde un Activity únicamente se crea un archivo
                     * con el nombre de la actividad.
                     */

//                    Context context = getActivity();
//                    SharedPreferences sharedPref = context.getSharedPreferences(
//                            getString(R.string.preference_file_key), Context.MODE_PRIVATE);

                    mSharedPrefs
                            .edit()
                            .putString(EDIT_TEXT_SHARED_PREFERENCES, v.getText().toString())
                            .apply();

                    Toast.makeText(getApplicationContext(), "Guardando " + v.getText(),
                            Toast.LENGTH_LONG).show();

                    hideKB();
                    return true;
                }
                return false;
            }
        });

        saveToDbButton.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                new insertPerson().execute(firstNameED.getText().toString(),
                        secondNameED.getText().toString());
            }
        });

        showDbRecordsButton.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                mDbRecordsText.setText("ID \t FName");
                new getPersons().execute();
            }
        });

        deleteRowButton.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                new deleteRow().execute(Integer.parseInt(deleteRowED.getText().toString()));
            }
        });
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {

        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();
        if (id == R.id.action_settings) {
            return true;
        }
        return super.onOptionsItemSelected(item);
    }

    private void hideKB() {
        InputMethodManager inputManager = (InputMethodManager)
                getSystemService(Context.INPUT_METHOD_SERVICE);
        inputManager.hideSoftInputFromWindow(getCurrentFocus().getWindowToken(),
                InputMethodManager.HIDE_NOT_ALWAYS);
    }

    /**
     * Siempre que se realizen operaciones que conlleven carga a la CPU o puedan
     * tardar bastante tiempo, hay que lanzarlas en hilos separdos del principal,
     * encargado de la interfaz gráfica.
     */
    private class insertPerson extends AsyncTask<String, Void, Long> {

        @Override
        protected Long doInBackground(String... what) {

            SQLiteDatabase db = mDbHelper.getWritableDatabase();
            // Mapa de valores, cuyas claves serán los nombres de las columnas
            ContentValues values = new ContentValues();
            values.put(PersonEntry.COLUMN_NAME_FIRST_NAME, what[0]);
            values.put(PersonEntry.COLUMN_NAME_SECOND_NAME, what[1]);

            long newRowId = db.insert(PersonEntry.TABLE_NAME, null, values);
            return newRowId;

        }

        @Override
        protected void onPostExecute(Long result) {
            Toast.makeText(getApplicationContext(), "Insertada fila con ID: " + result,
                    Toast.LENGTH_SHORT).show();
        }
    }

    private class getPersons extends AsyncTask<Void, Void, String[]> {

        @Override
        protected String[] doInBackground(Void... params) {
            SQLiteDatabase db = mDbHelper.getReadableDatabase();

            // Definir la proyección de los datos que queremos, en este caso solo ID y primer nombre
            String[] projection = {
                    PersonEntry._ID,
                    PersonEntry.COLUMN_NAME_FIRST_NAME
            };

            // Definir el orden en que devolver los datos
            String sortOrder = PersonEntry.COLUMN_NAME_FIRST_NAME + " DESC";

            Cursor c = db.query(
                    PersonEntry.TABLE_NAME, // Nombre de la tabla
                    projection,             // Columnas a devolver
                    null,                   // Columnas para la cláusula WHERE
                    null,                   // Valores para la cláusula WHERE
                    null,                   // GROUP BY
                    null,                   // HAVING
                    sortOrder);             // ORDER BY

            // Recorrer la información devuelta
            String[] data = new String[c.getCount()];
            int i = 0;
            //c.moveToFirst();
            while (c.moveToNext()) {
                data[i++] =
                        c.getString(c.getColumnIndex(PersonEntry._ID)) + " \t " +
                                c.getString(c.getColumnIndex(PersonEntry.COLUMN_NAME_FIRST_NAME));
            }

            c.close();

            return data;
        }

        @Override
        protected void onPostExecute(String[] result) {
            for (String row : result) {
                mDbRecordsText.append(" \n " + row);
            }
        }
    }

    private class deleteRow extends AsyncTask<Integer, Void, Integer> {

        @Override
        protected Integer doInBackground(Integer... params) {
            SQLiteDatabase db = mDbHelper.getWritableDatabase();

            String selection;
            String[] selectionArgs = null;

            // Definición de la parte WHERE
            if (params[0] == -1) {
                selection = "1"; // Borra todas las filas
            } else {
                selection = PersonEntry._ID + " LIKE ?";
                selectionArgs = new String[]{String.valueOf(params[0])};
            }

            // Ejecutar la consulta SQL
            int rows_deleted = db.delete(PersonEntry.TABLE_NAME, selection, selectionArgs);

            return rows_deleted;
        }

        @Override
        protected void onPostExecute(Integer result) {
            Toast.makeText(getApplicationContext(), "Elminadas " + result + " filas",
                    Toast.LENGTH_SHORT).show();
        }
    }

}
```

## Abstracción de la base de datos

Para facilitar la reutilización de código y que el código sea escalable, se crea una abstacción de las tablas en la base de datos, en este caso para la tabla `persona`.

### Clase `PersonContract`

La finalidad de esta clase es servir abstracción a la base de datos. Aquí se definirá el esquema de representación de la base de datos, bien documentado. En la clase externa deberá ir todo campo global a la base de datos Échale un vistazo a un ejemplo real de [Google](https://android.googlesource.com/platform/frameworks/base/+/master/core/java/android/provider/ "Provider")

```java
public final class PersonContract {

    public PersonContract() {
    }

    /**
     * Clase interna que define el contenido de la tabla.
     *
     * Implementando BaseColumns, se añadirán dos entradas más a la tabla,
     * _ID y _COUNT.
     */
    public static abstract class PersonEntry implements BaseColumns{
        public static final String TABLE_NAME = "person";
        public static final String COLUMN_NAME_ENTRY_ID = "personID";
        public static final String COLUMN_NAME_FIRST_NAME = "firstname";
        public static final String COLUMN_NAME_SECOND_NAME = "secondname";
    }
}
```

### Clase `PersonDbBHelper`

Esta clase hereda de `SQLiteOpenHelper`, que proporciona un conjunto de [APIs](/buenas-practicas-para-el-diseno-de-una-api-restful-pragmatica/ "Buenas prácticas para el Diseño de una API RESTful Pragmática") útiles para el manejo de la base de datos. Como vemos también es una abstracción de la base de datos, lo cual permite tener el código mucho más ordenado. Si alguna vez necesitamos cambiar la estructura de la base de datos, solo  habrá que tocar esta clase, y sus respectivas `Contract`.

```java
public class PersonDbBHelper extends SQLiteOpenHelper {

    // De cambiar el esquema de la base de datos, hay que incrementar la versión
    public static final int DATABASE_VERSION = 1;
    public static final String DATABASE_NAME = "Persons.db";

    private static final String TEXT_TYPE = " TEXT";
    private static final String COMMA_SEP = ",";

    private static final String SQL_CREATE_ENTRIES =
            "CREATE TABLE " + PersonContract.PersonEntry.TABLE_NAME + " (" +
                    PersonContract.PersonEntry._ID + " INTEGER PRIMARY KEY," + // Heredado de BaseColumns
                    PersonContract.PersonEntry.COLUMN_NAME_ENTRY_ID + TEXT_TYPE + COMMA_SEP +
                    PersonContract.PersonEntry.COLUMN_NAME_FIRST_NAME + TEXT_TYPE + COMMA_SEP +
                    PersonContract.PersonEntry.COLUMN_NAME_SECOND_NAME + TEXT_TYPE  +
                    " )";

    private static final String SQL_DELETE_ENTRIES =
            "DROP TABLE IF EXISTS " + PersonContract.PersonEntry.TABLE_NAME;


    public PersonDbBHelper(Context context) {
        super(context, DATABASE_NAME, null, DATABASE_VERSION);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        db.execSQL(SQL_CREATE_ENTRIES);
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        /*
         * De cambiar el esquema en la base de datos, aquí habría que hacer
         * las modificaciones necesarias para actualizar de un esquema a otro,
         * para este ejemplo, simplemente la borraremos y la volveremos a crear
         */
        db.execSQL(SQL_DELETE_ENTRIES);
        onCreate(db);
    }

    @Override
    public void onDowngrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        // Proceso inverso a actualizar
        onUpgrade(db, oldVersion, newVersion);
    }
}
```
