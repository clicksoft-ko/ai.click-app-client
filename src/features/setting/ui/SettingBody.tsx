import { useUpsertUserSettings } from "@/features/common/hooks";
import { useFetchUserSettings } from "@/features/common/hooks/use-fetch-user-settings";
import { Checkbox } from "@/widgets/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import toast from "react-hot-toast";

const SettingBody = () => {
  const { data, isPending: isFetchPending, refetch } = useFetchUserSettings();
  const { mutate: upsertUserMutate, isPending } = useUpsertUserSettings({
    onError: (error) => toast.error(error.message),
    onSuccess: refetch,
  });

  function handleChangeIbDates(checked: CheckedState): void {
    upsertUserMutate({
      dto: {
        changeSearchDateToIbwonDate: checked as boolean,
      },
    });
  }

  return (
    <div className="p-4">
      <label className="flex items-center gap-2">
        <Checkbox
          title="알림받기"
          checked={data?.changeSearchDateToIbwonDate}
          onCheckedChange={handleChangeIbDates}
          disabled={isPending || isFetchPending}
        />
        입원환자 `조회기간 ➡️ 입원기간` 변경
      </label>
    </div>
  );
};

export { SettingBody };
