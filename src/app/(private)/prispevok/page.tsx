import { PrismaClient } from "@prisma/client";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PostsClientView from "./PostsClientView";

// This is a Server Component
export default async function Page() {
  const prisma = new PrismaClient({
    log: ['query', 'error', 'warn'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL_UNPOOLED
      }
    }
  });
  
  try {
    const posts = await prisma.post.findMany({
      select: {
        id: true,
        imageUrl: true,
        caption: true,
        createdAt: true,
        // Adding the missing fields to match Post type
        userId: true,
        updatedAt: true,
      },
    });
    
    return <PostsClientView posts={posts} />;
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
