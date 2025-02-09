import { PrismaClient } from "@prisma/client";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Box from "@mui/material/Box";
import Wave from "react-wavify";

const prisma = new PrismaClient();

export default async function PostsList() {
    const posts = await prisma.post.findMany({
        select: {
            id: true,
            imageUrl: true,
            caption: true,
            createdAt: true,
        },
    });

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                py: 4,
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Wave Background */}
            <Box sx={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0 }}>
                <Wave
                    fill="rgba(255, 255, 255, 0.2)"
                    paused={false}
                    options={{
                        height: 20,
                        amplitude: 30,
                        speed: 0.15,
                        points: 3
                    }}
                    style={{ position: 'absolute', bottom: '0' }}
                />
                <Wave
                    fill="rgba(255, 255, 255, 0.1)"
                    paused={false}
                    options={{
                        height: 25,
                        amplitude: 35,
                        speed: 0.2,
                        points: 4
                    }}
                    style={{ position: 'absolute', bottom: '10px' }}
                />
            </Box>

            {/* Polaroid Feed Container */}
            <Box sx={{
                maxWidth: '600px',
                margin: '0 auto',
                padding: '40px 20px',
                position: 'relative',
                zIndex: 1
            }}>
                <div style={{ display: 'grid', gap: '40px' }}>
                    {posts.map((post, index) => (
                        <div key={post.id} style={{
                            position: 'relative',
                            backgroundColor: 'white',
                            padding: '15px 15px 60px',
                            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
                            transform: `rotate(${index % 2 === 0 ? '-1' : '1'}deg)`,
                            transition: 'transform 0.3s ease',
                            margin: '0 auto',
                            width: '85%',
                            maxWidth: '400px',
                        }}>
                            <div style={{
                                borderBottom: '10px solid white',
                                overflow: 'hidden',
                                backgroundColor: '#fafafa'
                            }}>
                                <Image
                                    src={post.imageUrl}
                                    alt={post.caption || "Post image"}
                                    width={400}
                                    height={400}
                                    style={{
                                        objectFit: "cover",
                                        width: '100%',
                                        height: 'auto',
                                        aspectRatio: '1/1'
                                    }}
                                />
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
                                    {post.caption}
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
