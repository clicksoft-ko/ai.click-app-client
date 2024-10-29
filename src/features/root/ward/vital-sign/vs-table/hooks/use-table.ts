import { Vs } from "@/shared/dto/socket-io";
import { AccessorKeyColumnDef, getCoreRowModel, useReactTable } from "@tanstack/react-table";
interface UseTableProps {
  vss: Vs[];
  columns: AccessorKeyColumnDef<Vs, string | number>[];
}

export const useTable = ({ vss, columns }: UseTableProps) => {
  const table = useReactTable({
    data: vss,
    columns,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
    columnResizeMode: "onChange",
  });

  return { table }
};
