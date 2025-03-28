// src/views/private/PostsView.tsx

"use client";

import { useState, useEffect } from "react";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Box from "@mui/material/Box";
import { IconButton } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DeleteIcon from '@mui/icons-material/Delete';

// Comment interface
interface Comment {
  id: number;
  content: string;
  createdAt: Date;
  userId: string;
  user: {
    name: string | null;
  };
}

// Post interface
interface Post {
  id: string;
  userId: string;
  imageUrl: string;
  caption?: string | null;
  createdAt: Date;
  updatedAt: Date;
  user: {
    name: string | null;
    email: string | null;
  };
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
  comments: Comment[];
}

interface PostsClientViewProps {
  posts: Post[];
}

const PostsClientView = ({ posts }: PostsClientViewProps) => {
  const [favorites, setFavorites] = useState<Record<string, boolean>>(
    posts.reduce((acc, post) => ({ ...acc, [post.id]: post.isLiked }), {})
  );
  const [likesCount, setLikesCount] = useState<Record<string, number>>(
    posts.reduce((acc, post) => ({ ...acc, [post.id]: post.likesCount }), {})
  );
  const [comments, setComments] = useState<Record<string, Comment[]>>(
    posts.reduce((acc, post) => ({ ...acc, [post.id]: post.comments }), {})
  );
  const [newComment, setNewComment] = useState<Record<string, string>>({});
  const [showComments, setShowComments] = useState<Record<string, boolean>>({});
  const { data: session } = useSession();
  const router = useRouter();
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // Fetch current user's ID when session changes
  useEffect(() => {
    const fetchUserId = async () => {
      if (session?.user?.email) {
        try {
          const response = await fetch('/api/user/current');
          if (response.ok) {
            const data = await response.json();
            setCurrentUserId(data.id);
          }
        } catch (error) {
          console.error('Error fetching user ID:', error);
        }
      }
    };
    fetchUserId();
  }, [session]);

  // Function to handle favoriting a post
  const handleFavorite = async (postId: string) => {
    if (!session?.user?.email) {
      router.push('/login');
      return;
    }

    const isFavorited = favorites[postId];
    const method = isFavorited ? 'DELETE' : 'POST';

    try {
      const response = await fetch(`/api/posts/${postId}/like`, {
        method,
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        setFavorites(prev => ({ ...prev, [postId]: !isFavorited }));
        setLikesCount(prev => ({
          ...prev,
          [postId]: prev[postId] + (isFavorited ? -1 : 1)
        }));
      } else {
        console.error('Failed to update like status');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Function to handle commenting on a post
  const handleComment = async (postId: string) => {
    if (!session?.user?.email) {
      router.push('/login');
      return;
    }

    setShowComments(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleCommentSubmit = async (postId: string) => {
    if (!session?.user?.email || !newComment[postId]?.trim()) {
      return;
    }

    try {
      const response = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newComment[postId] }),
      });

      if (response.ok) {
        const comment = await response.json();
        setComments(prev => ({
          ...prev,
          [postId]: [comment, ...(prev[postId] || [])]
        }));
        setNewComment(prev => ({ ...prev, [postId]: '' }));
      } else {
        console.error('Failed to add comment');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Function to handle comment deletion
  const handleDeleteComment = async (postId: string, commentId: number) => {
    if (!session?.user?.email) {
      router.push('/login');
      return;
    }

    try {
      const response = await fetch(`/api/posts/${postId}/comments/${commentId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setComments(prev => ({
          ...prev,
          [postId]: prev[postId].filter(comment => comment.id !== commentId)
        }));
      } else {
        console.error('Failed to delete comment');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Function to handle post deletion
  const handleDeletePost = async (postId: string) => {
    if (!session?.user?.email) {
      router.push('/login');
      return;
    }

    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the post from the UI
        router.refresh();
      } else {
        console.error('Failed to delete post');
      }
    } catch (error) {
      console.error('Error:', error);
    }
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
        paddingBottom: '150px',
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
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <IconButton size="small" color="primary" onClick={() => handleFavorite(post.id)}>
                      {favorites[post.id] ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
                    </IconButton>
                    <Typography variant="body2" color="text.secondary">
                      {likesCount[post.id]}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <IconButton size="small" color="primary" onClick={() => handleComment(post.id)}>
                      <ChatBubbleOutlineIcon />
                    </IconButton>
                    <Typography variant="body2" color="text.secondary">
                      {comments[post.id]?.length || 0}
                    </Typography>
                  </Box>
                </Box>

                {/* Comments Section */}
                {showComments[post.id] && (
                  <Box sx={{ 
                    mt: 2, 
                    px: 2, 
                    pb: 2,
                    borderTop: '1px solid #eee',
                    backgroundColor: '#f8f8f8',
                    borderRadius: '4px'
                  }}>
                    {/* Comment Input */}
                    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                      <TextField
                        fullWidth
                        size="small"
                        placeholder="Add a comment..."
                        value={newComment[post.id] || ''}
                        onChange={(e) => setNewComment(prev => ({ ...prev, [post.id]: e.target.value }))}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleCommentSubmit(post.id);
                          }
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: 'white',
                            '& fieldset': {
                              borderColor: '#ddd',
                            },
                            '&:hover fieldset': {
                              borderColor: '#999',
                            },
                          },
                          '& .MuiInputBase-input': {
                            color: '#333',
                          },
                        }}
                      />
                      <IconButton 
                        color="primary" 
                        onClick={() => handleCommentSubmit(post.id)}
                        disabled={!newComment[post.id]?.trim()}
                      >
                        <SendIcon />
                      </IconButton>
                    </Box>

                    {/* Comments List */}
                    <Box sx={{ maxHeight: '200px', overflowY: 'auto' }}>
                      {comments[post.id]?.map((comment) => (
                        <Box key={comment.id} sx={{ 
                          mb: 1,
                          p: 1,
                          backgroundColor: 'white',
                          borderRadius: '4px',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start'
                        }}>
                          <Box>
                            <Typography variant="body2" component="span" sx={{ 
                              fontWeight: 'bold',
                              color: '#333'
                            }}>
                              {comment.user.name || 'Anonymous'}
                            </Typography>
                            <Typography variant="body2" component="span" sx={{ 
                              ml: 0.5,
                              color: '#333'
                            }}>
                              {comment.content}
                            </Typography>
                            <Typography variant="caption" sx={{ 
                              display: 'block',
                              color: '#666',
                              mt: 0.5
                            }}>
                              {new Date(comment.createdAt).toLocaleDateString()}
                            </Typography>
                          </Box>
                          {session?.user && (
                            <IconButton
                              size="small"
                              onClick={() => handleDeleteComment(post.id, comment.id)}
                              sx={{ 
                                ml: 1,
                                color: '#666',
                                '&:hover': {
                                  color: '#ff1744'
                                }
                              }}
                            >
                              <DeleteOutlineIcon fontSize="small" />
                            </IconButton>
                          )}
                        </Box>
                      ))}
                    </Box>
                  </Box>
                )}

              </div>

              <div style={{
                textAlign: 'center',
                paddingTop: '10px',
                position: 'relative'
              }}>
                <Typography style={{
                  fontFamily: '"Homemade Apple", cursive',
                  color: '#333',
                  fontSize: '1.1rem',
                  lineHeight: 1.3
                }}>
                  {post.caption || "No caption available"}
                </Typography>
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 1,
                  mt: 1
                }}>
                  <Typography style={{
                    color: '#666',
                    fontSize: '0.8rem'
                  }}>
                    {new Date(post.createdAt).toLocaleDateString()}
                  </Typography>
                  {currentUserId && post.userId === currentUserId && (
                    <IconButton
                      size="small"
                      onClick={() => handleDeletePost(post.id)}
                      sx={{
                        color: '#666',
                        '&:hover': {
                          color: '#ff1744'
                        }
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  )}
                </Box>
              </div>
            </div>
          ))}
        </div>
      </Box>
    </Box>
  );
};

export default PostsClientView;
