"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

// Dummy fetch function. Replace with your actual API call.
const fetchResourceDetails = async (id: string) => {
  const response = await fetch(`/api/private/resource/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch resource data");
  }
  return await response.json();
};

// Polaroid post component for styling
const PolaroidPost = ({ resource }: { resource: any }) => {
  return (
    <Box
      sx={{
        width: 300,
        backgroundColor: "#fff",
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        p: 2,
        m: "20px auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        border: "1px solid #ddd",
        borderBottomWidth: "30px", // extra bottom border to mimic a polaroid frame
        borderRadius: "4px",
      }}
    >
      <Box
        component="img"
        src={resource.image || "/placeholder.jpg"}
        alt={resource.title}
        sx={{
          width: "100%",
          height: 200,
          objectFit: "cover",
        }}
      />
      <Typography variant="h6" sx={{ mt: 1, textAlign: "center" }}>
        {resource.title}
      </Typography>
      <Typography variant="body2" sx={{ mt: 1, textAlign: "center" }}>
        {resource.description || resource.content}
      </Typography>
    </Box>
  );
};

const PrivateIdPage = ({ params }: { params: { id: string } }) => {
  const { data: session, status } = useSession();
  const [resource, setResource] = useState<any>(null);
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    if (status === "loading") return; // Wait until session status is determined

    if (!session) {
      router.push("/auth/registracia");
    } else {
      // Fetch resource details using the provided ID
      fetchResourceDetails(id)
        .then(setResource)
        .catch((error) => {
          console.error(error);
          router.push("/404");
        });
    }
  }, [session, status, id, router]);

  if (status === "loading" || !resource) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 2, textAlign: "center" }}>
        Resource Details (ID: {id})
      </Typography>
      {/* Render the resource as a polaroid */}
      <PolaroidPost resource={resource} />
    </Box>
  );
};

export default PrivateIdPage;
