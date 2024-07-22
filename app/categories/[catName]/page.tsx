import { TPost } from "@/app/types";
import Post from "@/components/Post";
import prisma from "@/lib/prismadb";

const getPosts = async (catName: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXTAUTH_URL}/api/categories/${catName}`,
      { cache: "no-cache" }
    );

    if (res.ok) {
      const posts = await res.json();
      console.log(posts);
      
      return posts;
    }
  } catch (error) {
    console.log(error);
  }
};

export default async function CategoryPosts({
  params,
}: {
  params: { catName: string };
}) {
  const category = params.catName;
  const posts = await getPosts(category);

  return (
    <>
      <h1>
        <span className="font-normal">Category: </span>
        {decodeURIComponent(category)}
      </h1>
      {posts && posts.length > 0 ? (
        posts.map((post: TPost) => (
          <Post
            key={post.id}
            id={post.id}
            author={post.author?.name}
            authorEmail={post.authorEmail}
            date={post.createdAt}
            thumbnail={post.imageUrl}
            category={post.catName}
            title={post.title}
            content={post.content}
            links={post.links || []}
          />
        ))
      ) : (
        <div className="py-6">No posts to display</div>
      )}
    </>
  );
}
