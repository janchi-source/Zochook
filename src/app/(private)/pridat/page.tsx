// src/app/prispevok/page.tsx

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";
import AddPostForm from "./AddPostForm";

export const metadata = { title: "Pridat | ZoškaSnap"}

export default async function AddPostPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect('/auth/prihlasenie');
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0e17] via-[#121b29] to-[#1c2c52]">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">Add New Post</h1>
        <AddPostForm />
      </div>
    </div>
  );
}
