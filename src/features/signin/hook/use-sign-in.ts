import { flattenZodError } from '@/shared/utils/error'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { z } from "zod"
import { signInAuth } from '../api/sign-in-auth'
import { SignInAuthDto } from '../dto'
import { setToken } from '@/shared/utils/cookies/token'

const signInSchema = z.object({
  email: z.string().email({ message: "이메일을 확인해주세요." }),
  password: z.string().min(1, { message: "비밀번호를 입력해주세요." }),
})

export const useSignIn = () => {
  const { data, mutate, error, isPending, isSuccess } = useMutation({
    mutationFn: signInAuth,
  })
  const [validateError, setValidateError] = useState<SignInAuthDto>();

  function signIn(dto: SignInAuthDto) {
    const result = signInSchema.safeParse(dto);
    if (result.error) {
      const error = flattenZodError<SignInAuthDto>(result.error);
      return setValidateError(error);
    }

    mutate(dto);
  }

  useEffect(() => {
    if (data) {
      setToken(data.accessToken);
    }
  }, [isSuccess])
  return { validateError, error, isPending, isSuccess, signIn }
}
