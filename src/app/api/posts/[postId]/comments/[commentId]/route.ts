import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function DELETE(
  request: Request,
  { params }: { params: { postId: string; commentId: string } }
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

    // Find the comment
    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(params.commentId) },
      select: { userId: true }
    });

    if (!comment) {
      return new NextResponse('Comment not found', { status: 404 });
    }

    // Check if the user is the owner of the comment
    if (comment.userId !== user.id) {
      return new NextResponse('Forbidden', { status: 403 });
    }

    // Delete the comment
    await prisma.comment.delete({
      where: { id: parseInt(params.commentId) }
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting comment:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 