import { Row } from "@tanstack/react-table";
import { useState } from "react";
import { getCommonPinningStyles } from "../utils/get-common-pinning-styles";
import { EditInput } from "./EditInput";
import { Vs } from "../vs";

export const VsInputTableRow = ({ row }: { row: Row<Vs> }) => {
  const [focused, setFocused] = useState(false);

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
              <EditInput row={row} column={column} onFocus={setFocused} />
            </div>
          </td>
        );
      })}
    </tr>
  );
};
