import { AccessorKeyColumnDef, ColumnDef, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Vs } from "../vs";

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
