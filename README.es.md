<div align="center">

<p align="center"> <img src="assets/logo.png" alt="Broch Logo" width="200"> </p>

<h1 align="center">Broch</h1>

<p align="center">
    <img src="https://img.shields.io/github/last-commit/jaanque/broch/main" alt="GitHub last commit (branch)">
    <img src="https://img.shields.io/npm/v/broch" alt="NPM Version">
    <img src="https://img.shields.io/npm/unpacked-size/broch" alt="NPM Unpacked Size">
    <img src="https://img.shields.io/npm/l/broch" alt="NPM License">
    <img src="https://img.shields.io/npm/d18m/broch" alt="NPM Downloads">
</p>

<p align="center">
    <a href="README.md">English</a> |
    <a href="README.es.md">Español</a> |
    <a href="README.zh.md">中文</a> |
    <a href="README.ja.md">日本語</a>
</p>

<p align="center"> <strong>Visualiza la arquitectura de tu proyecto de una manera simple e interactiva.</strong> </p>

## 📑 Tabla de Contenidos
- [Características Principales](#-características-principales)
- [Instalación](#-instalación)
- [Comandos](#️-comandos)
    - [map](#map)
    - [preview](#preview)
    - [version](#version)
    - [help](#help)
- [Configuración](#-configuración)
- [Licencia](#-licencia)

Broch es una herramienta de línea de comandos (CLI) diseñada para analizar la estructura de tus proyectos y generar un mapa de dependencias interactivo. Con Broch, puedes obtener una vista clara y gráfica de cómo tus archivos están interconectados, facilitando la comprensión, mantenimiento y depuración de tu código.

## ✨ Características Principales
Análisis Automático de Dependencias: Detecta relaciones de import, require, include y más en archivos JavaScript, TypeScript, HTML, CSS y PHP.

Visualización Interactiva: Genera un mapa HTML dinámico utilizando vis-network que te permite explorar las conexiones de tu proyecto de manera intuitiva.

Alta Personalización: Configura colores, etiquetas y nombre del archivo de salida a través de un simple archivo **broch.config.json**.

Fácil de Usar: Con solo un par de comandos, puedes tener una vista completa de la arquitectura de tu proyecto.

## 🚀 Instalación
Para comenzar a usar Broch, asegúrate de tener Node.js (versión 12 o superior) instalado en tu sistema. Luego, instala el paquete globalmente a través de npm:

```bash
npm i -g broch
```

Al instalarlo globalmente, podrás ejecutar el comando broch desde cualquier directorio.

## ⚙️ Comandos
Broch es muy simple de usar. Aquí están los comandos disponibles.

```bash
broch map
```
Este es el corazón de Broch. Escanea un directorio (de tu elección) y genera el mapa de dependencias.

Alias:
```bash
broch m
```

**Ejemplos de Uso:**

Escanear directorio seleccionado: Simplemente ejecuta el comando en la raíz de tu proyecto, y broch te dará una lista de los directorios actuales, selecciona el que desees, y listo.

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

**colors:** Asigna un color a cada tipo de archivo según su extensión. ¡Siéntete libre de agregar o modificar tantos como quieras!

**labels:** Permite definir etiquetas personalizadas para la leyenda de colores en el mapa, haciendo la visualización aún más clara.

## 📄 Licencia
Este proyecto está bajo la Licencia **CC BY-NC-ND 4.0**. Ver [esta url](https://creativecommons.org/licenses/by-nc-nd/4.0/) para más detalles.

</div>