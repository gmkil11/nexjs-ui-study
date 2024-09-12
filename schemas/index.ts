import * as z from "zod";

export const loginSchema = z.object({
    email: z.string({
        invalid_type_error: "이메일 형식을 확인해주세요"
    }).email({
        message:"이메일을 입력해주세요"
    }),
    password: z.string().min(1,{
        message: "비밀번호를 입력해주세요"
    }),
})