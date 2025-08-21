# Next.js製 簡易掲示板アプリケーション

[<img width="924" height="753" alt="スクリーンショット 2025-08-21 162708" src="https://github.com/user-attachments/assets/0566e60d-1aed-47e1-9f4e-a38f322aa502" />
]

作成した簡易掲示板アプリケーションです。Next.jsのApp Router, Server Actions, Vercel Postgresといったモダンな技術スタックを使用して開発しました。

**➡️ [ライブデモはこちら]([https://nextjs-bulletin-board.vercel.app])**

---

## 主な機能

* **コメントの投稿**: フォームから新しいコメントを投稿できます。
* **コメントの削除**: 各コメントを個別に削除できます。
* **リアルタイム更新**: 投稿・削除後は、ページをリロードすることなく即座に表示が更新されます。

---

## 使用技術

* **フレームワーク**: Next.js 14+ (App Router)
* **言語**: TypeScript
* **UI**: Tailwind CSS, shadcn/ui
* **データベース**: Vercel Postgres (Neon)
* **デプロイ**: Vercel

---

## こだわった点・学んだこと

このプロジェクトを通じて、以下の技術の理解と実践的なスキルを深めました。

* **Server Components**: ページの初期表示をサーバーサイドでレンダリングすることで、高速な表示と優れたSEOを実現しました。データベースからのデータ取得もサーバーコンポーネント内で直接行うことで、コードの記述量を削減しました。

* **Server Actions**: フォームの送信処理にServer Actionsを利用しました。これにより、APIルートを別途作成する必要がなくなり、クライアントとサーバーのコードがより密接になりました。また、`revalidatePath`を活用することで、データ更新後に効率的にUIを最新の状態に保つ方法を学びました。

* **VercelによるCI/CD**: GitHubにコードをプッシュするだけで、自動的にテスト、ビルド、デプロイが行われるCI/CD（継続的インテグレーション/継続的デリバリー）パイプラインを体験しました。このシームレスな開発体験は、生産性を大きく向上させることを実感しました。

* **実践的なトラブルシューティング**: 開発からデプロイまでの一連のプロセスで、Gitのブランチ設定ミス、環境変数の不整合、UIの表示崩れなど、多くのエラーに直面しました。その原因を特定し、公式ドキュメントやログを元に一つ一つ解決していくことで、実践的な問題解決能力を養うことができました。

---

## ローカルでの実行方法

1.  このリポジトリをクローンします。
    ```bash
    git clone [https://github.com/yoseipp/nextjs-bulletin-board.git](https://github.com/yoseipp/nextjs-bulletin-board.git)
    ```
2.  プロジェクトディレクトリに移動します。
    ```bash
    cd nextjs-bulletin-board
    ```
3.  依存関係をインストールします。
    ```bash
    npm install
    ```
4.  `.env.local`ファイルを作成し、Vercelから取得した環境変数を設定します。

5.  開発サーバーを起動します。
    ```bash
    npm run dev
    ```
    ブラウザで `http://localhost:3000` を開きます。
