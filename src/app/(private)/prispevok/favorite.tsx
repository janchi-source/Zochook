// pages/api/post/favorite.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { postId, userId } = req.body;
  if (req.method === 'POST') {
    const favorite = await prisma.favoritesOnUsers.upsert({
      where: { userId_postId: { userId, postId: Number(postId) } },
      update: {},
      create: { userId, postId: Number(postId) }
    });
    res.json(favorite);
  } else if (req.method === 'DELETE') {
    const deleteFavorite = await prisma.favoritesOnUsers.delete({
      where: { userId_postId: { userId, postId: Number(postId) } }
    });
    res.json(deleteFavorite);
  } else {
    res.setHeader('Allow', ['POST', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
