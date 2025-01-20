

import { PrismaClient } from "@prisma/client";
import Typography from "@mui/material/Typography";
import Image from "next/image";

const prisma = new PrismaClient();

export default async function PostsList() {
  // Fetch posts from Prisma database
  const posts = await prisma.post.findMany({
    select: {
      id: true,
      imageUrl: true,
      caption: true,
    },
  });

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Zoznam prispevkov
      </Typography>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
        {posts.map((post) => (
          <div key={post.id} style={{ textAlign: "center" }}>
            <Image
              src={post.imageUrl}
              alt={post.caption || "Post image"}
              width={200}
              height={200}
              style={{ objectFit: "cover", borderRadius: "8px" }}
            />
            <Typography variant="body2" color="textSecondary">
              {post.caption}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
}
