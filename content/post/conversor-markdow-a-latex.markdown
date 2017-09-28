---
author: alex
categories:
- dev
mainclass: dev
date: 2016-05-09 11:20:10
lastmod: 2017-09-28T20:10:33+01:00
description: "Hace tiempo, para la asignatura \u201CModelos de Computación\u201D  desarrollé un conversor de MarkDown a LaTeX usando flex. Básicamente con flex  se van reconociendo partes del documento MarkDown mediante expresiones regulares  y se traduce a su comando homólogo en LaTeX."
tags:
- c
title: Un Conversor De Markdown a LaTeX Casero en Lex
---

Hace tiempo, para la asignatura “Modelos de Computación” desarrollé un conversor de __MarkDown__  a __LaTeX__ usando __flex__, muy sencillo, pensado para facilitarme un poco la vida a la hora de escribir en el blog y pasar a LaTeX. Básicamente con __flex__ se van reconociendo partes del documento __MarkDown__ mediante expresiones regulares y se traduce a su comando homólogo en __LaTeX__.

Por supuesto, más tarde descubrí __pandoc__, y es el programa que uso para todo tipo de conversiones entre formatos :-).

<!--more--><!--ad-->

# Compilación

Para compilar el fichero simplemente es necesario el siguiente comando:

```bash
lex markdown2Latex.l && gcc -Wall lex.yy.c -o markdown2Latex -ll
```

# Uso

y para ejecutarlo basta con

```bash
./markdown2Latex fichero.md
```

# Código

El código está bastante bien comentado, podéis ir leyendo y comprendiendo el funcionamiento.

