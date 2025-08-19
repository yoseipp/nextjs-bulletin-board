// app/page.tsx

import { neon } from "@neondatabase/serverless";
import { revalidatePath } from "next/cache";

// データベースに接続し、SQLを実行するための関数を準備します
// 接続情報はVercelの環境変数から自動で読み込まれます
const sql = neon(process.env.POSTGRES_URL!);

// データベースからコメントを全て取得する関数
async function getComments() {
  try {
    // idカラムを追加する必要があるので、まずテーブル構造を変更します
    await sql`
      ALTER TABLE comments ADD COLUMN IF NOT EXISTS id SERIAL PRIMARY KEY;
    `;
    const comments = await sql`SELECT * FROM comments ORDER BY id DESC`;
    return comments;
  } catch (error) {
    console.error("Failed to fetch comments:", error);
    // エラーが発生した場合は空の配列を返す
    return [];
  }
}

export default async function HomePage() {
  const comments = await getComments();

  // フォームが送信されたときに実行されるサーバーアクション
  async function create(formData: FormData) {
    "use server";
    const comment = formData.get("comment") as string;
    if (comment) {
      try {
        await sql`INSERT INTO comments (comment) VALUES (${comment})`;
        revalidatePath("/"); // ページを再検証して表示を更新
      } catch (error) {
        console.error("Failed to create comment:", error);
      }
    }
  }

  return (
    <main className="container mx-auto max-w-2xl p-4">
      <h1 className="text-2xl font-bold mb-4">簡易掲示板</h1>

      <form action={create} className="flex gap-2 mb-8">
        <input
          type="text"
          name="comment"
          placeholder="コメントを入力..."
          className="border rounded p-2 flex-grow"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
        >
          投稿
        </button>
      </form>

      <div>
        {comments.map((item) => (
          <div key={item.id} className="border-b p-2">
            <p>{item.comment}</p>
          </div>
        ))}
      </div>
    </main>
  );
}