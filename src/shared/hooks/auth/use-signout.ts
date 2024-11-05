import { paths } from "@/shared/paths";
import { removeToken } from "@/shared/utils/cookies";
import { useAccountStore } from "@/shared/stores/account.store";
import { usePatientStore } from "@/shared/stores";

export const useSignOut = () => {
  const clearAccount = useAccountStore((state) => state.clear);
  const clearPatient = usePatientStore((state) => state.clear);

  function signOut() {
    clearAccount();
    clearPatient();
    removeToken();
    window.location.href = paths.signIn;
  }

  return { signOut };
}