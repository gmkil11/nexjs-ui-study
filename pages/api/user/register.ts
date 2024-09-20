import type { NextApiRequest, NextApiResponse } from 'next'
import {PrismaClient} from "@prisma/client";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export default async function Register(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // GET, POST, PUT, PATCH, DELETE
    // res.status(200).json({ message: 'Hello from Next.js API!' });
    const { email, password, name} = req.body;

    try {
        const existingUser = await prisma.user.findUnique({
          where: { email }
        })

      if (existingUser) {
        return res.status(409).json({ message: '이미 존재하는 이메일입니다.' });
      }

      // 비밀번호 해시 처리
      const hashedPassword = await bcryptjs.hash(password, 10);

      const newUser = await prisma.user.create({
        data: {
          email: email,
          password: hashedPassword,
          name: name,
        }
      })

      // 회원가입 성공 후 JWT 토큰 생성
      const token = jwt.sign(
          { userId: newUser.id, email: newUser.email },
          process.env.JWT_SECRET!,
          { expiresIn: '1h' }
      );

      // JWT 토큰을 HttpOnly 쿠키에 저장
      const isProduction = process.env.NODE_ENV === 'production';
      res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=3600; ${isProduction ? 'Secure' : ''}`);

      return res.status(201).json({ message: '회원가입이 성공적으로 완료되었습니다.', user: newUser });
    } catch(error) {
      console.error(error);
      return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    return res.status(405).json({ message: '허용되지 않는 요청 방식입니다.' });
  }
}
