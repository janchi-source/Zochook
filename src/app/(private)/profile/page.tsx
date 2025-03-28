// src/app/profil/page.tsx

"use client";

import { useSession } from "next-auth/react";
import { Box, Typography, Grid, Avatar, Button, Tabs, Tab } from "@mui/material";
import { useState, useEffect } from "react";

interface Post {
  id: string;
  imageUrl: string;
  caption: string;
  createdAt: string;
  likes: any[];
  comments: any[];
}

export default function ProfilePage() {
  const { data: session } = useSession();
  const [tabValue, setTabValue] = useState(0);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/profile/posts");
        if (!response.ok) throw new Error("Failed to fetch posts");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #0a0e17 0%, #121b29 40%, #1c2c52 100%)",
        color: "white",
        py: 4,
        px: 2,
      }}
    >
      {/* Profile Header */}
      <Box
        sx={{
          maxWidth: 935,
          mx: "auto",
          mb: 4,
          display: "flex",
          alignItems: "center",
          gap: 4,
          p: 2,
        }}
      >
        <Avatar
          src={session?.user?.image || ""}
          sx={{
            width: 150,
            height: 150,
            border: "4px solid white",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          }}
        />
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <Typography variant="h4" sx={{ fontWeight: 300 }}>
              {session?.user?.name}
            </Typography>
            <Button
              variant="outlined"
              sx={{
                color: "white",
                borderColor: "white",
                "&:hover": {
                  borderColor: "white",
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              Edit Profile
            </Button>
          </Box>
          <Box sx={{ display: "flex", gap: 4, mb: 2 }}>
            <Typography>
              <strong>{posts.length}</strong> posts
            </Typography>
            <Typography>
              <strong>0</strong> followers
            </Typography>
            <Typography>
              <strong>0</strong> following
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            {session?.user?.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
            Bio goes here
          </Typography>
        </Box>
      </Box>

      {/* Tabs */}
      <Box sx={{ maxWidth: 935, mx: "auto", mb: 4 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            "& .MuiTab-root": {
              color: "rgba(255,255,255,0.5)",
              "&.Mui-selected": {
                color: "white",
                fontWeight: 600,
              },
            },
          }}
        >
          <Tab
            icon={
              <Box
                component="span"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                <Typography variant="h6">📷</Typography>
                <Typography variant="caption">POSTS</Typography>
              </Box>
            }
          />
          <Tab
            icon={
              <Box
                component="span"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                <Typography variant="h6">🔖</Typography>
                <Typography variant="caption">SAVED</Typography>
              </Box>
            }
          />
        </Tabs>
      </Box>

      {/* Posts Grid */}
      <Box sx={{ maxWidth: 935, mx: "auto" }}>
        <Grid container spacing={2}>
          {loading ? (
            // Loading skeleton
            [...Array(6)].map((_, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    paddingTop: "100%",
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderRadius: "4px",
                  }}
                />
              </Grid>
            ))
          ) : posts.length === 0 ? (
            <Grid item xs={12}>
              <Box
                sx={{
                  textAlign: "center",
                  py: 8,
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                <Typography variant="h6">No posts yet</Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Share your first moment!
                </Typography>
              </Box>
            </Grid>
          ) : (
            posts.map((post) => (
              <Grid item xs={12} sm={6} md={4} key={post.id}>
                <Box
                  className="polaroid"
                  sx={{
                    position: "relative",
                    width: "100%",
                    paddingTop: "100%",
                    backgroundColor: "white",
                    transform: `rotate(${Math.random() * 4 - 2}deg)`,
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.02) rotate(0deg)",
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={post.imageUrl}
                    alt={post.caption}
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      border: "12px solid white",
                      boxShadow: "0 6px 16px rgba(0,0,0,0.3)",
                    }}
                  />
                </Box>
              </Grid>
            ))
          )}
        </Grid>
      </Box>

      <style jsx global>{`
        .polaroid {
          background: white;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .polaroid:hover {
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4);
        }
      `}</style>
    </Box>
  );
}
