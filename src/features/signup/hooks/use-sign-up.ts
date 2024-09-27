import { useAccount } from '@/features/common/hooks'
import { AccountArgs } from '@/features/common/types'
import { signUpAuth } from '../api';
import { useMutation } from '@tanstack/react-query';

interface UseSignInProps {
  onSuccess: () => void;
}

export const useSignUp = ({ onSuccess }: UseSignInProps) => {
  const { verify, validateError, error, isPending } = useAccount();
  const { mutate: signUpMutate, error: signUpError, isPending: isSignUpPending } = useMutation({
    mutationFn: signUpAuth,
    onSuccess: () => {
      onSuccess();
    }
  })

  async function signUp(dto: AccountArgs) {
    const verifyResult = await verify(dto);
    const { eClickUser, roomKey } = verifyResult || {};

    if (eClickUser) {
      signUpMutate({
        hsUserId: dto.hsUserId,
        csUserId: dto.csUserId,
        name: eClickUser.name,
        roomKey: roomKey!,
      });
    }
  }

  return {
    validateError,
    error: error || signUpError,
    isPending: isPending || isSignUpPending,
    signUp
  }
}

