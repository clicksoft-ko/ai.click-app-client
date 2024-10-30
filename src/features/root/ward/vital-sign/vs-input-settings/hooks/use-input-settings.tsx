import { UserSettingsDto } from "@/shared/dto";
import { useAuth } from "@/shared/hooks/auth";
import { useMutation } from "@tanstack/react-query";
import { useVsWriteMenus } from "../../hooks";
import { upsertUserSettings } from "../api";
import { useEffect, useState } from "react";
import { VsMenuNameItem } from "../types";
import { vsMenuName } from "../../vs-table/consts";
import { Vs } from "@/shared/dto/socket-io";
import { toast } from "react-hot-toast";

export const useInputSettings = () => {
  const { user } = useAuth();
  const { vsWriteMenus, invalidate } = useVsWriteMenus();
  const [menuNames, setMenuNameList] = useState<VsMenuNameItem[]>([]);

  const { mutate: upsertUserMutate } = useMutation({
    mutationFn: ({ dto }: { dto: UserSettingsDto }) =>
      upsertUserSettings({ userId: user?.id ?? "", dto }),
    onSuccess: () => {
      toast.success("저장되었습니다.");
      invalidate();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function handleSave(): void {
    upsertUserMutate({
      dto: {
        vsWriteMenus: menuNames.map((menu, index) => ({
          key: menu.id,
          order: index + 1,
        })),
      },
    });
  }

  useEffect(() => {
    const menuItems: VsMenuNameItem[] = vsWriteMenus.map((menu) => ({
      id: menu.key,
      text: vsMenuName[menu.key as keyof Vs]!,
    }));
    setMenuNameList(menuItems);
  }, [vsWriteMenus]);

  return {
    handleSave,
    menuNames,
    setMenuNameList,
  };
};
