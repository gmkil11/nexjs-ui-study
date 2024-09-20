import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function CheckEmail(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: '이메일을 입력해주세요.' });
        }

        try {
            const existingUser = await prisma.user.findUnique({
                where: { email }
            });

            if (existingUser) {
                return res.status(409).json({ message: '이미 존재하는 이메일입니다.' });
            }

            return res.status(200).json({ message: '사용 가능한 이메일입니다.' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
        }
    } else {
        return res.status(405).json({ message: '허용되지 않는 요청 방식입니다.' });
    }
}
