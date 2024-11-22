import { TnoteHistory } from "@/shared/dto/socket-io/tnote/get-tnote-histories.dto";
import { useEmitWithAck } from "@/shared/hooks/socket-io";
import { usePatientStore } from "@/shared/stores";
import { cn } from "@/shared/utils";
import { format, parseISO } from "date-fns";
import { useEffect, useImperativeHandle } from "react";

interface NoteHistorysProps {
  onSelect: (tnoteHistory: TnoteHistory) => void;
  onLoad?: () => void;
  ref: React.RefObject<NoteHistorysRef | null>;
}

export interface NoteHistorysRef {
  reload: () => void;
}

export const NoteHistorys = ({ onSelect, onLoad, ref }: NoteHistorysProps) => {
  const patient = usePatientStore((state) => state.patient);
  const { data, emit } = useEmitWithAck("getTnoteHistories");

  const reload = () => {
    if (patient) {
      emit({ chartNo: patient.chartNo }).then(() => {
        onLoad?.();
      });
    }
  };

  useEffect(() => {
    reload();
  }, [patient]);

  useImperativeHandle(ref, () => ({
    reload,
  }));

  return (
    <div className="h-full px-2">
      <div
        className={cn(
          "flex max-h-64 flex-col gap-2 overflow-hidden border border-gray-200 p-2",
          "xl:max-h-[800px]",
        )}
      >
        <div className="text-lg font-medium text-gray-700">히스토리</div>
        <div className="grid grid-cols-3 gap-2 overflow-auto px-4 xl:grid-cols-1">
          {data?.histories && data.histories.length > 0 ? (
            data.histories.map((item) => (
              <div
                key={item.tnoteId}
                onClick={() => onSelect(item)}
                className="flex cursor-pointer items-center justify-between rounded-md border border-gray-200 p-2 hover:border-gray-400 hover:bg-gray-100 hover:shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-600">{item.kind}</span>
                  <span className="text-sm text-gray-500">
                    {format(parseISO(item.ymd), "yyyy.MM.dd")}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center text-gray-500">
              히스토리가 없습니다
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
