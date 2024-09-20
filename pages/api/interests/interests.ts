import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { userId, interests } = req.body;

    // 유효성 검사
    if (!userId || !Array.isArray(interests) || interests.length === 0) {
      return res.status(400).json({ message: 'Invalid data' });
    }

    try {
      // 유저가 존재하는지 확인
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      await prisma.user.update({
        where: { id: userId },
        data: {
          interests
        },
      });

      return res.status(200).json({ message: 'Interests updated successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
