## 実行手順(開発環境)

1. Docker 環境を立ち上げる

アプリケーションとデータベースを Docker で立ち上げるために、まず以下のコマンドを実行します。

```bash
docker compose -f backend/docker-compose.yml up -d
```

Docker コンテナがバックグラウンドで実行されます。

2. モジュールをインストールする

次に、フロントエンドの依存関係をインストールします。

```bash
npm --prefix ./mobile install
```

3. 開発サーバーを起動する

次に、開発サーバーを起動します。

```bash
npm --prefix ./mobile start
```

Expo を立ち上げ、 [exp://localhost:8081](exp://localhost:8081) にアクセスして、アプリケーションを確認できます。