```c
				 /*----- Sección de Declaraciones --------------*/

%option case-insensitive
%option debug
%option verbose

%{
#include<stdio.h>
#include<string.h>

char *trimCharacter(char *str, char *c);
void fatal(char *message);
void *ec_malloc(unsigned int size);

int from_italic_text = 0; /* Para saber si venimos de una italic anidada en la bold*/
int from_bold_text = 0;
int first_run = 1;
%}

/* Primitives */
anyChar	.+
word	[A-z0-9]+

scstrong	"__"
scem	"_"
list	^"* "
list2	^"- "
link	"["
h1	^#{1}[ ]{1}{anyChar}
h2	^#{2}[ ]{1}{anyChar}
h3	^#{3,6}[ ]{1}{anyChar}
multilineCode	^[`]{3}[^`]*
inlinecode	`{1}[^`]*`{1}
ignoreParsedCode	"\\begin{bashcode}"

%x IN_MARKDOWN_LIST IN_MARKDOWN_LIST2
%x IN_MARKDOWN_LINK OPTIONAL_TEXT CLOSE_BRACKET
%x BOLD_TEXT_NESTED_ITALIC ITALIC_TEXT
%x BOLD_TEXT ITALIC_TEXT_NESTED_BOLD
%x IN_MULTILINE_CODE
%x PARSED_CODE

%%
				 /*----- Sección de Reglas ----------------*/

{list}	{BEGIN(IN_MARKDOWN_LIST);fprintf(yyout, "\\begin{itemize}\n");}
{list2}	{BEGIN(IN_MARKDOWN_LIST2);fprintf(yyout, "\\begin{itemize}\n");}

<IN_MARKDOWN_LIST>{
	^\n	fprintf(yyout, "\\end{itemize}\n\n");BEGIN(INITIAL); /* si volvemos a detectar línea vacia, hemos acabado el itemize, o no era nada y salimos */
	^"* "	/* Eliminar la sintáxis de itemize en markdown */
	[^"*"\n]+	fprintf(yyout, "\t\\item {%s}\n", yytext);	/* Éste es el texto que compone cada línea del itemize */
	\n	yylineno++;BEGIN(IN_MARKDOWN_LIST);	/* Si detectamos salto de línea, aumentar el número de línea, y seguimos comprobando dentro de IN_MARKDOWN_LIST buscando más items*/
}

<IN_MARKDOWN_LIST2>{
	^\n	fprintf(yyout, "\\end{itemize}\n\n");BEGIN(INITIAL); /* si volvemos a detectar línea vacia, hemos acabado el itemize, o no era nada y salimos */
	^"- "	/* Eliminar la sintáxis de itemize en markdown */
	[^\-\n]+	fprintf(yyout, "\t\\item {%s}\n", yytext);	/* Éste es el texto que compone cada línea del itemize */
	\n	yylineno++;BEGIN(IN_MARKDOWN_LIST2);	/* Si detectamos salto de línea, aumentar el número de línea, y seguimos comprobando dentro de IN_MARKDOWN_LIST buscando más items*/
}

{multilineCode}	{
	fprintf(yyout, "\\begin{bashcode}\n%s\n", trimCharacter(yytext, "`"));
	BEGIN(IN_MULTILINE_CODE);
}

<IN_MULTILINE_CODE>{
	`{3}|~{3}	fprintf(yyout, "\\end{bashcode}"); BEGIN(INITIAL); // End of code syntax
}

{inlinecode}	{
	fprintf(yyout, "\\bashinline/%s/", trimCharacter(yytext, "`")); // Maybe verbatim
}

{h1}	{
	fprintf(yyout, "\\section{%s}", trimCharacter(yytext, "#"));
}
{h2}	{
	fprintf(yyout, "\\subsection{%s}", trimCharacter(yytext, "#"));
}
{h3}	{
	fprintf(yyout, "\\subsubsection{%s}", trimCharacter(yytext, "#"));
}

{scstrong}	{	from_italic_text=0; BEGIN(BOLD_TEXT_NESTED_ITALIC); /* Comienzo de un strong __....*/}
<BOLD_TEXT_NESTED_ITALIC>{
	"__"	fprintf(yyout, "}");BEGIN(INITIAL); // Eat the end and exit
	"_"	BEGIN(ITALIC_TEXT); 	// Hay otro elemento anidado, un italic, pasamos a procesarlo
	[^_\n]*	{
		if (from_italic_text)
			fprintf(yyout, "%s", yytext); // Texto a continuación del italic
		else
			fprintf(yyout, "\\textbf{%s", yytext);
	}
	\n	BEGIN(INITIAL);
}
<ITALIC_TEXT>{
	[^_\n]* fprintf(yyout, "\\textit{%s", yytext);
	"_"	fprintf(yyout, "}"); BEGIN(BOLD_TEXT_NESTED_ITALIC); from_italic_text = 1; /* Llegado al último _, cerramos }, volvemos al stado BOLD_TEXT y ponemos from_italic_text a 1 para saber que estuvimos aquí, y no cerra antes de tiempo el \textbf*/
}

{scem}	{from_bold_text=0; BEGIN(ITALIC_TEXT_NESTED_BOLD); /* Comienzo de un strong __....*/}
<ITALIC_TEXT_NESTED_BOLD>{
	"_"	fprintf(yyout, "}"); BEGIN(INITIAL); // Eat the end and exit
	"__"	BEGIN(BOLD_TEXT); 	// Hay otro elemento anidado, un italic, pasamos a procesarlo
	[^_\n]*	{
		if (from_bold_text)
			fprintf(yyout, "%s", yytext); // Texto a continuación del italic
		else
			fprintf(yyout, "\\textit{%s", yytext);
	}
\n	BEGIN(INITIAL);
}
<BOLD_TEXT>{
	[^_\n]* fprintf(yyout, "\\textbf{%s", yytext);
	"__"	fprintf(yyout, "}"); BEGIN(ITALIC_TEXT_NESTED_BOLD); from_bold_text = 1; /* Llegado al último _, cerramos }, volvemos al stado BOLD_TEXT y ponemos from_italic_text a 1 para saber que estuvimos aquí, y no cerra antes de tiempo el \textbf*/
}

%{
// Variables for holding the values of the matched string
char *linkText = NULL;
char *linkUrl = NULL;
%}
{link}	{	// We begin processing a markdown link if it starts with [
	BEGIN(IN_MARKDOWN_LINK);
}
<IN_MARKDOWN_LINK>{ // Once here, we get rid of
	"["		// the open [
	[^\]]*	{	// Here we match the link text, and store it
		linkText = (char*) ec_malloc(yyleng+1);
		strcpy(linkText, yytext);
		BEGIN(CLOSE_BRACKET); // Move to the closing ]
	}
}
<CLOSE_BRACKET>{
	"]"|"("|")"	// Ignore this chars.
	[^(")]*	{	// Here we store the link url
		linkUrl = (char*) ec_malloc(yyleng+1);
		strcpy(linkUrl, yytext);
		BEGIN(OPTIONAL_TEXT);
	}
}

<OPTIONAL_TEXT>{
	\"[^\")]+\"	// Ignore alt text "text"
	")"	{	// In latex, we have nothing to do with the tittle attribute of the link, so we ignore it. Ignore things like "alt text")
		fprintf(yyout, "\\href{%s}{%s}", linkUrl, linkText);
		free(linkText);
		free(linkUrl);
		BEGIN(INITIAL); // Ignore optional text
	}
}

%{
	// Ignore anything that can be matched in a block of text that is supposed to
	// be like it was originaly written, similar to a pre HTML tag.
%}
{ignoreParsedCode}	{ECHO; BEGIN(PARSED_CODE);}
<PARSED_CODE>{
	"\\end{bashcode}"	ECHO; BEGIN(INITIAL);
	.*	ECHO;
}

.|\n			{ECHO;}

%%
				/*----- Sección de Procedimientos --------*/

/**
 * Thanks to http://stackoverflow.com/a/122721/1612432
 * //fprintf(yyout, "\\textbf{%s}", trimCharacter(yytext, "_*"));
 **/
char *trimCharacter(char *str, char *c)
{
	char *end;

  // Trim leading characters
	while(strncmp(str, c, 1) == 0){
		str++;
	}

  if(*str == 0)  // All spaces?
    return str;

  // Trim trailing character
	end = str + strlen(str) - 1;
	while(end > str && (strncmp(end, c, 1) == 0)){
		end--;
	}

  // Write new null terminator
  *(end+1) = 0;

  return str;
}

// An error checked malloc() wrapper function (From the book Hacking, the art of exploitation)
void *ec_malloc(unsigned int size) {
   void *ptr;
   ptr = malloc(size);
   if(ptr == NULL)
      fatal("in ec_malloc() on memory allocation");
   return ptr;
}

// A function to display an error message and then exit (From the book Hacking, the art of exploitation)
void fatal(char *message) {
   char error_message[100];

   strcpy(error_message, "[!!] Fatal Error ");
   strncat(error_message, message, 83);
   perror(error_message);
   exit(-1);
}

int yywrap(){
	if (first_run == 1){
		first_run++;

		fclose(yyout);
		fclose(yyin);
		yyin = fopen ("/tmp/out", "rt");
		yyout = fopen("salida", "wt");

		if (yyin == NULL) {
			printf ("El fichero no se puede abrir\n");
			exit (-1);
		}
		if (yyout == NULL) {
			printf ("El fichero no se puede abrir\n");
			exit (-1);
		}
		BEGIN(INITIAL);
		return 0;
	} else {
		return 1;
	}
}

int main (int argc, char *argv[]) {
	if (argc == 2) {
		yyin = fopen (argv[1], "rt");
		if (yyin == NULL) {
			printf ("El fichero %s no se puede abrir\n", argv[1]);
			exit (-1);
		}
	} else
		yyin = stdin;

	yyout = fopen("/tmp/out", "wt");

	if (yyout == NULL) {
		printf ("El fichero %s no se puede abrir\n", argv[1]);
		exit (-1);
	}

	yylex ();

	return 0;
}
```


# Referencias

- Repositorio en GitHub \| [Markdown2LatexConversor](https://github.com/elbaulp/Markdown2LatexConversor "Markdown2LatexConversor")
