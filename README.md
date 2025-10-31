<p align="center"> <img src="assets/logo.png" alt="Broch Logo" width="200"> </p>

<h1 align="center">Broch</h1>

<p align="center"> <strong>Visualiza la arquitectura de tu proyecto de forma sencilla e interactiva.</strong> </p>

<p align="center"> <a href=""> <img src="" alt="NPM Version"> </a> <a href=""> <img src="" alt="License"> </a> </p>

Broch es una herramienta de línea de comandos (CLI) diseñada para analizar la estructura de tus proyectos y generar un mapa de dependencias interactivo. Con Broch, puedes obtener una visión clara y gráfica de cómo están interconectados tus archivos, facilitando la comprensión, el mantenimiento y la depuración de tu código.

## ✨ Características Principales
Análisis Automático de Dependencias: Detecta las relaciones import, require, include y más en archivos JavaScript, TypeScript, HTML, CSS y PHP.

Visualización Interactiva: Genera un mapa HTML dinámico utilizando vis-network que te permite explorar las conexiones de tu proyecto de forma intuitiva.

Alta Personalización: Configura los colores, las etiquetas y el nombre del archivo de salida a través de un simple **archivo broch.config.json**.

Fácil de Usar: Con solo un par de comandos, puedes tener una visión completa de la arquitectura de tu proyecto.

## 🚀 Instalación
Para empezar a usar Broch, asegúrate de tener Node.js (versión 12 o superior) instalado en tu sistema. Luego, instala el paquete globalmente a través de npm:

```bash
npm i -g broch
```

Al instalarlo de forma global, podrás ejecutar el comando broch desde cualquier directorio.

## ⚙️ Comandos
Broch es muy sencillo de utilizar. A continuación, se detallan los comandos disponibles.

```bash
broch map
```
Este es el corazón de Broch. Escanea un directorio (a escoger) y genera el mapa de dependencias.

Alias:
```bash
broch m
```

**Ejemplos de Uso:**

Escanear el directorio seleccionado: Simplemente ejecuta el comando en la raíz de tu proyecto y broch te dara una lista de los directorios actuales, selecciona el que quieras y listo.

##

```bash
broch preview
```
Una vez que hayas generado el mapa, este comando te permitirá abrirlo directamente en tu navegador.

Alias:
```bash
broch p
```

Ejemplo de Uso:

Este comando buscará el archivo brochMap.html (o el nombre que hayas configurado) y lo abrirá.

##

```bash
broch version
```

Muestra la versión de Broch que tienes instalada.

Alias:

```bash
broch v
```

##

```bash
broch
```
```bash
broch help
```
Muestra un resumen de los comandos y opciones disponibles.

Alias:
```bash
broch h
```

## 🔧 Configuración (broch.config.json)
La primera vez que ejecutes Broch, se creará automáticamente un archivo broch.config.json en tu directorio. Este archivo te permite personalizar la herramienta según tus preferencias.

**outputFileName:** Define el nombre del archivo HTML que se generará.

**colors:** Asigna un color a cada tipo de archivo según su extensión. ¡Siéntete libre de añadir o modificar los que quieras!

**labels:** Permite definir etiquetas personalizadas para la leyenda de colores en el mapa, haciendo la visualización aún más clara.

## 📄 Licencia
Este proyecto está bajo la Licencia ISC. Consulta el archivo LICENSE para más detalles.