import { useSaupInfo } from "@/shared/hooks";
import { useAccountStore } from "@/shared/stores/account.store";
import { useSearchStore } from "@/shared/stores/search.store";
import { FloatButton } from ".";

export const FloatSaupButton = () => {
  const { switchSaup, saup, isHanbang, isSingleSaup } = useChangeSaup();

  if (isSingleSaup) return null;
  return (
    <FloatButton
      icon={
        <div className="relative flex items-center gap-1">
          {isHanbang ? "한방" : "양방"}
          <span className="absolute -left-4 -top-4 rounded border border-blue-500 bg-white px-1 text-xs text-blue-500">
            {saup}
          </span>
        </div>
      }
      onClick={switchSaup}
      className="text-sm font-normal text-white"
    />
  );
};

const useChangeSaup = () => {
  const account = useAccountStore((state) => state.account);
  const setSelectedSaup = useSearchStore((state) => state.setSelectedSaup);
  const selectedSaup = useSearchStore((state) => state.selectedSaup);
  const { saup, isHanbang, isSingleSaup } = useSaupInfo();

  function switchSaup() {
    const maxIndex = (account?.hanbangSaups.length ?? 0) - 1;
    const index =
      account?.hanbangSaups.findIndex((v) => v.saup === selectedSaup) ?? -1;
    if (maxIndex === index) {
      setSelectedSaup("01");
    } else {
      setSelectedSaup(account?.hanbangSaups[index + 1].saup ?? "01");
    }
  }

  return {
    saup,
    isHanbang,
    isSingleSaup,
    switchSaup,
  };
};
