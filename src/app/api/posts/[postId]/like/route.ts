import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { prisma } from '@/app/api/auth/[...nextauth]/prisma';

export async function POST(
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

    // Check if like already exists
    const existingLike = await prisma.like.findUnique({
      where: {
        postId_userId: {
          postId: params.postId,
          userId: user.id
        }
      }
    });

    if (existingLike) {
      return new NextResponse('Already liked', { status: 400 });
    }

    // Create new like
    await prisma.like.create({
      data: {
        postId: params.postId,
        userId: user.id
      }
    });

    return new NextResponse('Liked successfully', { status: 200 });
  } catch (error) {
    console.error('Error liking post:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

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

    // Delete like
    await prisma.like.delete({
      where: {
        postId_userId: {
          postId: params.postId,
          userId: user.id
        }
      }
    });

    return new NextResponse('Unliked successfully', { status: 200 });
  } catch (error) {
    console.error('Error unliking post:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 