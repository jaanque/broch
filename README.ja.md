<div align="center">

<p align="center"> <img src="assets/logo.png" alt="Broch ロゴ" width="200"> </p>

<h1 align="center">Broch</h1>

<p align="center">
    <img src="https://img.shields.io/github/last-commit/jaanque/broch/main" alt="GitHub 最終コミット (ブランチ)">
    <img src="https://img.shields.io/npm/v/broch" alt="NPM バージョン">
    <img src="https://img.shields.io/npm/unpacked-size/broch" alt="NPM 展開サイズ">
    <img src="https://img.shields.io/npm/l/broch" alt="NPM ライセンス">
    <img src="https://img.shields.io/npm/d18m/broch" alt="NPM ダウンロード数">
</p>

<p align="center">
    <a href="README.md">English</a> |
    <a href="README.es.md">Español</a> |
    <a href="README.zh.md">中文</a> |
    <a href="README.ja.md">日本語</a>
</p>

<p align="center"> <strong>プロジェクトのアーキテクチャをシンプルかつインタラクティブに可視化</strong> </p>

## 📑 目次
- [主な機能](#-主な機能)
- [インストール](#-インストール)
- [コマンド](#️-コマンド)
    - [map](#map)
    - [preview](#preview)
    - [version](#version)
    - [help](#help)
- [設定](#-設定)
- [ライセンス](#-ライセンス)

Brochは、プロジェクトの構造を分析し、インタラクティブな依存関係マップを生成するためのコマンドラインインターフェース（CLI）ツールです。Brochを使用することで、ファイル間の相互接続を明確にグラフィカルに表示でき、コードの理解、保守、デバッグが容易になります。

## ✨ 主な機能
自動依存関係分析: JavaScript、TypeScript、HTML、CSS、PHPファイルのimport、require、includeなどの関係を検出します。

インタラクティブな可視化: vis-networkを使用してダイナミックなHTMLマップを生成し、プロジェクトの接続を直感的に探索できます。

高度なカスタマイズ: 簡単な**broch.config.json**ファイルを通じて、色、ラベル、出力ファイル名を設定できます。

使いやすさ: 数個のコマンドだけで、プロジェクトのアーキテクチャの完全な視覚化が可能です。

## 🚀 インストール
Brochを使用するには、Node.js（バージョン12以上）がシステムにインストールされていることを確認してください。その後、npmを通じてパッケージをグローバルにインストールします：

```bash
npm i -g broch
```

グローバルにインストールすることで、任意のディレクトリからbrochコマンドを実行できます。

## ⚙️ コマンド
Brochは非常にシンプルに使用できます。利用可能なコマンドは以下の通りです。

```bash
broch map
```
これがBrochの中核機能です。選択したディレクトリをスキャンし、依存関係マップを生成します。

エイリアス：
```bash
broch m
```

**使用例：**

ディレクトリのスキャン: プロジェクトのルートでコマンドを実行するだけで、Brochが現在のディレクトリの一覧を表示します。スキャンしたいディレクトリを選択すれば完了です。

![Vista previa del mapa de dependencias](assets/demo.PNG)

##

```bash
broch preview
```
マップを生成した後、このコマンドでブラウザで直接開くことができます。

エイリアス：
```bash
broch p
```

使用例：

このコマンドはbrochMap.html（または設定した名前）ファイルを探して開きます。

##

```bash
broch version
```

インストールされているBrochのバージョンを表示します。

エイリアス：

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
利用可能なコマンドとオプションの概要を表示します。

エイリアス：
```bash
broch h
```

## 🔧 設定 (broch.config.json)

```bash
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

Brochを初めて実行すると、自動的にbroch.config.jsonファイルがディレクトリに作成されます。このファイルで好みに応じてツールをカスタマイズできます。

**outputFileName:** 生成されるHTMLファイルの名前を定義します。

**colors:** 拡張子に応じて各ファイルタイプに色を割り当てます。好きなだけ追加・変更可能です！

**labels:** マップの色凡例にカスタムラベルを定義でき、視覚化をより明確にします。

## 📄 ライセンス
このプロジェクトは**CC BY-NC-ND 4.0**ライセンスの下で提供されています。詳細については[このURL](https://creativecommons.org/licenses/by-nc-nd/4.0/)をご覧ください。

</div>