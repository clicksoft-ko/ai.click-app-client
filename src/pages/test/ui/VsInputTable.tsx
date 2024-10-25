import { Vs } from "@/shared/dto/socket-io";
import { useVsInputStore } from "@/shared/stores";
import { flexRender } from "@tanstack/react-table";
import { useEffect } from "react";
import { viewMenus } from "../consts/view-menus";
import { useColumns } from "../hooks/use-columns";
import { useTable } from "../hooks/use-table";
import { getCommonPinningStyles } from "../utils/get-common-pinning-styles";
import styles from "./VsInputTable.module.css";
import { VsInputTableRow } from "./VsInputTableRow";

interface VsInputTableProps {
  originalVss: Vs[] | undefined;
}

export const VsInputTable = ({ originalVss }: VsInputTableProps) => {
  const vss = useVsInputStore((state) => state.vss);
  const setVss = useVsInputStore((state) => state.setVss);
  const { columns } = useColumns({ viewMenus });
  const { table } = useTable({ vss: vss ?? [], columns });

  useEffect(() => {
    setVss([new Vs(), ...(originalVss ?? [])]);
  }, [originalVss]);

  return (
    <div className="p-2">
      <div className="h-4" />
      <div className={styles.tableContainer}>
        <table
          style={{
            width: table.getTotalSize(),
          }}
        >
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const { column } = header;

                  // time과 nurse 컬럼을 순서대로 맨 좌측에 고정
                  if (column.id === "time" && !column.getIsPinned()) {
                    column.pin("left");
                  } else if (
                    column.id === "nurse" &&
                    !column.getIsPinned() &&
                    table.getState().columnPinning.left?.includes("time")
                  ) {
                    column.pin("left");
                  }

                  if (column.id === "[Delete]" && !column.getIsPinned()) {
                    column.pin("right");
                  }

                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      //IMPORTANT: This is where the magic happens!
                      style={{ ...getCommonPinningStyles(column) }}
                    >
                      <div className="px-1">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </div>
                      <div
                        {...{
                          onDoubleClick: () => header.column.resetSize(),
                          onMouseDown: header.getResizeHandler(),
                          onTouchStart: header.getResizeHandler(),
                          className: `resizer ${
                            header.column.getIsResizing() ? "isResizing" : ""
                          }`,
                        }}
                      />
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <VsInputTableRow key={row.id} row={row} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
