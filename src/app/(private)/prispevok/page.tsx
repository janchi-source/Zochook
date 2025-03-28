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

    const posts = await prisma.post.findMany({
      select: {
        id: true,
        imageUrl: true,
        caption: true,
        createdAt: true,
        userId: true,
        updatedAt: true,
        user: {
          select: {
            name: true
          }
        },
        _count: {
          select: {
            likes: true,
            comments: true
          }
        },
        likes: currentUserId ? {
          where: {
            userId: currentUserId
          }
        } : false,
        comments: {
          select: {
            id: true,
            content: true,
            createdAt: true,
            user: {
              select: {
                name: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      },
    });
    
    // Transform the data to match the expected format
    const transformedPosts = posts.map(post => ({
      ...post,
      likesCount: post._count.likes,
      commentsCount: post._count.comments,
      isLiked: currentUserId ? post.likes.length > 0 : false
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
