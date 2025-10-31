<div align="center">

<p align="center"> <img src="assets/logo.png" alt="Broch Logo" width="200"> </p>

<h1 align="center">Broch</h1>

<p align="center">
    <img src="https://img.shields.io/github/last-commit/jaanque/broch/main" alt="GitHub最后提交">
    <img src="https://img.shields.io/npm/v/broch" alt="NPM版本">
    <img src="https://img.shields.io/npm/unpacked-size/broch" alt="NPM包大小">
    <img src="https://img.shields.io/npm/l/broch" alt="NPM许可证">
    <img src="https://img.shields.io/npm/dm/broch" alt="NPM下载量">
</p>

<p align="center">
    <a href="README.md">English</a> |
    <a href="README.es.md">Español</a> |
    <a href="README.zh.md">中文</a> |
    <a href="README.ja.md">日本語</a>
</p>

<p align="center"> <strong>以简单且交互式的方式可视化您的项目架构。</strong> </p>

## 📑 目录
- [主要特点](#-主要特点)
- [安装](#-安装)
- [命令](#️-命令)
    - [map](#map)
    - [preview](#preview)
    - [version](#version)
    - [help](#help)
- [配置](#-配置)
- [许可证](#-许可证)
- [贡献指南](#-贡献指南)
- [行为准则](#-行为准则)
- [快速命令](#-快速命令)
- [底部链接](#-底部链接)

Broch是一个命令行界面(CLI)工具，用于分析项目结构并生成交互式依赖关系图。通过Broch，您可以清晰地查看文件之间的相互关联，从而更容易理解、维护和调试代码。

## ✨ 主要特点
自动依赖分析：检测JavaScript、TypeScript、HTML、CSS和PHP文件中的import、require、include等关系。

交互式可视化：使用vis-network生成动态HTML图，让您能够直观地探索项目的连接关系。

高度自定义：通过简单的**broch.config.json**文件配置颜色、标签和输出文件名。

易于使用：只需几个命令，即可完整查看项目架构。

## 🚀 安装
要开始使用Broch，请确保您的系统已安装Node.js（12版本或更高）。然后，通过npm全局安装包：

```bash
npm i -g broch
```

全局安装后，您可以在任何目录下运行broch命令。

## ⚙️ 命令
Broch使用非常简单。以下是可用命令。

```bash
broch map
```
这是Broch的核心。它扫描（您选择的）目录并生成依赖关系图。

别名：
```bash
broch m
```

**使用示例：**

扫描选定目录：只需在项目根目录运行命令，broch将为您列出当前目录列表，选择您想要的目录即可。

![依赖关系图预览](assets/demo.PNG)

##

```bash
broch preview
```
生成图后，此命令将允许您直接在浏览器中打开它。

别名：
```bash
broch p
```

使用示例：

此命令将查找brochMap.html文件（或您配置的名称）并打开它。

##

```bash
broch version
```

显示您已安装的Broch版本。

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

首次运行Broch时，将在您的目录中自动创建broch.config.json文件。此文件允许您根据偏好自定义工具。

**outputFileName：** 定义将生成的HTML文件的名称。

**colors：** 根据扩展名为每种文件类型分配颜色。随意添加或修改！

**labels：** 允许您为图中的颜色图例定义自定义标签，使可视化更加清晰。

## 📄 MIT许可证
版权所有 © 2025 Jan Queralt

特此免费授予任何获得本软件副本和相关文档文件（"软件"）的人不受限制地处理本软件的权利，
包括但不限于使用、复制、修改、合并、发布、分发、再许可和/或出售软件副本的权利，
以及允许获得软件的人这样做，但须符合以下条件：

上述版权声明和本许可声明应包含在软件的所有副本或主要部分中。

软件按"原样"提供，不提供任何形式的明示或暗示的保证，包括但不限于对适销性、
特定用途适用性和非侵权性的保证。在任何情况下，作者或版权持有人均不对任何索赔、
损害或其他责任负责，无论是在合同诉讼、侵权行为还是其他方面，由软件或软件的
使用或其他交易引起、产生或与之相关。

# 🤝 贡献指南

首先，感谢您考虑为Broch做出贡献！您的帮助对保持其优秀至关重要。

贡献是开源社区成为如此令人惊叹的学习、激励和创造之地的原因。我们非常感谢任何形式的贡献 💕。

我们欢迎各种形式的贡献，包括错误报告、功能请求、文档改进和代码增强。

## 贡献方式

### 报告错误或建议功能
在创建新的贡献之前，请检查[问题页面](https://github.com/jaanque/broch/issues)，看看是否已存在类似的问题。

- **报告错误：** 请打开一个问题并提供尽可能多的细节，包括复现步骤、预期结果和实际结果。信息越多越好！
- **建议功能：** 打开一个问题并描述您的想法，解释为什么您认为这对Broch来说是一个有价值的补充。

### 提交拉取请求（PR）
如果您想通过代码做出贡献，请遵循以下步骤：

1. **复刻仓库**
        点击此页面右上角的"Fork"按钮，创建仓库的个人副本。

2. **克隆您的复刻**
        将仓库克隆到您的本地机器：
        ```bash
        git clone https://github.com/YOUR_USERNAME/broch.git
        ```
        ```bash
        cd broch
        ```

3. **设置环境**
        安装项目依赖并链接您的本地副本，使`broch`命令全局可用于测试。
        ```bash
        # 安装依赖
        npm install

        # 链接包以在本地使用'broch'命令
        npm link
        ```
        如果npm link不起作用，请尝试

        ```bash
        npm link broch
        ```

        `npm link`命令至关重要，因为它允许您从系统的任何目录运行和测试Broch的本地版本。

4. **创建新分支**
        为您的更改创建一个描述性分支。最好根据您正在处理的功能或修复来命名它。
        ```bash
        # 新功能示例
        git checkout -b feature/add-new-parser

        # 错误修复示例
        git checkout -b fix/resolve-rendering-issue
        ```

5. **进行更改**
        编写代码、修复错误或改进文档。确保您的更改整洁并遵循现有的代码风格。

6. **提交更改**
        使用清晰简洁的消息提交更改，如果可能的话，遵循约定式提交标准。
        ```bash
        git commit -m "feat: 添加YAML配置文件支持"
        ```

7. **推送到您的复刻**
        将更改推送到您的复刻仓库。
        ```bash
        git push origin feature/add-new-parser
        ```

8. **打开拉取请求**
        转到原始Broch仓库并打开新的拉取请求。提供清晰的标题和您所做更改的详细说明，链接到任何相关问题。

## 行为准则
为确保我们的社区友好和尊重，请阅读并遵循我们的[行为准则](CODE_OF_CONDUCT.md)。参与此项目即表示您同意遵守其条款。

再次感谢您有兴趣为Broch做出贡献！

<footer align="center">
<hr>

<p>
<a href="README.md">English</a> ·
<a href="README.es.md">Español</a> ·
<a href="README.zh.md">中文</a> ·
<a href="README.ja.md">日本語</a>
</p>

<p>
<a href="#-主要特点">特点</a> ·
<a href="#-安装">安装</a> ·
<a href="#️-命令">命令</a> ·
<a href="#-配置">配置</a> ·
<a href="#-许可证">许可证</a> ·
<a href="#-贡献指南">贡献</a> ·
<a href="CODE_OF_CONDUCT.md">行为准则</a> ·
<a href="https://github.com/jaanque/broch">仓库</a> ·
<a href="https://github.com/jaanque/broch/issues">问题</a> ·
<a href="https://www.npmjs.com/package/broch">NPM</a>
</p>

<p>
<strong>快速命令：</strong>
<code>broch map</code> · <code>broch preview</code> · <code>broch version</code> · <code>broch help</code>
</p>

<p>
<small>© 2025 Jan Queralt · MIT许可证 · 要贡献或报告问题，请在仓库中打开问题。</small>
</p>
</footer>

</div>
