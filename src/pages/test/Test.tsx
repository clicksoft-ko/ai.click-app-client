import { useVsInputStore } from "@/shared/stores";
import {
  Column,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  Row,
  useReactTable,
} from "@tanstack/react-table";
import { CSSProperties, useEffect, useMemo, useState } from "react";
import { EditInput } from "./ui/EditInput";
import "./test.css";
import { vss as originalVss, Vs } from "./vs";
import { viewMenus } from "./consts/view-menus";
import { vsMenuName } from "./consts/vs-menu-name";

const columnHelper = createColumnHelper<Vs>();

const menus: Partial<Record<keyof Vs, { size: number }>> = {
  hulap1: { size: 90 },
  hulap2: { size: 90 },
  maekbak: { size: 90 },
  cheon: { size: 90 },
  hohup: { size: 90 },
  weight: { size: 90 },
  height: { size: 90 },
  bmi: { size: 90 },
  intake: { size: 90 },
  urine: { size: 90 },
  stools: { size: 90 },
  fluids: { size: 90 },
  blood: { size: 90 },
  aspiration: { size: 90 },
  drainage: { size: 90 },
  vomitus: { size: 90 },
  username: { size: 90 },
  glucose: { size: 90 },
  spo2: { size: 90 },
  etc1: { size: 90 },
  etc2: { size: 90 },
  etc3: { size: 90 },
  etc4: { size: 90 },
  etc5: { size: 90 },
};

export const TestPage = () => {
  const columns = useMemo(() => {
    const columnDefinitions: Array<{
      accessor: keyof Vs;
      header: string;
      size?: number;
    }> = [
      { accessor: "time", header: "시간", size: 80 },
      { accessor: "nurse", header: "담당간호사", size: 90 },
      ...viewMenus.map((menu) => ({
        accessor: menu,
        header: vsMenuName[menu]!,
        size: menus[menu]!.size,
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
  }, []);

  const vss = useVsInputStore((state) => state.vss);
  const setVss = useVsInputStore((state) => state.setVss);
  const table = useReactTable({
    data: vss,
    columns,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
    columnResizeMode: "onChange",
  });

  useEffect(() => {
    setVss([new Vs(), ...originalVss]);
  }, [originalVss]);
  return (
    <div className="p-2">
      <div className="h-4" />
      <div className="table-container">
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
              <IOSheetRow key={row.id} row={row} />
            ))}
          </tbody>
        </table>
      </div>
      <pre>{JSON.stringify(table.getState().columnPinning, null, 2)}</pre>
    </div>
  );
};

const IOSheetRow = ({ row }: { row: Row<Vs> }) => {
  const [focused, setFocused] = useState(false);

  return (
    <tr key={row.id}>
      {row.getVisibleCells().map((cell) => {
        const { column } = cell;
        return (
          <td
            key={cell.id}
            className={focused ? "!bg-neutral-300" : ""}
            style={{ ...getCommonPinningStyles(column) }}
          >
            <div className="flex h-10 items-center justify-center">
              <EditInput row={row} column={column} onFocus={setFocused} />
            </div>
          </td>
        );
      })}
    </tr>
  );
};

const getCommonPinningStyles = (column: Column<Vs>): CSSProperties => {
  const isPinned = column.getIsPinned();
  const isLastLeftPinnedColumn =
    isPinned === "left" && column.getIsLastColumn("left");
  const isFirstRightPinnedColumn =
    isPinned === "right" && column.getIsFirstColumn("right");

  return {
    boxShadow: isLastLeftPinnedColumn
      ? "-4px 0 4px -4px gray inset"
      : isFirstRightPinnedColumn
        ? "4px 0 4px -4px gray inset"
        : undefined,
    left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
    right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
    opacity: isPinned ? 0.95 : 1,
    position: isPinned ? "sticky" : "relative",
    width: column.getSize(),
    zIndex: isPinned ? 1 : 0,
  };
};
