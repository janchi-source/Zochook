// pages/api/post/comment.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { comment, postId, userId } = req.body;
    const newComment = await prisma.comment.create({
      data: {
        content: comment,
        postId: Number(postId),
        userId: userId
      }
    });
    res.json(newComment);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
