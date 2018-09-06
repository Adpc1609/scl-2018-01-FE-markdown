# MARKDOWM LINKS LIBRARY

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
ligero muy popular entre developers. Es usado en muchísimas plataformas que
manejan texto plano (GitHub, foros, blogs, ...), y es muy común
encontrar varios archivos en ese formato en cualquier tipo de repositorio
(empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.

Dentro de una comunidad de código abierto, nos han propuesto crear una
herramienta usando [Node.js](https://nodejs.org/), que lea y analice archivos
en formato `Markdown`, para verificar los links que contengan y reportar
algunas estadísticas.

## Descripcion general de la libreria :checkered_flag:

Es una libreria creada con NodeJS, la cual recibe la ruta de un archivo. Se extraen los links de este archivo se indican la linea en donde esta la url, el texto y el link. Ademas a traves de una linea de comandos como --validate te comprueba el status de esta url, stats el numero de links tengas uns status 200.

# Instrucciones de instalación.

## Pre-requisitos :ballot_box_with_check:

Debe instalarse previamente de forma global -g las librerias utilizadas para este proyecto 

```
$npm install marked -g
$npm install node-fetch -g
$npm install yargs -g
$npm install colors -g

```
## Instalacion 

Para instalar esta libreria se debe ejecutar la siguiente Linea de Intrucciones 

```
$npm install adpc1609/md-links 
``` 
Luego se debe ejecutar el comando 

```
$md-links <Nombre-de-tu-archivo.md>
```
para comprobar el estado de la url  de los links de tu archivo se debe ejecutar el siguiente comando 

```
$md-links <Nombre-de-tu-archivo.md> --validate
```
puedes visualizar la cantidad de links que resultaron con un status de conexion OK, con el siguiente comando

```
$md-links <Nombre-de-tu-archivo.md> --stats
```

## Versiones de la librería :construction:

Esta libreria esta en su version 1.0.0 

## Documentación de la Librería :book:

**Leer Archivo con Readfile de NodeJS**  
https://stackoverflow.com/questions/10058814/get-data-from-fs-readfile

**Utilidad de lineas de Comando con NodeJS**  
http://code.ezakto.com/node/crear-utilidad-linea-comandos-todo-list.html

_process.cwd()_ lo utilizamos para devolver la ruta completa hacia el directorio en el cual el script está siendo ejecutado.

**Ruta relativa y Absoluta**

https://www.coffeecup.com/help/articles/absolute-vs-relative-pathslinks/


**Libreria Yargs/para la configuracion de los Argumentos**

http://blog.lungosoft.com/yargs-en-node-pasar-parmetros-en-aplicaciones-javascript-desde-consola  

Yargs es un módulo útil para crear scripts que puedan ser adaptables de acuerdo a las necesidades de un usuario, nos ayuda a gestionar los parámetros de una manera fácil y sencilla.

 
**Promesas**

https://www.todojs.com/api-fetch-el-nuevo-estandar-que-permite-hacer-llamadas-http/ Utilizamos esta informacion para hacer las peticiones de los links extraidos de un _archivo.md_ y resolver el status.

## Autores

Proyecto para Laboratoria -_Bootcamp SCL-2018_

creado por **ADRIANA PEREZ** 
Estudiante Front-end Developer

## Licencia

ISC







