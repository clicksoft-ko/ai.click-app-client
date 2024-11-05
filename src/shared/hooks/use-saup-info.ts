import { useMemo } from "react";
import { useSearchStore } from "../stores/search.store";
import { useAccountStore } from "../stores/account.store";

export const useSaupInfo = () => {
  const account = useAccountStore((state) => state.account);
  const selectedSaup = useSearchStore((state) => state.selectedSaup);
  const hanbangSaup = useMemo(() => {
    return account?.hanbangSaups.find(({ saup }) => saup === selectedSaup);
  }, [account?.hanbangSaups, selectedSaup]);
  const isSingleSaup = useMemo(() => {
    return account?.hanbangSaups.length === 1;
  }, [account?.hanbangSaups]);

  return {
    saup: hanbangSaup?.saup ?? "01",
    isHanbang: hanbangSaup?.isHanbang,
    isSingleSaup,
  };
};