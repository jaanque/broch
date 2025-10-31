<div align="center">

<p align="center"> <img src="assets/logo.png" alt="Logo de Broch" width="200"> </p>

<h1 align="center">Broch</h1>

<p align="center">
    <img src="https://img.shields.io/github/last-commit/jaanque/broch/main" alt="Último commit en GitHub (rama)">
    <img src="https://img.shields.io/npm/v/broch" alt="Versión NPM">
    <img src="https://img.shields.io/npm/unpacked-size/broch" alt="Tamaño sin comprimir NPM">
    <img src="https://img.shields.io/npm/l/broch" alt="Licencia NPM">
    <img src="https://img.shields.io/npm/d18m/broch" alt="Descargas NPM">
</p>

<p align="center">
    <a href="README.md">English</a> |
    <a href="README.es.md">Español</a> |
    <a href="README.zh.md">中文</a> |
    <a href="README.ja.md">日本語</a>
</p>

<p align="center"> <strong>Visualiza la arquitectura de tu proyecto de forma simple e interactiva.</strong> </p>

## 📑 Índice
- [Características Principales](#-características-principales)
- [Instalación](#-instalación)
- [Comandos](#️-comandos)
    - [map](#map)
    - [preview](#preview)
    - [version](#version)
    - [help](#help)
- [Configuración](#-configuración)
- [Licencia](#-licencia)
- [Contribuir a Broch](#-contribuir-a-broch)
- [Código de Conducta](#-código-de-conducta)
- [Comandos Rápidos](#-comandos-rápidos)
- [Enlaces del Pie](#-enlaces-del-pie)

Broch es una herramienta de línea de comandos (CLI) diseñada para analizar la estructura de tu proyecto y generar un mapa interactivo de dependencias. Con Broch, puedes obtener una vista clara y gráfica de cómo tus archivos están interconectados, facilitando la comprensión, mantenimiento y depuración de tu código.

## ✨ Características Principales
Análisis Automático de Dependencias: Detecta relaciones de import, require, include y más en archivos JavaScript, TypeScript, HTML, CSS y PHP.

Visualización Interactiva: Genera un mapa HTML dinámico usando vis-network que te permite explorar las conexiones de tu proyecto de manera intuitiva.

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

Escanear directorio seleccionado: Simplemente ejecuta el comando en la raíz de tu proyecto, y broch te dará una lista de los directorios actuales, selecciona el que desees y listo.

![Vista previa del mapa de dependencias](assets/demo.PNG)

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

```json
{
    "outputFileName": "brochMap.html",
    "colors": {
        "html": "#E44D26",
        "css": "#1572B6",
        "js": "#F7DF1E",
        "php": "#777BB4",
        "image": "#4CAF50",
        "rust": "#DE3423",
        "json": "#000000",
        "yml": "#cb171e",
        "md": "#000000",
        "py": "#3776AB",
        "java": "#b07219",
        "other": "#CCCCCC"
    },
    "labels": {
        "js": "JS/TS",
        "yml": "YML",
        "md": "Markdown",
        "py": "Python",
        "java": "Java"
    }
}
```

##

La primera vez que ejecutes Broch, se creará automáticamente un archivo broch.config.json en tu directorio. Este archivo te permite personalizar la herramienta según tus preferencias.

**outputFileName:** Define el nombre del archivo HTML que se generará.

**colors:** Asigna un color a cada tipo de archivo según su extensión. ¡Siéntete libre de agregar o modificar tantos como quieras!

**labels:** Permite definir etiquetas personalizadas para la leyenda de colores en el mapa, haciendo la visualización aún más clara.

## 📄 Licencia MIT
Copyright © 2025 Jan Queralt

Por la presente se concede permiso, libre de cargos, a cualquier persona que obtenga una copia
de este software y de los archivos de documentación asociados (el "Software"), para utilizar
el Software sin restricción, incluyendo sin limitación los derechos a usar, copiar, modificar,
fusionar, publicar, distribuir, sublicenciar, y/o vender copias del Software, y a permitir a
las personas a las que se les proporcione el Software a hacer lo mismo, sujeto a las siguientes
condiciones:

El aviso de copyright anterior y este aviso de permiso se incluirán en todas las copias o
partes sustanciales del Software.

EL SOFTWARE SE PROPORCIONA "TAL CUAL", SIN GARANTÍA DE NINGÚN TIPO, EXPRESA O IMPLÍCITA,
INCLUYENDO PERO NO LIMITADO A GARANTÍAS DE COMERCIALIZACIÓN, IDONEIDAD PARA UN PROPÓSITO
PARTICULAR Y NO INFRACCIÓN. EN NINGÚN CASO LOS AUTORES O TITULARES DEL COPYRIGHT SERÁN
RESPONSABLES DE NINGUNA RECLAMACIÓN, DAÑOS U OTRAS RESPONSABILIDADES, YA SEA EN UNA ACCIÓN
DE CONTRATO, AGRAVIO O CUALQUIER OTRO MOTIVO, QUE SURJA DE O EN CONEXIÓN CON EL SOFTWARE
O EL USO U OTRO TIPO DE ACCIONES EN EL SOFTWARE.

# 🤝 Contribuir a Broch

En primer lugar, ¡gracias por considerar contribuir a Broch! Tu ayuda es esencial para mantenerlo genial.

Las contribuciones son lo que hace que la comunidad de código abierto sea un lugar increíble para aprender, inspirar y crear. Cualquier contribución que hagas será **muy apreciada 💕**.

Damos la bienvenida a contribuciones de todo tipo, incluyendo reportes de errores, solicitudes de funciones, mejoras en la documentación y mejoras de código.

## Formas de Contribuir

### Reportar Errores o Sugerir Funciones
Antes de crear una nueva contribución, por favor revisa la [página de Issues](https://github.com/jaanque/broch/issues) para ver si ya existe una similar.

-   **Para reportar un error:** Por favor abre un issue y proporciona todos los detalles posibles, incluyendo los pasos para reproducirlo, el resultado esperado y el resultado actual. ¡Cuanta más información, mejor!
-   **Para sugerir una función:** Abre un issue y describe tu idea, explicando por qué crees que sería una valiosa adición a Broch.

### Enviar un Pull Request (PR)
Si quieres contribuir con código, por favor sigue estos pasos:

1.  **Haz Fork del Repositorio**
        Haz clic en el botón "Fork" en la parte superior derecha de esta página para crear tu propia copia del repositorio.

2.  **Clona tu Fork**
        Clona el repositorio a tu máquina local:
        ```bash
        git clone 
        https://github.com/TU_USUARIO/broch.git
        ```
        ```bash
        cd broch
        ```

3.  **Configura tu Entorno**
        Instala las dependencias del proyecto y enlaza tu copia local para hacer que el comando `broch` esté disponible globalmente para pruebas.
        ```bash
        # Instalar dependencias
        npm install

        # Enlazar el paquete para usar el comando 'broch' localmente
        npm link
        ```
        y si npm link no funciona prueba

        ```bash
        npm link broch
        ```

        El comando `npm link` es crucial ya que te permite ejecutar y probar tu versión local de Broch desde cualquier directorio en tu sistema.

4.  **Crea una Nueva Rama**
        Crea una rama descriptiva para tus cambios. Es una buena práctica nombrarla basándote en la función o corrección en la que estás trabajando.
        ```bash
        # Ejemplo para una nueva función
        git checkout -b feature/agregar-nuevo-parser

        # Ejemplo para una corrección de error
        git checkout -b fix/resolver-problema-renderizado
        ```

5.  **Realiza tus Cambios**
        Escribe tu código, corrige el error o mejora la documentación. Asegúrate de que tus cambios sean limpios y sigan el estilo de código existente.

6.  **Haz Commit de tus Cambios**
        Haz commit de tus cambios con un mensaje claro y conciso, siguiendo los estándares de commits convencionales si es posible.
        ```bash
        git commit -m "feat: Agregar soporte para archivos de configuración YAML"
        ```

7.  **Push a tu Fork**
        Sube tus cambios a tu repositorio fork.
        ```bash
        git push origin feature/agregar-nuevo-parser
        ```

8.  **Abre un Pull Request**
        Ve al repositorio original de Broch y abre un nuevo Pull Request. Proporciona un título claro y una descripción detallada de los cambios que has realizado, enlazando cualquier issue relevante.

## Código de Conducta
Para asegurar que nuestra comunidad sea acogedora y respetuosa, por favor lee y sigue nuestro [Código de Conducta](CODE_OF_CONDUCT.md). Al participar en este proyecto, aceptas cumplir con sus términos.

¡Gracias nuevamente por tu interés en contribuir a Broch!

<footer align="center">
<hr>

<p>
<a href="README.md">English</a> ·
<a href="README.es.md">Español</a> ·
<a href="README.zh.md">中文</a> ·
<a href="README.ja.md">日本語</a>
</p>

<p>
<a href="#-características-principales">Características</a> ·
<a href="#-instalación">Instalación</a> ·
<a href="#️-comandos">Comandos</a> ·
<a href="#-configuración">Configuración</a> ·
<a href="#-licencia">Licencia</a> ·
<a href="#-contribuir-a-broch">Contribución</a> ·
<a href="CODE_OF_CONDUCT.md">Código de Conducta</a> ·
<a href="https://github.com/jaanque/broch">Repositorio</a> ·
<a href="https://github.com/jaanque/broch/issues">Issues</a> ·
<a href="https://www.npmjs.com/package/broch">NPM</a>
</p>

<p>
<strong>Comandos rápidos:</strong>
<code>broch map</code> · <code>broch preview</code> · <code>broch version</code> · <code>broch help</code>
</p>

<p>
<small>© 2025 Jan Queralt · Licencia MIT · Para contribuir o reportar problemas, abre un Issue en el repositorio.</small>
</p>
</footer>

</div>
