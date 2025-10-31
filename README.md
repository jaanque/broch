<div align="center">
  <pre>
<b>
██████╗  ██████╗  ██████╗  ██████╗ ██╗  ██╗
██╔══██╗██╔═══██╗██╔═══██╗██╔════╝ ██║  ██║
██████╔╝██║   ██║██║   ██║██║  ███╗███████║
██╔══██╗██║   ██║██║   ██║██║   ██║██╔══██║
██████╔╝╚██████╔╝╚██████╔╝╚██████╔╝██║  ██║
╚═════╝  ╚═════╝  ╚═════╝  ╚═════╝ ╚═╝  ╚═╝
</b>
  </pre>
</div>

<h1 align="center">Broch</h1>

<p align="center">
  Una herramienta CLI para visualizar las dependencias de tu proyecto y generar un mapa interactivo.
</p>

---

## 📜 Índice

1.  [Instalación](#instalación)
2.  [Uso Básico](#uso-básico)
3.  [Comandos](#comandos)
    -   [`map`](#comando-map)
    -   [`preview`](#comando-preview)
    -   [`version`](#comando-version)
4.  [Configuración](#configuración)
5.  [Licencia](#licencia)

---

## 🚀 Instalación

Para utilizar Broch, instálalo globalmente a través de npm. Esto te permitirá ejecutar el comando `broch` desde cualquier directorio en tu sistema.

```bash
npm install -g broch
```

Asegúrate de tener [Node.js](https://nodejs.org/) (versión 12 o superior) instalado en tu sistema.

---

## 💡 Uso Básico

El comando principal de Broch es `map`, que escanea un directorio y genera un mapa de dependencias interactivo en formato HTML.

Para escanear el directorio actual:

```bash
broch map
```

Si no especificas un directorio, Broch te pedirá que selecciones uno de la lista de directorios en tu ubicación actual.

Para escanear un directorio específico:

```bash
broch map ./ruta/al/directorio
```

---

## ⚙️ Comandos

A continuación se detallan todos los comandos disponibles en Broch.

### Comando: `map`

Genera el mapa de dependencias de un directorio.

-   **Alias:** `m`
-   **Argumento:** `[directory]` (opcional) - La ruta al directorio que deseas escanear. Si no se proporciona, se mostrará un menú interactivo.

**Ejemplos:**

-   Escanear el directorio actual:
    ```bash
    broch map
    ```
-   Escanear un subdirectorio llamado `src`:
    ```bash
    broch map src
    ```
-   Excluir archivos o directorios específicos (patrones separados por comas):
    ```bash
    broch map . --exclude "dist/**,**/*.test.ts"
    ```

### Comando: `preview`

Abre el archivo HTML generado en tu navegador web predeterminado.

-   **Alias:** `p`

**Ejemplo:**

```bash
broch preview
```

Este comando buscará el archivo `brochMap.html` en el directorio actual y lo abrirá.

### Comando: `version`

Muestra la versión de Broch que tienes instalada.

-   **Alias:** `v`

**Ejemplo:**

```bash
broch version
```

---

## 🔧 Configuración

La primera vez que ejecutes Broch, se creará un archivo `broch.config.json` en tu directorio actual. Puedes personalizar este archivo para ajustar el comportamiento de Broch.

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

-   `outputFileName`: El nombre del archivo HTML que se generará.
-   `colors`: Un objeto que asigna colores a diferentes tipos de archivos por su extensión. Puedes añadir o modificar los colores aquí.
-   `labels`: Un objeto que te permite definir etiquetas personalizadas para las leyendas de colores en el mapa.

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.
