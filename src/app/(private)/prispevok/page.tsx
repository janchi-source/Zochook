import { prisma } from "@/app/api/auth/[...nextauth]/prisma";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PostsClientView from "./PostsClientView";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

// This is a Server Component
export default async function Page() {
  try {
    const session = await getServerSession(authOptions);
    const currentUserId = session?.user?.email ? 
      (await prisma.user.findUnique({ where: { email: session.user.email } }))?.id : 
      null;

    // Get posts with user and comments
    const posts = await prisma.post.findMany({
      include: {
        user: true,
        comments: {
          include: {
            user: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Get likes counts using raw query
    const likesCountsRaw = await prisma.$queryRaw<Array<{ postId: string; count: string }>>`
      SELECT "postId", COUNT(*) as count
      FROM "Like"
      GROUP BY "postId"
    `;

    // Get user likes
    const userLikesRaw = currentUserId ? await prisma.$queryRaw<Array<{ postId: string }>>`
      SELECT "postId"
      FROM "Like"
      WHERE "userId" = ${currentUserId}
    ` : [];

    // Transform the data to match the expected format
    const transformedPosts = posts.map(post => ({
      id: post.id,
      userId: post.userId,
      imageUrl: post.imageUrl,
      caption: post.caption,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      user: {
        name: post.user.name,
        email: post.user.email
      },
      likesCount: Number(likesCountsRaw.find(l => l.postId === post.id)?.count || 0),
      commentsCount: post.comments.length,
      isLiked: currentUserId ? userLikesRaw.some(like => like.postId === post.id) : false,
      comments: post.comments.map(comment => ({
        id: comment.id,
        content: comment.content,
        createdAt: comment.createdAt,
        userId: comment.userId,
        user: {
          name: comment.user.name
        }
      }))
    }));
    
    return <PostsClientView posts={transformedPosts} />;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          py: 4,
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(180deg, #0a0e17 0%, #121b29 40%, #1e3c72 100%)',
        }}
      >
        <Typography variant="h5" sx={{ color: 'white', textAlign: 'center' }}>
          Error fetching posts. Please try again later.
        </Typography>
      </Box>
    );
  }
}
