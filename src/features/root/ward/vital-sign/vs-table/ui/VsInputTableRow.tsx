import { Vs } from "@/shared/dto/socket-io";
import { useVsInputStore } from "@/shared/stores";
import { cn } from "@/shared/utils";
import { Button } from "@/widgets/ui";
import { Row } from "@tanstack/react-table";
import { useState } from "react";
import { EditInput } from "./EditInput";
import { useEmitWithAck } from "@/shared/hooks/socket-io";
import toast from "react-hot-toast";
import { getCommonPinningStyles } from "@/pages/test/utils/get-common-pinning-styles";
import { useVsWriterContext } from "../hooks";

interface VsInputTableRowProps {
  row: Row<Vs>;
  onRowDelete: () => void;
}

export const VsInputTableRow = ({ row, onRowDelete }: VsInputTableRowProps) => {
  const [focused, setFocused] = useState(false);

  return (
    <tr key={row.id}>
      {row.getVisibleCells().map((cell) => {
        const { column } = cell;

        return (
          <td
            key={cell.id}
            className={cn(focused ? "!bg-blue-300" : "", "")}
            style={{ ...getCommonPinningStyles(column) }}
          >
            <div className="flex h-10 items-center justify-center">
              {column.id === "[Delete]" ? (
                <DeleteButton row={row} onRowDelete={onRowDelete} />
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

const DeleteButton = ({
  row,
  onRowDelete,
}: {
  row: Row<Vs>;
  onRowDelete: () => void;
}) => {
  const resetVsByRow = useVsInputStore((state) => state.resetVsByRow);
  const removeVsByRow = useVsInputStore((state) => state.removeVsByRow);
  const { isPending, setIsPending } = useVsWriterContext();
  const { emit } = useEmitWithAck("deleteVs", {
    onPending: setIsPending,
    onSuccess: () => {
      toast.success("삭제되었습니다.");
      removeVsByRow(row.index);
      onRowDelete();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <div
      className="flex h-fit w-full cursor-pointer flex-col items-center justify-center text-red-400 hover:text-red-600"
      onClick={() => {
        if (!row.original.auto) {
          resetVsByRow(row.index);
        } else {
          if (confirm("해당 줄을 삭제하시겠습니까?")) {
            emit({
              key: "20240808-a288be52",
              chartNo: "00017128",
              vsAuto: row.original.auto,
            });
          }
        }
      }}
    >
      <Button
        variant="outline"
        className="flex h-8 w-6 items-center justify-center rounded-full"
        disabled={isPending}
      >
        X
      </Button>
    </div>
  );
};
