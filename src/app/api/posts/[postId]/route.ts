import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function DELETE(
  request: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    // Find the post
    const post = await prisma.post.findUnique({
      where: { id: params.postId },
      select: { userId: true }
    });

    if (!post) {
      return new NextResponse('Post not found', { status: 404 });
    }

    // Check if the user is the owner of the post
    if (post.userId !== user.id) {
      return new NextResponse('Forbidden', { status: 403 });
    }

    // Delete the post (this will cascade delete comments and likes due to our schema)
    await prisma.post.delete({
      where: { id: params.postId }
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting post:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 