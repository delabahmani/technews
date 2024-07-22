import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import prisma from "@/lib/prismadb";
import AdminPost from "@/components/AdminPost";
import { TPost } from "../types";

export default async function Admin() {
  const session = await getServerSession(authOptions);
  if (session?.user?.email !== "epurcell98@gmail.com" || !session) {
    redirect("/");
  }

  let posts;

  try {
    posts = await prisma.post.findMany({
      include: { author: true },
    });
  } catch (error) {
    console.log(error);
  }

  return (
    <div>
      <h1>Admin Portal</h1>
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <AdminPost
            key={post.id}
            id={post.id}
            author={post.author?.name as string}
            authorEmail={post.authorEmail}
            date={post.createdAt as any}
            thumbnail={post.imageUrl as string}
            category={post.catName as string}
            title={post.title}
            content={post.content}
            links={post.links || []}
          />
        ))
      ) : (
        <div className="py-6">No posts to display</div>
      )}
    </div>
  );
}
