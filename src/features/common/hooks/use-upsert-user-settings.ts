import { upsertUserSettings } from "@/features/root/ward/vital-sign/vs-input-settings/api";
import { UserSettingsDto } from "@/shared/dto";
import { useAuth } from "@/shared/hooks/auth";
import { useMutation } from "@tanstack/react-query";

interface UpsertUserSettingsDtoArgs {
  onSuccess?: () => void;
  onError: (error: any) => void;
}
export const useUpsertUserSettings = ({
  onSuccess,
  onError,
}: UpsertUserSettingsDtoArgs) => {
  const { user } = useAuth();
  return useMutation({
    mutationFn: ({ dto }: { dto: UserSettingsDto }) =>
      upsertUserSettings({ userId: user?.id ?? "", dto }),
    onSuccess,
    onError,
  });
};
