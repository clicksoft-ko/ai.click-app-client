import { ActionResult } from "@/shared/interfaces/action/action-result";
import { flattenZodError } from "@/shared/utils/error";
import z from "zod";
import { signUpAuth } from "../api";
import { VerifyState } from "../provider";
import { parseErrorMessage } from "@/shared/utils/error";

export const signUpSchema = z
  .object({
    email: z.string().email({ message: "이메일 주소를 확인해주세요." }),
    password: z.string().min(1, { message: "비밀번호를 입력하세요." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"], // 해당 오류가 나타날 경로
  });

type SignUpSchema = z.infer<typeof signUpSchema>;

export async function signUpFormAction(
  state: VerifyState,
  _: any,
  formData: FormData,
): Promise<ActionResult<Partial<SignUpSchema>>> {
  const data = Object.fromEntries(formData.entries());
  const result = signUpSchema.safeParse(data);
  if (result.error) {
    const errors = flattenZodError(result.error);

    return { error: errors };
  }

  try {
    await signUpAuth({
      csUserId: state.csUserId!,
      hsUserId: state.hsUserId!,
      name: state.name!,
      ...result.data,
    });
  } catch (ex) {
    return { error: { _form: parseErrorMessage(ex) } };
  }

  return { success: true };
}
