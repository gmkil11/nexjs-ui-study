import * as z from "zod";

export const loginSchema = z.object({
  email: z
    .string({
      invalid_type_error: "이메일 형식을 확인해주세요",
    })
    .email({
      message: "이메일을 입력해주세요",
    }),
  password: z.string().min(1, {
    message: "비밀번호를 입력해주세요",
  }),
});

export const RegisterSchemaStepOne = z
  .object({
    email: z
      .string({
        invalid_type_error: "이메일 형식을 확인해주세요",
      })
      .email({
        message: "유효한 이메일을 입력해주세요",
      }),
    password: z.string().min(6, {
      message: "비밀번호는 최소 6자 이상이어야 합니다",
    }),
    confirmPassword: z.string().min(6, {
      message: "비밀번호 확인은 최소 6자 이상이어야 합니다",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["confirmPassword"], // 에러 메시지를 표시할 경로
  });

export const RegisterSchemaStepTwo = z.object({
  name: z.string().min(2, {
    message: "이름은 2자 이상이어야 합니다",
  }),
});
