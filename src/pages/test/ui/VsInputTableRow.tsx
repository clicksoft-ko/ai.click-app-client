import { Row } from "@tanstack/react-table";
import { useState } from "react";
import { getCommonPinningStyles } from "../utils/get-common-pinning-styles";
import { EditInput } from "./EditInput";
import { Vs } from "@/shared/dto/socket-io";
import { CircleX } from "lucide-react";
import { useVsInputStore } from "@/shared/stores";

export const VsInputTableRow = ({ row }: { row: Row<Vs> }) => {
  const [focused, setFocused] = useState(false);
  const resetVsByRow = useVsInputStore((state) => state.resetVsByRow);

  return (
    <tr key={row.id}>
      {row.getVisibleCells().map((cell) => {
        const { column } = cell;

        return (
          <td
            key={cell.id}
            className={focused ? "!bg-blue-300" : ""}
            style={{ ...getCommonPinningStyles(column) }}
          >
            <div className="flex h-10 items-center justify-center">
              {column.id === "[Delete]" ? (
                <DeleteButton row={row} />
              ) : (
                <EditInput row={row} column={column} onFocus={setFocused} />
              )}
            </div>
          </td>
        );
      })}
    </tr>
  );
};

const DeleteButton = ({ row }: { row: Row<Vs> }) => {
  const resetVsByRow = useVsInputStore((state) => state.resetVsByRow);
  const removeVsByRow = useVsInputStore((state) => state.removeVsByRow);
  
  return (
    <div
      className="flex h-full w-full cursor-pointer items-center justify-center text-red-400 hover:text-red-600"
      onClick={() => {
        if (!row.original.auto) {
          resetVsByRow(row.index);
        } else {
          removeVsByRow(row.index);
        }
      }}
    >
      <CircleX className="h-5 w-5" />
    </div>
  );
};
