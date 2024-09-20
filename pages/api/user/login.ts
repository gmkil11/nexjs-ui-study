import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function Login(req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient();
  if (req.method === 'POST') {
    // GET, POST, PUT, PATCH, DELETE
    // res.status(200).json({ message: ' Next.js API!' });
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "email and password is required"})
    }

    try {
      const user = await prisma.user.findUnique({
        where: {email}
      });

      // 사용자가 존재하지 않는 경우
      if(!user) {
        return res.status(404).json({ message: "해당하는 유저가 존재하지 않습니다." })
      }
      if(user.password) {
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
          return res.status(401).json({message: 'Invalid password'});
        }
      }

      // JWT 토큰 생성
      const token = jwt.sign(
          { userId: user.id, email: user.email },
          process.env.JWT_SECRET!,
          { expiresIn: '1h' }
      );

      // 응답으로 토큰 반환
      // HttpOnly, Secure 쿠키 설정 (브라우저에서 접근 불가)
      const isProduction = process.env.NODE_ENV === 'production';
      res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=3600; ${isProduction ? 'Secure' : ''}`);

      return res.status(200).json({ message: 'Token set in cookie' });
    }
    catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
