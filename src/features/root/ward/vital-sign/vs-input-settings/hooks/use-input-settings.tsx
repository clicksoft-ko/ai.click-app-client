import { Vs } from "@/shared/dto/socket-io";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useVsWriteMenus } from "../../hooks";
import { vsMenuName } from "../../vs-table/consts";
import { VsMenuNameItem } from "../types";
import { useUpsertUserSettings } from "@/features/common/hooks";

export const useInputSettings = () => {
  const { vsWriteMenus, invalidate } = useVsWriteMenus();
  const [menuNames, setMenuNameList] = useState<VsMenuNameItem[]>([]);
  const { mutate: upsertUserMutate } = useUpsertUserSettings({
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
  }, []);

  return {
    handleSave,
    menuNames,
    setMenuNameList,
  };
};
