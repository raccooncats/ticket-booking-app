## イメージ

<div style="display: flex; gap: 20px;">
    <img src="https://github.com/user-attachments/assets/dcecce31-ecd7-4b8f-a58a-d853d53b979d" alt="Image 1" width="200">
    <img src="https://github.com/user-attachments/assets/b97f0b29-a493-47d8-95fe-d897ff43dd1b" alt="Image 2" width="200">
    <img src="https://github.com/user-attachments/assets/50047c4b-728c-4738-9ee8-0b02c841f00c" alt="Image 3" width="200">
    <img src="https://github.com/user-attachments/assets/b16257e7-e91d-4b20-9938-1aa4f0dea1d5" alt="Image 4" width="200">
</div>

## 技術スタック

- React Native
- Go 1.23.2
- PostgreSQL 16.4
- others
  - Docker
  - Expo

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
