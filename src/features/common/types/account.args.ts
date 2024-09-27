import { z } from "zod";

export interface AccountArgs {
  hsUserId: string;
  csUserId: string;
  password: string;
}

export const accountSchema = z.object({
  hsUserId: z.string().min(1, { message: "병원 아이디을 확인해주세요." }),
  csUserId: z.string().min(1, { message: "eClick 아이디를 입력해주세요." }),
  password: z.string().min(1, { message: "eClick 비밀번호를 입력해주세요." }),
})