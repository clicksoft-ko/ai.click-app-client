import { fetchRoomKey } from '@/features/signup/api'
import { useEmitWithAck } from '@/shared/hooks/socket-io'
import { flattenZodError } from '@/shared/utils/error'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { AccountArgs, accountSchema } from '../types'

export const useAccount = () => {
  const [error, setError] = useState<Error>();
  const { isPending: isSockSignInPending, error: sockSignInError, emit: sockSignInEmit } = useEmitWithAck("winAccountVerification");
  const { mutateAsync: fetchRoomKeyMutate, error: fetchRoomKeyError, isPending: isFetchRoomKeyPending } = useMutation({
    mutationFn: fetchRoomKey,
  });
  const [validateError, setValidateError] = useState<AccountArgs>();

  async function verify(dto: AccountArgs) {
    setError(undefined);
    setValidateError(undefined);

    const result = accountSchema.safeParse(dto);
    if (result.error) {
      const error = flattenZodError<AccountArgs>(result.error);
      setValidateError(error);
      return;
    }

    try {
      const { roomKey } = await fetchRoomKeyMutate({ hsUserId: dto.hsUserId });
      if (!roomKey) {
        throw new Error("병원 아이디가 존재하지 않습니다.");
      }
      const eClickUser = await sockSignInEmit({ userId: dto.csUserId, password: dto.password, key: roomKey });
      return {
        eClickUser,
        roomKey,
      }
    } catch (ex) {
      if (ex instanceof Error) {
        setError(ex as Error);
      }
    }
  }

  return {
    validateError,
    error: sockSignInError || fetchRoomKeyError || error,
    isPending: isSockSignInPending || isFetchRoomKeyPending,
    verify,
  }
}

