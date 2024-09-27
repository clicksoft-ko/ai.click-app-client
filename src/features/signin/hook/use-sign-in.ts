import { useAccount } from '@/features/common/hooks'
import { AccountArgs } from '@/features/common/types'
import { setToken } from '@/shared/utils/cookies/token'
import { useMutation } from '@tanstack/react-query'
import { signInAuth } from '../api/sign-in-auth'
interface UseSignInProps {
  onSuccess: () => void;
}

export const useSignIn = ({ onSuccess }: UseSignInProps) => {
  const { verify, validateError, error, isPending } = useAccount();
  const { mutateAsync: signInMutate, error: signInError, isPending: isSignInPending } = useMutation({
    mutationFn: signInAuth,
  })

  async function signIn(dto: AccountArgs) {
    const { eClickUser, roomKey } = (await verify(dto)) || {};

    if (eClickUser) {
      const { accessToken } = await signInMutate({
        hsUserId: dto.hsUserId, csUserId: dto.csUserId, roomKey: roomKey!,
      });
      setToken(accessToken);
      onSuccess();
    }
  }

  return {
    validateError,
    error: error || signInError,
    isPending: isPending || isSignInPending,
    signIn
  }
} 
