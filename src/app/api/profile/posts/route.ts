import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface Comment {
  id: number;
  content: string;
  createdAt: Date;
  postId: string;
  userId: string;
  user: {
    name: string | null;
    image: string | null;
  };
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get posts
    const posts = await prisma.post.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (posts.length === 0) {
      return NextResponse.json([]);
    }

    // Get comments for all posts
    const comments = (await prisma.$queryRaw<Comment[]>`
      SELECT 
        c.id::integer,
        c.content,
        c."createdAt",
        c."postId",
        c."userId",
        u.name,
        u.image
      FROM "Comment" c
      JOIN "User" u ON c."userId" = u.id
      WHERE c."postId" = ANY(${posts.map(post => post.id)})
    `);

    // Get likes count for all posts
    const likesCounts = await prisma.$queryRaw<Array<{ postId: string; count: number }>>`
      SELECT 
        "postId",
        COUNT(*)::integer as count
      FROM "Like"
      WHERE "postId" = ANY(${posts.map(post => post.id)})
      GROUP BY "postId"
    `;

    // Combine the data
    const transformedPosts = posts.map(post => ({
      ...post,
      likes: likesCounts.find(count => count.postId === post.id)?.count || 0,
      comments: comments.filter(comment => comment.postId === post.id),
    }));

    return NextResponse.json(transformedPosts);
  } catch (error) {
    console.error("Error fetching user posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch user posts" },
      { status: 500 }
    );
  }
} 