# TypeScript Cucumber BDD (チュートリアル、Mac)

>元の記事は下記の通りです。  
>https://scriptable.com/typescript/typescript-cucumber-bdd/

こんな手順だったと思う。
### 1. プロジェクトを初期化  
```
yarn init -y
```

### 2. TypeScriptをインストール  
```
yarn add typescript --dev
```
>このコマンドは、TypeScriptをインストールし、package.jsonファイルの「 devDependency 」セクションに追加します。

### 3. ソース用のフォルダーを作成  
```
mkdir src
```

### 4. tsconfig.jsonを作成  
```
touch tsconfig.json
```
tsconfigの中身  
```
{
  "compilerOptions": {
    "target": "ES6",
    "module": "CommonJS",
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### 5. ソースファイル作成
```
touch src/index.ts
```
ソースファイルの中身
```
export function add(a: number, b: number) : number { 
    return a + b 
}
```
### 6. package.jsonを編集
```
  "scripts": {
    "build": "tsc",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```
mainを編集  
```
"main": "./dist/index.js",
```

### 7. buildする
```
yarn build
```

### 8. distフォルダーを削除するcleanコマンドのスクリプトを作成
```
  "scripts": {
    "build": "tsc",
    "clean": "rm -rf dist",
```
クリーンを実行する場合...
```
yarn clean
```

### 9. cucumberインストール
```
yarn add @cucumber/cucumber --dev
```

### 10. ts-nodeをインストール　  
Node.jsでTypeScriptファイルをJSにトランスパイルせずに実行するため
```
yarn add ts-node --dev
```

### 11.  cucumber.js(構成ファイル)を作成  
```
touch cucumber.js
```
中身  
```
module.exports = {
    default: {
        requireModule: ['ts-node/register'],
        paths: ['test/features/*.feature'],
        require: ['test/step-definitions/**/*.ts']
    }
};
```
・requireModule：含めるモジュールのリスト (この場合は JIT コンパイラー)  
・paths：featureファイルを探す場所を cucumber に指示します。  
・require：一致するステップを解釈するためのコードを見つける場所を cucumber に指示します。  

### 12. feature用のフォルダーを作成  
```
mkdir -p test/features
```  
### 13. faetureファイルを作成  
```
touch test/features/add.feature
```
中身
```
Feature: Add function
  Scenario: Adding two numbers
    Given I have a number 5
    And I have another number 3
    When I add them
    Then I get 8
```
### 14. ステップ定義用のフォルダーを作成  
```
mkdir -p test/step-definitions
```
### 15. ステップファイルを作成  
```
touch test/step-definitions/add.steps.ts
```
中身
```
import { Given, When, Then } from '@cucumber/cucumber';
import { add } from '../../src';

function assert(condition: any, message: string = "Assertion failed"): asserts condition {
    if (!condition) {
        throw new Error(message);
    }
}

Given('I have a number {int}', function (number: number) {
    this.a = number;
});

Given('I have another number {int}', function (number: number) {
    this.b = number;
});

When('I add them', function () {
    this.result = add(this.a, this.b);
});

Then('I get {int}', function (expectedResult: number) {
    assert( this.result == expectedResult )
});
```
### 16. ステップ実行用にpackage.jsonを編集  
```
"test": "cucumber-js"
```
>デフォルトでは、cucumber-js は、プロジェクトのルートで、前に定義したcucumber.js構成ファイルを探します。

### 17. テスト実行  
```
npm test
```
