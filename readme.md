# Express.js テンプレートを使う
テンプレートエンジンとは、ビューにデータを動的に挿入できるコーディングが可能になります。
テンプレートエンジンは以下のような種類があります。

| テンプレートエンジン | 説明                                                                                                                                                                |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| EJS                  | 「EJS」は、特別な構文を持つJavaScriptオブジェクトの形式でページに埋め込まれるデータです。                                                                           |
| Mustache.js          | 「マスターシュ」は、Handlebars.jsと違ってカスタムヘルパーを供給しない、シンプルで軽量なテンプレートエンジンです。JavaScript以外の多くの言語にもコンパイルされます。 |
| Hndlebars.js         | 機能的にはEJSに似たエンジンで、主に波カッコすなわり「ハンドルバー」を使って動的にコンテンツをビューに挿入する事に重点を置いてます。                                 |
| Underscore.js        | 「アンダースコア」と言うエンジンは、JavaScript関数やライブラリだけでなく、カスタマイズ可能な構文とシンボルによるテンプレートを供給します。                          |
| Pug.js               | 以前はJadeと言う名前だった「パグ」と言うエンジンは、HTMLのタグ名を単純化してシンプルに書くことができ、インデントが意味を持ちます。                                  |

Express.jsは「テンプレートエンジン」を使ってビューを処理し、ブラウザが読めるHTMLページに変換します。
HTML以外の行はHTMLに変換され、変数が埋め込まれていた部分には実際の値が行事されます。

実際に、Express.js のアプリケーションを作成していきましょう。

```bash
npm i express
```

次に、今回はテンプレートエンジンに、Pug を使用しますのでインストールします。

```bash
npm i pug
```
インストールを終えたら、Express.js で使用するテンプレートエンジンを指定します。
`app.set("view engine", "pug");`

ホームコントローラーのフォルダ `controllers` と ビューのフォルダ `views` を作成します。

```bash
mkdir controllers
mkdir views
```

次に、`main.js`以下の様に記述します。

```javascript
const port = 3000;
const express = require("express");
const app = express();
homeController = require("./controllers/homeController");

app.set("view engine", "pug");

app.get('/', homeController.top)

app.listen(port, () => {
	console.log("server start http://localhost:%d/", port);
});
```

次に、ホームコントローラー `controllers/homeController.js`を以下の様に記述します。
```javascript
exports.top = (req, res) => {
	res.render('index', { title: 'Welcome', message: 'Hello World!' })
};
```

次に、ビュー `views/index.pug` を以下の様に記述します。
```pug
html
  head
    title= title
  body
    h1= message
```

では、実際にExpress.jsアプリケーションを実行してみます。
```bash
node main.js
```
```bash
server start http://localhost:3000/
```
Webブラウザで http://localhost:3000/ にアクセスしてみて **Hello World!** が表示されると思います。

## パーシャルとレイアウトの設定
ビューの内容を複数のページで共有できるようにするため、最初にアプリケーションのレイアウトを作ります。「レイアウト」を外枠として、その内側にビューをレンダリングします。
たとえばページのフッターやナビゲーションバーの外枠を変化しない様にレイアウトを作成していきます。
これらのコンポーネントの為に、いちいちHTMLを作るのではなく代わりに他のビューと共有できる様に`views`ディレクトリに `_layout.pug` ファイルを作成して以下の様に記述します。

```pug
doctype html
html(lang="ja")
  head
    title= title
  body
    include ./partials/_nav.pug
    block contents
    include ./partials/_footer.pug
```

パーシャルもレイアウトと似た動きをします。「パーシャル」とは、他のビューにインクルードする事が可能な、断片的なビューコンテンツのことです。
ここでは、ページ共通のナビを`_nav.pug` 、フッターを`_footer.pug` として、`views` フォルダーの中に、パーシャル管理様に `partials` と言うフォルダを作り、下記のパーシャルファイルを記述して保存します。

```bash
mkdir views/partials
```
`/views/partials/_nav.pug`
```pug
#nav NAVIGATION
```
`/views/partials/_nav.pug`
```pug
#footer FOOTER
```

次に、ページ共通部分以外の、固有のHTMLをここでは`main.pug`として記述します。
```pug
extends _layout.pug

block contents
  h1#main= message
  p= name
```

URL 経路処理には、`main.js`に下記の経路コードを追記し

`app.get('/main/:name?', homeController.main);`

ホームコントローラには、`homeController.js`下記の処理コードを追記します。

```javascript
exports.main = (req, res) => {
	let name = req.params.name;
	res.render('main', { title: 'Main Page', message: 'Hello Main!', name: name })
};
```

そしたら、下記のコマンドを実行してアプリケーション実行してみましょう。

```bash
node main.js
```
```bash
server start http://localhost:3000/
```
今回経路URLを追加した /main/xxx をWebブラウザで http://localhost:3000/main/xxx にアクセスしてみて下記の様に表示されるか確認してみてください。
```html
NAVIGATION
Hello Main!
xxx
FOOTER
```
