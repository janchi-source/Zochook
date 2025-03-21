"use client";

import { Post } from "@prisma/client";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Box from "@mui/material/Box";
import { IconButton } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

// Client component to display posts
export function PostsClientView({ posts }: { posts: Post[] }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [favorites, setFavorites] = useState<Record<number, boolean>>({});

  // Function to handle favoriting a post
  const handleFavorite = async (postId: number) => {
    if (!session) {
      router.push('/login');
      return;
    }

    const isFavorited = favorites[postId];
    const method = isFavorited ? 'DELETE' : 'POST';

    try {
      const response = await fetch(`/api/post/favorite`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, userId: session.user.id }),
      });

      if (response.ok) {
        setFavorites(prev => ({ ...prev, [postId]: !isFavorited }));
      } else {
        console.error('Failed to update favorite status');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Function to handle commenting on a post
  const handleComment = async (postId: number) => {
    if (!session) {
      router.push('/login');
      return;
    }

    // Here you would typically open a modal or form for commenting
    console.log(`Commenting on post ${postId}`);
    // Implement comment form logic here
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        color: 'white',
        position: 'relative',
        overflowY: 'auto',
        overflowX: 'hidden',
        background: 'linear-gradient(180deg, #0a0e17 0%, #121b29 40%, #1c2c52 100%)',
        '&::before': {
          content: '""',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'400\' height=\'400\' viewBox=\'0 0 800 800\'%3E%3Cg fill=\'none\' stroke=\'%23ffffff\' stroke-opacity=\'0.15\'%3E%3Ccircle r=\'1.2\' cx=\'769\' cy=\'229\'/%3E%3Ccircle r=\'0.5\' cx=\'539\' cy=\'269\'/%3E%3Ccircle r=\'0.8\' cx=\'603\' cy=\'493\'/%3E%3Ccircle r=\'1.1\' cx=\'362\' cy=\'730\'/%3E%3Ccircle r=\'0.6\' cx=\'330\' cy=\'365\'/%3E%3Ccircle r=\'1.3\' cx=\'160\' cy=\'380\'/%3E%3Ccircle r=\'0.4\' cx=\'547\' cy=\'40\'/%3E%3Ccircle r=\'1.0\' cx=\'630\' cy=\'68\'/%3E%3Ccircle r=\'0.7\' cx=\'711\' cy=\'699\'/%3E%3Ccircle r=\'0.9\' cx=\'279\' cy=\'53\'/%3E%3Ccircle r=\'1.0\' cx=\'227\' cy=\'243\'/%3E%3Ccircle r=\'0.5\' cx=\'97\' cy=\'184\'/%3E%3Ccircle r=\'1.1\' cx=\'49\' cy=\'81\'/%3E%3Ccircle r=\'0.7\' cx=\'387\' cy=\'460\'/%3E%3Ccircle r=\'0.4\' cx=\'117\' cy=\'617\'/%3E%3Ccircle r=\'1.3\' cx=\'745\' cy=\'378\'/%3E%3Ccircle r=\'0.6\' cx=\'178\' cy=\'736\'/%3E%3Ccircle r=\'0.8\' cx=\'601\' cy=\'265\'/%3E%3Ccircle r=\'1.1\' cx=\'72\' cy=\'321\'/%3E%3Ccircle r=\'0.5\' cx=\'137\' cy=\'57\'/%3E%3Ccircle r=\'0.9\' cx=\'425\' cy=\'313\'/%3E%3C/g%3E%3C/svg%3E")',
          backgroundAttachment: 'fixed',
          zIndex: 0,
          pointerEvents: 'none',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '80px',
          backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 24 150 28\' preserveAspectRatio=\'none\'%3E%3Cdefs%3E%3Cpath id=\'gentle-wave\' d=\'M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z\' /%3E%3C/defs%3E%3Cg fill=\'%23294379\'%3E%3Cuse href=\'%23gentle-wave\' x=\'48\' y=\'0\' /%3E%3C/g%3E%3Cg fill=\'%23355693\'%3E%3Cuse href=\'%23gentle-wave\' x=\'48\' y=\'3\' /%3E%3C/g%3E%3Cg fill=\'%232a3e6c\'%3E%3Cuse href=\'%23gentle-wave\' x=\'48\' y=\'5\' /%3E%3C/g%3E%3Cg fill=\'%232d3a61\'%3E%3Cuse href=\'%23gentle-wave\' x=\'48\' y=\'7\' /%3E%3C/g%3E%3C/svg%3E")',
          backgroundSize: '100% 100%',
          zIndex: 0,
        }
      }}
    >
      {/* Sun/Moon in the corner */}
      <Box
        sx={{
          position: 'fixed',
          top: '30px',
          right: '30px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,252,175,1) 0%, rgba(255,231,138,1) 60%, rgba(249,212,35,1) 100%)',
          boxShadow: '0 0 40px 20px rgba(255,231,138,0.4)',
          zIndex: 1,
          pointerEvents: 'none'
        }}
      />
      
      {/* Polaroid Feed Container */}
      <Box sx={{
        width: '100%',
        maxWidth: '500px',
        margin: '0 auto',
        padding: '20px',
        paddingBottom: '150px', // Extra space at bottom for waves + navbar
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{ 
          display: 'grid', 
          gap: '40px',
        }}>
          {posts.map((post, index) => (
            <div key={post.id} style={{
              position: 'relative',
              backgroundColor: 'white',
              padding: '15px 15px 60px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
              transform: `rotate(${index % 2 === 0 ? '-1' : '1'}deg)`,
              transition: 'transform 0.3s ease',
              margin: '0 auto',
              width: '85%',
              maxWidth: '400px',
              borderRadius: '4px',
            }}>
              <div style={{
                borderBottom: '10px solid white',
                overflow: 'hidden',
                backgroundColor: '#fafafa'
              }}>
                <Image
                  src={post.imageUrl}
                  alt={post.caption || "Post image"}
                  width={300}
                  height={300}
                  style={{
                    objectFit: "cover",
                    width: '100%',
                    height: 'auto',
                    aspectRatio: '1/1',
                    borderRadius: '4px'
                  }}
                />
                <Box sx={{ 
                  display: 'flex', 
                  gap: 1, 
                  mt: 1, 
                  alignSelf: 'flex-start',
                  width: '100%',
                  padding: '0 8px'
                }}>
                  <IconButton size="small" color="primary" onClick={() => handleFavorite(post.id)}>
                    {favorites[post.id] ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  </IconButton>
                  <IconButton size="small" color="primary" onClick={() => handleComment(post.id)}>
                    <ChatBubbleOutlineIcon />
                  </IconButton>
                </Box>
              </div>

              <div style={{
                textAlign: 'center',
                paddingTop: '10px'
              }}>
                <Typography style={{
                  fontFamily: '"Homemade Apple", cursive',
                  color: '#333',
                  fontSize: '1.1rem',
                  lineHeight: 1.3
                }}>
                  {post.caption || "No caption available"}
                </Typography>
                <Typography style={{
                  color: '#666',
                  fontSize: '0.8rem',
                  marginTop: '4px'
                }}>
                  {new Date(post.createdAt).toLocaleDateString()}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </Box>
    </Box>
  );
}
