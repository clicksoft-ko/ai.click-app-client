import { useAccount } from '@/features/common/hooks'
import { AccountArgs } from '@/features/common/types'
import { setToken } from '@/shared/utils/cookies/token'
import { useMutation } from '@tanstack/react-query'
import { signInAuth } from '../api/sign-in-auth'
import { useAccountStore } from '@/shared/stores/account.store'
import { useSearchStore } from '@/shared/stores/search.store'
interface UseSignInProps {
  onSuccess: () => void;
}

export const useSignIn = ({ onSuccess }: UseSignInProps) => {
  const { verify, validateError, error, isPending } = useAccount();
  const setAccountInfo = useAccountStore((state) => state.setAccountInfo);
  const setSelectedSaup = useSearchStore((state) => state.setSelectedSaup);
  const { mutateAsync: signInMutate, error: signInError, isPending: isSignInPending } = useMutation({
    mutationFn: signInAuth,
  })

  async function signIn(dto: AccountArgs) {
    const { eClickUser, roomKey } = (await verify(dto)) || {};


    if (eClickUser) {
      const { accessToken } = await signInMutate({
        hsUserId: dto.hsUserId, csUserId: dto.csUserId, roomKey: roomKey!,
      });
      setAccountInfo(eClickUser);
      setSelectedSaup("01");
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
