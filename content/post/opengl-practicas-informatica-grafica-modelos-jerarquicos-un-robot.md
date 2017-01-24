---
author: alex
amp:
  elements: [amp-youtube]
categories:
- c
color: '#E64A19'
date: '2016-01-01'
description: "El curso pasado hice unas pr\xE1cticas Inform\xE1tica Gr\xE1fica (IG)
  en la que hab\xEDa que implementar alg\xFAn objeto con modelos jer\xE1rquicos. La
  pr\xE1ctica se basa en una plantilla que encontr\xE9 de la universidad http://www.csc.villanova.edu."
lastmod: 2015-12-22
layout: post.amp
mainclass: dev
url: /opengl-practicas-informatica-grafica-modelos-jerarquicos-un-robot/
tags:
- practicas IG etsiit
- practicas IG ugr
- "practicas inform\xE1tica Gr\xE1fica"
- practicas opengl
title: "OpenGL - Pr\xE1cticas Inform\xE1tica Gr\xE1fica: Modelos jer\xE1rquicos  -
  Un Robot"
---

El curso pasado hice unas prácticas Informática Gráfica (IG) en la que había que implementar algún objeto con modelos jerárquicos. La práctica se basa en una plantilla que encontré de la universidad [http://www.csc.villanova.edu][1].

Aquí dejo el código y un vídeo demostrativo, también está disponible en [Github][2].

<amp-youtube
    data-videoid="ZBX2a1c3KCE"
    layout="responsive"
    width="480" height="270"></amp-youtube>

<!--more--><!--ad-->

## Código Fuente

```c
/* Program: robotSkeleton.cpp (Chapter 10)
 *
 * Draw a Hierarchical Robot using cylinders (quadrics).
 * Traverse tree to display. Cylinders are displayed filled.
 * Keyboard interaction should enable joints to rotate.
 * Light/material properties are set.
 *
 * The user can rotate the scene by dragging the mouse with the
 * left button pressed down; translate the scene using the arrow
 * keys; and zoom in and out using the keys Home and End.
 */

#ifdef __APPLE__
#include <glut>glut.h>
#else
</glut>/  #include <windows.h>
#include <gl>glut.h>
#endif

#include <math.h>
#include <stdlib.h>
#include <iostream>
#include <unistd.h>
#include <time.h>

using namespace std;

</gl>* Variables to control the spped of rotation/translation/zoom */
#define DEGREES_PER_PIXEL  0.6f
#define UNITS_PER_PIXEL        0.1f
#define ZOOM_FACTOR        0.04f

/* Enumeration of body parts */
enum {
  TORSO = 0,
  LUA,
  LLA,
  RUA,
  RLA,
  LUL,
  LLL,
  RUL,
  RLL,
  DANCE,
  QUIT
};

/* Variables to control the size of the robot */
#define HEAD_HEIGHT 3.0
#define HEAD_RADIUS 1.0

#define TORSO_HEIGHT 5.0
#define TORSO_RADIUS 1.0

#define UPPER_ARM_HEIGHT 3.0
#define LOWER_ARM_HEIGHT 2.0
#define UPPER_ARM_RADIUS  0.5
#define LOWER_ARM_RADIUS  0.5

#define UPPER_LEG_HEIGHT 3.0
#define LOWER_LEG_HEIGHT 2.0
#define UPPER_LEG_RADIUS  0.5
#define LOWER_LEG_RADIUS  0.5

const int AXIS_SIZE = 5000;

/* Structure to define the state of the mouse */
typedef struct {
  bool leftButton;
  bool rightButton;
  int x;
  int y;
} MouseState;

MouseState mouseState = { false, false, 0, 0 };

/* Scene rotation angles to alter interactively */
float xRotate = 0, yRotate = 0;

/* Camera position and orientation -- used by gluLookAt */
GLfloat eye[] = { 0, 0, 20 };
GLfloat at[] = { 0, 0, 0 };

GLUquadricObj *t, *h, /* torso and head */
*lua, *lla, *rua, *rla, /* arms */
*lul, *lll, *rul, *rll; /* legs */
/*
 * lua - left upper arm
 * lla - left lower arm
 * rua - right upper arm
 * rla - right lower arm
 * lul - left upper leg
 * lll - left lower leg
 * rul - right upper leg
 * rll - right lower leg
 */

/* initial joint angles */
static GLfloat theta[QUIT] = { 0, 0, 0, 0, 0, 0, 0, 0, 0.0, 0.0 };
short int direccion[QUIT] = { 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 };
/* torso position */
static GLfloat center[3] = { 0, 0, 0 };
/* joint angle to alter interactively */
static GLint angle = 0; /* initially, TORSO */
/* Dance mode or not? */
bool dance = false;

double randRange(double min, double max) {
  return rand() * (max - min) / RAND_MAX + min;
}

void head() {
  glPushMatrix();
  glScalef(HEAD_RADIUS, HEAD_HEIGHT / 2, HEAD_RADIUS);
  gluSphere(h, 1.0, 10, 10);
  glPopMatrix();
}

void torso() {
  glPushMatrix();
  glRotatef(90.0, 1.0, 0.0, 0.0);
  gluCylinder(t, TORSO_RADIUS, TORSO_RADIUS, TORSO_HEIGHT, 10, 10);
  glPopMatrix();
}

void left_upper_arm() {
  glPushMatrix();
  glRotatef(90, 0, 1, 0);
  gluCylinder(lua, UPPER_ARM_RADIUS, UPPER_ARM_RADIUS, UPPER_ARM_HEIGHT, 10,
              10);
  glPopMatrix();
}

void left_lower_arm() {
  glPushMatrix();
  glRotatef(90, 0, 1, 0);
  gluCylinder(lla, LOWER_ARM_RADIUS, LOWER_ARM_RADIUS, LOWER_ARM_HEIGHT, 10,
              10);
  glPopMatrix();
}

void right_upper_arm() {
  glPushMatrix();
  glRotatef(-90, 0, 1, 0);
  gluCylinder(rua, UPPER_ARM_RADIUS, UPPER_ARM_RADIUS, UPPER_ARM_HEIGHT, 10,
              10);
  glPopMatrix();
}

void right_lower_arm() {
  glPushMatrix();
  glRotatef(-90, 0, 1, 0);
  gluCylinder(lla, LOWER_ARM_RADIUS, LOWER_ARM_RADIUS, LOWER_ARM_HEIGHT, 10,
              10);
  glPopMatrix();
}

void left_upper_leg() {
  glPushMatrix();
  glRotatef(90, 1, 0, 0);
  gluCylinder(lul, UPPER_LEG_RADIUS, UPPER_LEG_RADIUS, UPPER_LEG_HEIGHT, 10,
              10);
  glPopMatrix();
}

void left_lower_leg() {
  glPushMatrix();
  glRotatef(90, 1, 0, 0);
  gluCylinder(lll, LOWER_LEG_RADIUS, LOWER_LEG_RADIUS, LOWER_LEG_HEIGHT, 10,
              10);
  glPopMatrix();
}

void right_upper_leg() {
  glPushMatrix();
  glRotatef(90, 1, 0, 0);
  gluCylinder(rul, UPPER_LEG_RADIUS, UPPER_LEG_RADIUS, UPPER_LEG_HEIGHT, 10,
              10);
  glPopMatrix();
}

void right_lower_leg() {
  glPushMatrix();
  glRotatef(90, 1, 0, 0);
  gluCylinder(rll, LOWER_LEG_RADIUS, LOWER_LEG_RADIUS, LOWER_LEG_HEIGHT, 10,
              10);
  glPopMatrix();
}

void DrawRobot(float x, float y, float z, float lua, float lla, float rua,
               float rla, float lul, float lll, float rul, float rll) {
  torso();
  glPushMatrix();
    glTranslatef(0, HEAD_HEIGHT / 2, 0);
    head();
  glPopMatrix();
  glPushMatrix();
    glTranslatef(TORSO_RADIUS, 0, 0);
    glRotatef(lua, 0, 0, 1);
    left_upper_arm();
    glTranslatef(UPPER_ARM_HEIGHT, 0, 0);
    glRotatef(lla, 0, 0, 1);
    left_lower_arm();
  glPopMatrix();
  glPushMatrix();
    glTranslatef(-TORSO_RADIUS, 0, 0);
    glRotatef(rua, 0, 0, 1);
    right_upper_arm();
    glTranslatef(-UPPER_ARM_HEIGHT, 0, 0);
    glRotatef(rla, 0, 0, 1);
    right_lower_arm();
  glPopMatrix();
  glPushMatrix();
  glTranslatef(TORSO_RADIUS, -TORSO_HEIGHT, 0);
    glRotatef(lul, 1, 0, 0);
    left_upper_leg();
    glTranslatef(0, -UPPER_LEG_HEIGHT, 0);
    glRotatef(lll, 1, 0, 0);
    left_lower_leg();
  glPopMatrix();
  glPushMatrix();
    glTranslatef(-TORSO_RADIUS, -TORSO_HEIGHT, 0);
    glRotatef(rul, 1, 0, 0);
    right_upper_leg();
    glTranslatef(0, -UPPER_LEG_HEIGHT, 0);
    glRotatef(rll, 1, 0, 0);
    right_lower_leg();
  glPopMatrix();
}

/* Allocate quadrics with filled drawing style */
void InitQuadrics() {
  t = gluNewQuadric();
  gluQuadricDrawStyle(t, GLU_FILL);
  lua = gluNewQuadric();
  gluQuadricDrawStyle(lua, GLU_FILL);
  h = gluNewQuadric();
  gluQuadricDrawStyle(h, GLU_FILL);
  lla = gluNewQuadric();
  gluQuadricDrawStyle(lla, GLU_FILL);
  rua = gluNewQuadric();
  gluQuadricDrawStyle(rua, GLU_FILL);
  lul = gluNewQuadric();
  gluQuadricDrawStyle(lul, GLU_FILL);
  lll = gluNewQuadric();
  gluQuadricDrawStyle(lll, GLU_FILL);
  rul = gluNewQuadric();
  gluQuadricDrawStyle(rul, GLU_FILL);
  rll = gluNewQuadric();
  gluQuadricDrawStyle(rll, GLU_FILL);
}

//**************************************************************************
// Funcion que dibuja los ejes utilizando la primitiva grafica de lineas
//***************************************************************************

void draw_axis() {
  glBegin(GL_LINES);
  // eje X, color rojo
  glColor3f(1, 0, 0);
  glVertex3f(-AXIS_SIZE, 0, 0);
  glVertex3f(AXIS_SIZE, 0, 0);
  // eje Y, color verde
  glColor3f(0, 1, 0);
  glVertex3f(0, -AXIS_SIZE, 0);
  glVertex3f(0, AXIS_SIZE, 0);
  // eje Z, color azul
  glColor3f(0, 0, 1);
  glVertex3f(0, 0, -AXIS_SIZE);
  glVertex3f(0, 0, AXIS_SIZE);
  glEnd();
}

/*
 *  This function is called whenever the display needs
 *  to be redrawn. First called when program starts.
 */

void Display(void) {
  /* draw to the back buffer */
  glDrawBuffer(GL_BACK);

  /* clear the display */
  glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);

  //draw_axis();

  /* (Re)position the camera */
  glMatrixMode(GL_MODELVIEW);
  glLoadIdentity();
  gluLookAt(eye[0], eye[1], eye[2], at[0], at[1], at[2], 0, 1, 0);

  /* Rotate the scene in the x and y directions */
  glRotatef(xRotate, 0, 1, 0);
  glRotatef(yRotate, 1, 0, 0);

  DrawRobot(center[0], center[1], center[2], theta[LUA], theta[LLA], theta[RUA],
            theta[RLA], theta[LUL], theta[LLL], theta[RUL], theta[RLL]);

  /* Before returning, flush the graphics buffer
   * so all graphics appear in the window */
  glFlush();
  glutSwapBuffers();
}

/**
 * Generar direcciones aleatorias
 */
void genDirec() {
  for (int i = 0; i < QUIT; i++) {
    int s = randRange(-2, 2);
    while (s == 0)
      s = randRange(-2, 2);
    direccion[i] = s;
  }
}

/*
 * An idle event is generated when no other event occurs.
 * Robot dances during idle times.
 */
void Idle(int d) {
  /* insert code here to make robot dance */

  if (d) {
    theta[LUA] += 3 * direccion[LUA];
    theta[LLA] += 3 * direccion[LLA];
    theta[RUA] += 3 * direccion[RUA];
    theta[RLA] += 3 * direccion[RLA];
    theta[LUL] += 3 * direccion[LUL];
    theta[LLL] += 3 * direccion[LLL];
    theta[RUL] += 3 * direccion[RUL];
    theta[RLL] += 3 * direccion[RLL];
    if (theta[LUA] > 60 || theta[LUA] < -60)
      direccion[LUA] *= -1;
    if (theta[LLA] > 30 || theta[LLA] < -30)
      direccion[LLA] *= -1;
    if (theta[RUA] > 60 || theta[RUA] < -60)
      direccion[RUA] *= -1;
    if (theta[RLA] > 30 || theta[RLA] < -30)
      direccion[RLA] *= -1;
    if (theta[LUL] > 90 || theta[LUL] < -90)
      direccion[LUL] *= -1;
    if (theta[LLL] > 45 || theta[LLL] < -45)
      direccion[LLL] *= -1;
    if (theta[RUL] > 90 || theta[RUL] < -90)
      direccion[RUL] *= -1;
    if (theta[RLL] > 45 || theta[RLL] < -45)
      direccion[RLL] *= -1;
    glutPostRedisplay();
  }
  glutTimerFunc(10, Idle, dance);
}
/*
 * A keyboard event occurs when the user presses a key:
 * '+' should cause joint angles to increase by 5 degrees
 * (within reasonable bounds)
 * '-' should cause joint angles to decrease by 5 degrees
 */
void Keyboard(unsigned char key, int x, int y) {
  switch (key) {
    case 'q':
      theta[LUA] += 5;
      break;
    case 'w':
      theta[LUA] -= 5;
      break;
    case 'e':
      theta[LLA] += 5;
      break;
    case 'r':
      theta[LLA] -= 5;
      break;
    case 'a':
      theta[RUA] += 5;
      break;
    case 's':
      theta[RUA] -= 5;
      break;
    case 'd':
      theta[RLA] += 5;
      break;
    case 'f':
      theta[RLA] -= 5;
      break;
    case 't':
      theta[LUL] += 5;
      break;
    case 'y':
      theta[LUL] -= 5;
      break;
    case 'u':
      theta[LLL] += 5;
      break;
    case 'i':
      theta[LLL] -= 5;
      break;
    case 'g':
      theta[RUL] += 5;
      break;
    case 'h':
      theta[RUL] -= 5;
      break;
    case 'j':
      theta[RLL] += 5;
      break;
    case 'k':
      theta[RLL] -= 5;
      break;
    case 'b':
      dance = !dance;
      genDirec();
      break;
    case 'p':
      exit(0);
  }
  glutPostRedisplay();
}

/*
 * A special keyboard event occurs when the user presses a
 * special key (arrows, F? keys). Arrows cause the scene to
 * move in the direction indicated; this is accomplished by
 * moving camera position (and maintaining the orientation).
 * HOME and END keys should cause the scene to zoom in and
 * out; this is accomplished by moving the camera along the
 * vector between the eye and the lookat point.
 */
void SpecialKey(int key, int x, int y) {
  switch (key) {
    case GLUT_KEY_LEFT:
      /* as camera moves to the right, the image moves to the left */
      eye[0] = eye[0] + UNITS_PER_PIXEL;
      at[0] = at[0] + UNITS_PER_PIXEL;
      break;
    case GLUT_KEY_RIGHT:
      eye[0] = eye[0] - UNITS_PER_PIXEL;
      at[0] = at[0] - UNITS_PER_PIXEL;
      break;
    case GLUT_KEY_UP:
      eye[1] = eye[1] - UNITS_PER_PIXEL;
      at[1] = at[1] - UNITS_PER_PIXEL;
      break;
    case GLUT_KEY_DOWN:
      eye[1] = eye[1] + UNITS_PER_PIXEL;
      at[1] = at[1] + UNITS_PER_PIXEL;
      break;
    case GLUT_KEY_END: /* zoom out */
      eye[0] = (1 + ZOOM_FACTOR) * eye[0] - at[0] * ZOOM_FACTOR;
      eye[1] = (1 + ZOOM_FACTOR) * eye[1] - at[1] * ZOOM_FACTOR;
      eye[2] = (1 + ZOOM_FACTOR) * eye[2] - at[2] * ZOOM_FACTOR;
      break;
    case GLUT_KEY_HOME: /* zoom in */
      eye[0] = (1 - ZOOM_FACTOR) * eye[0] + at[0] * ZOOM_FACTOR;
      eye[1] = (1 - ZOOM_FACTOR) * eye[1] + at[1] * ZOOM_FACTOR;
      eye[2] = (1 - ZOOM_FACTOR) * eye[2] + at[2] * ZOOM_FACTOR;
      break;
  }
  glutPostRedisplay();
}

void Mouse(int button, int state, int x, int y) {
  // update the button state
  if (button == GLUT_LEFT_BUTTON) {
    if (state == GLUT_DOWN)
      mouseState.leftButton = true;
    else
      mouseState.leftButton = false;
  }
  if (button == GLUT_RIGHT_BUTTON) {
    if (state == GLUT_DOWN)
      mouseState.rightButton = true;
    else
      mouseState.rightButton = false;
  }

  // update the mouse position, so we can track the mouse move
  mouseState.x = x;
  mouseState.y = y;
}

void MouseMove(int x, int y) {
  /* Calculate the displacement in movement */
  int xDelta = mouseState.x - x;
  int yDelta = mouseState.y - y;

  /* Commit the mouse position */
  mouseState.x = x;
  mouseState.y = y;

  /* If left button is down, rotate when mouse is moved */
  if (mouseState.leftButton) {
    xRotate -= xDelta * DEGREES_PER_PIXEL;
    yRotate -= yDelta * DEGREES_PER_PIXEL;
  }
  glutPostRedisplay();
}

/*
 *  Invokes OpenGL commands that set the lighting and
 *  material properties and then enables light 0.
 */
void EnableLighting(void) {
  /* Control material properties */
  GLfloat mat_specular[] = { 0.7, 0.0, 0.0, 1.0 };
  GLfloat mat_diffuse[] = { 0.5, 0.0, 0.0, 1.0 };
  GLfloat mat_ambient[] = { 0.5, 0.0, 0.0, 1.0 };
  GLfloat mat_shininess = { 7.0 };

  /* Control lighting properties */
  GLfloat light_ambient[] = { .5, .0, .0, 1.0 };
  GLfloat light_diffuse[] = { .5, .0, .0, 1.0 };
  GLfloat light_specular[] = { .7, .0, .0, 1.0 };
  GLfloat light_position[] = { 100.0, 80.0, 120.0, 1.0 };

  /* set up ambient, diffuse, and specular components for light 0 */
  glLightfv(GL_LIGHT0, GL_AMBIENT, light_ambient);
  glLightfv(GL_LIGHT0, GL_DIFFUSE, light_diffuse);
  glLightfv(GL_LIGHT0, GL_SPECULAR, light_specular);
  glLightfv(GL_LIGHT0, GL_POSITION, light_position);

  /* define material properties for front face of all polygons */
  glMaterialfv(GL_FRONT, GL_SPECULAR, mat_specular);
  glMaterialfv(GL_FRONT, GL_AMBIENT, mat_ambient);
  glMaterialfv(GL_FRONT, GL_DIFFUSE, mat_diffuse);
  glMaterialf(GL_FRONT, GL_SHININESS, mat_shininess);

  glEnable(GL_SMOOTH);     // enable smooth shading
  glEnable(GL_LIGHTING);   // enable lighting
  glEnable(GL_LIGHT0);     // enable light 0
}

void myInit() {
  /* Set color used when clearing the window to white */
  glClearColor(1.0, 1.0, 1.0, 1.0);

  /* Set up perspective projection */
  glMatrixMode(GL_PROJECTION);
  glLoadIdentity();
  gluPerspective(60.0f, 1.0f, 10.0f, -10.0f);

  /* Initialize the camera position */
  glMatrixMode(GL_MODELVIEW);
  glLoadIdentity();
  gluLookAt(eye[0], eye[1], eye[2], at[0], at[1], at[2], 0, 1, 0);

  /* Enable hidden--surface--removal */
  glEnable(GL_DEPTH_TEST);

  /* Set up the lights */
  EnableLighting();

  /* allocate quadrics with filled drawing style */
  InitQuadrics();
}

int main(int argc, char **argv) {
  srand(time(NULL));
  glutInit(&argc;, argv);
  glutInitDisplayMode(GLUT_DOUBLE | GLUT_RGB | GLUT_DEPTH);
  glutInitWindowSize(500, 500);
  glutCreateWindow("Hierarchical Robot");

  /* register callback functions */
  glutDisplayFunc(Display);
  glutKeyboardFunc(Keyboard);
  glutSpecialFunc(SpecialKey);
  glutMouseFunc(Mouse);
  glutMotionFunc(MouseMove);

  /* set window attributes */
  myInit();

  glutTimerFunc(10, Idle, dance);
  /* start event processing */
  glutMainLoop();
}

```



 [1]: http://www.csc.villanova.edu/~mdamian/Past/graphicsF10/code/robotSkeleton.cpp
 [2]: https://github.com/algui91/grado_informatica_ig_practicas/tree/master/P3


</windows.h>
