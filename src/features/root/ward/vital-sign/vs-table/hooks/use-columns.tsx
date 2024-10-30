import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import { columnSettings } from "../consts/column-settings";
import { vsMenuName } from "../consts/vs-menu-name";
import { Vs } from "@/shared/dto/socket-io";

const columnHelper = createColumnHelper<Vs>();

interface UseColumnsProps {
  viewMenus: (keyof Vs)[];
}

export const useColumns = ({ viewMenus }: UseColumnsProps) => {
  const columns = useMemo(() => {
    const columnDefinitions: Array<{
      accessor: keyof Vs;
      header: string;
      size?: number;
    }> = [
      { accessor: "[Delete]" as any, header: "", size: 40 },
      { accessor: "time", header: "시간", size: 80 },
      { accessor: "nurse", header: "담당간호사", size: 90 },
      ...viewMenus.map((menu) => ({
        accessor: menu,
        header: vsMenuName[menu]!,
        size: columnSettings[menu]!.size,
      })),
    ];

    return columnDefinitions.map((col) =>
      columnHelper.accessor(col.accessor, {
        header: col.header,
        cell: (info) => info.getValue(),
        size: col.size,
        footer: (info) => info.column.id,
      }),
    );
  }, [viewMenus]);

  return { columns };
};
