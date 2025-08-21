// app/page.tsx (shadcn/ui適用後)

import { neon } from "@neondatabase/serverless";
import { revalidatePath } from "next/cache";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// (データベース接続と各種関数は変更なし)
const sql = neon(process.env.POSTGRES_URL!);
async function getComments() {
  try {
    await sql`ALTER TABLE comments ADD COLUMN IF NOT EXISTS id SERIAL PRIMARY KEY;`;
    const comments = await sql`SELECT * FROM comments ORDER BY id DESC`;
    return comments;
  } catch (error) { console.error("Failed to fetch comments:", error); return []; }
}
async function create(formData: FormData) {
  "use server";
  const comment = formData.get("comment") as string;
  if (comment) {
    try { await sql`INSERT INTO comments (comment) VALUES (${comment})`; revalidatePath("/"); }
    catch (error) { console.error("Failed to create comment:", error); }
  }
}
async function deleteComment(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  try { await sql`DELETE FROM comments WHERE id = ${id}`; revalidatePath("/"); }
  catch (error) { console.error("Failed to delete comment:", error); }
}

export default async function HomePage() {
  const comments = await getComments();

  return (
    <div className="bg-slate-50 min-h-screen">
      <main className="container mx-auto max-w-2xl p-4 sm:p-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold tracking-tight">
              Stylish Bulletin Board
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form action={create} className="flex w-full items-center space-x-2">
              <Input
                type="text"
                name="comment"
                placeholder="What's on your mind?"
                required
              />
              <Button type="submit">Post</Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-6 space-y-4">
          {comments.map((item) => (
            <Card key={item.id} className="shadow-md">
              <CardContent className="p-4 flex justify-between items-center">
                <p className="text-gray-800">{item.comment}</p>
                <form action={deleteComment}>
                  <input type="hidden" name="id" value={item.id} />
                  <Button type="submit" variant="destructive" size="sm">
                    Delete
                  </Button>
                </form>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}