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

<p align="center"> <strong>以简单和交互式的方式可视化您的项目架构。</strong> </p>

## 📑 目录
- [主要特性](#-主要特性)
- [安装](#-安装)
- [命令](#️-命令)
    - [map](#map)
    - [preview](#preview)
    - [version](#version)
    - [help](#help)
- [配置](#-配置)
- [许可证](#-许可证)

Broch 是一个命令行界面 (CLI) 工具，设计用于分析项目结构并生成交互式依赖关系图。通过 Broch，您可以清晰地查看文件之间的互连关系，使代码更容易理解、维护和调试。

## ✨ 主要特性
自动依赖分析：检测 JavaScript、TypeScript、HTML、CSS 和 PHP 文件中的 import、require、include 等关系。

交互式可视化：使用 vis-network 生成动态 HTML 图，让您能够直观地探索项目的连接关系。

高度定制：通过简单的 **broch.config.json** 文件配置颜色、标签和输出文件名。

易于使用：只需几个命令，即可完整查看项目架构。

## 🚀 安装
要开始使用 Broch，请确保您的系统已安装 Node.js（12 版本或更高）。然后，通过 npm 全局安装软件包：

```bash
npm i -g broch
```

全局安装后，您可以在任何目录中运行 broch 命令。

## ⚙️ 命令
Broch 非常简单易用。以下是可用的命令。

```bash
broch map
```
这是 Broch 的核心。它会扫描（您选择的）目录并生成依赖关系图。

别名：
```bash
broch m
```

**使用示例：**

扫描选定目录：只需在项目根目录运行命令，broch 会为您列出当前目录列表，选择您想要的目录即可。

##

```bash
broch preview
```
生成地图后，此命令将允许您直接在浏览器中打开它。

别名：
```bash
broch p
```

使用示例：

此命令将查找 brochMap.html 文件（或您配置的名称）并打开它。

##

```bash
broch version
```

显示您已安装的 Broch 版本。

别名：
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
显示可用命令和选项的摘要。

别名：
```bash
broch h
```

## 🔧 配置 (broch.config.json)
第一次运行 Broch 时，会在您的目录中自动创建一个 broch.config.json 文件。此文件允许您根据偏好自定义工具。

**outputFileName:** 定义将生成的 HTML 文件的名称。

**colors:** 根据扩展名为每种文件类型分配颜色。您可以随意添加或修改！

**labels:** 允许您为地图中的颜色图例定义自定义标签，使可视化更清晰。

## 📄 许可证
本项目采用 **CC BY-NC-ND 4.0** 许可证。有关详细信息，请参阅[此链接](https://creativecommons.org/licenses/by-nc-nd/4.0/)。

</div>
