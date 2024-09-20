import type { NextApiRequest, NextApiResponse } from 'next'
import jwt, {JwtPayload} from "jsonwebtoken";
import {PrismaClient} from "@prisma/client";

export default async function getUserProfile(req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient();

  if (req.method === 'GET') {
    // GET, POST, PUT, PATCH, DELETE
    // res.status(200).json({ message: 'Hello from Next.js API!' });

    const token = req.cookies.token; // 쿠키에서 토큰 가져오기

    if (!token) {
      return res.status(401).json({message: "로그인 되지 않음"})
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);

      if (typeof decoded !== "string" && (decoded as JwtPayload).userId) {
        const userId = (decoded as JwtPayload).userId;

        // DB에서 사용자 정보 조회
        const user = await prisma.user.findUnique({
          where: {id: userId},
        });

        if (!user) {
          return res.status(404).json({message: "user not found"});
        }

        return res.status(200).json({user})
      } else {
        console.log("토큰에 userId가 포함되어 있지 않습니다")
      }

    } catch (error) {
      return res.status(401).json({message: 'Invalid token'});
    }
  } else {
    return res.status(404).json({ message: "method 방식이 잘못되었습니다"})
  }
}