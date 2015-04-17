# このアプリについて
ShuffleLunchはBOIの社内ツールとして活用されるものを目指して設計、実装されたものである。

# 技術サマリー
使用されている技術は下記のものである。

* Node.js 0.10.36
* mongoDB 2.6.8 データベース
* express 4.0.0 アプリケーションフレームワーク
* AngularJS 1.3.14 フロントエンドJavaScriptフレームワーク
* npm Node.js用パッケージマネージャー
* bower フロントエンド用パッケージマネージャー
* Grunt ビルドツール

# ローカル開発環境構築

### Clone from repository
```
$ git clone git@192.168.3.210:technical-management-team/shufflelunch.git
```

### Install Required Libraries
```
$ npm install
$ bower install
```

### Create Database
```
$ mongo
mongo > use shufflelunch-dev;
mongo > db.addUser('boi', 'boi');
mongo > exit;
```

### Run Server
```
$ grunt server --force
```
