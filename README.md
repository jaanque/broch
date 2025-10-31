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

<p align="center"> <strong>Visualize your project's architecture in a simple and interactive way.</strong> </p>

## 📑 Table of Contents
- [Main Features](#-main-features)
- [Installation](#-installation)
- [Commands](#️-commands)
  - [map](#map)
  - [preview](#preview)
  - [version](#version)
  - [help](#help)
- [Configuration](#-configuration)
- [License](#-license)

Broch is a command-line interface (CLI) tool designed to analyze your projects' structure and generate an interactive dependency map. With Broch, you can get a clear and graphical view of how your files are interconnected, making it easier to understand, maintain, and debug your code.

## ✨ Main Features
Automatic Dependency Analysis: Detects import, require, include, and more relationships in JavaScript, TypeScript, HTML, CSS, and PHP files.

Interactive Visualization: Generates a dynamic HTML map using vis-network that allows you to explore your project's connections intuitively.

High Customization: Configure colors, labels, and output filename through a simple **broch.config.json** file.

Easy to Use: With just a couple of commands, you can have a complete view of your project's architecture.

## 🚀 Installation
To start using Broch, make sure you have Node.js (version 12 or higher) installed on your system. Then, install the package globally through npm:

```bash
npm i -g broch
```

By installing it globally, you'll be able to run the broch command from any directory.

## ⚙️ Commands
Broch is very simple to use. Here are the available commands.

```bash
broch map
```
This is the heart of Broch. It scans a directory (of your choice) and generates the dependency map.

Alias:
```bash
broch m
```

**Usage Examples:**

Scan selected directory: Simply run the command in your project's root, and broch will give you a list of current directories, select the one you want, and you're done.

##

```bash
broch preview
```
Once you've generated the map, this command will allow you to open it directly in your browser.

Alias:
```bash
broch p
```

Usage Example:

This command will look for the brochMap.html file (or the name you've configured) and open it.

##

```bash
broch version
```

Shows the version of Broch you have installed.

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
Shows a summary of available commands and options.

Alias:
```bash
broch h
```

## 🔧 Configuration (broch.config.json)
The first time you run Broch, a broch.config.json file will be automatically created in your directory. This file allows you to customize the tool according to your preferences.

**outputFileName:** Define the name of the HTML file that will be generated.

**colors:** Assign a color to each file type according to its extension. Feel free to add or modify as many as you want!

**labels:** Allows you to define custom labels for the color legend in the map, making visualization even clearer.

## 📄 License
This project is under the **CC BY-NC-ND 4.0** License. See [this url](https://creativecommons.org/licenses/by-nc-nd/4.0/) for more details.

</div>