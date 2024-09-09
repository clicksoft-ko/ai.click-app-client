import { Insulin, InsulinDetail } from "@/shared/dto/socket-io";
import { Badge } from "@/widgets/ui";
import { Timer } from "lucide-react";
import React from "react";
import { InsulinPartDialog } from "./InsulinPartDialog";

interface Props {
  insulin: Insulin;
  detail: InsulinDetail;
}

const InsulinBox = ({ insulin, detail }: Props) => {
  return (
    <div className="flex items-center border-b border-green-200 p-2">
      <div className="mr-2 flex flex-col items-center font-bold">
        <Timer className="text-amber-600" />
        <span>{detail.timeText}</span>
      </div>

      <div className="flex w-full flex-col gap-2 border-l pl-2">
        <div className="flex gap-2">
          <DataBox title="코드" text={detail.code} />
          <DataBox title="명칭" text={detail.name} />
        </div>
        <div className="h-[1px] w-full bg-slate-200"></div>
        <div className="flex gap-2">
          <DataBox title="Blood" text={detail.blood} />
          <DataBox title="Urine" text={detail.urine} />

          <DataBox title="용량" text={detail.volume} />
          <DataBox
            title="부위"
            text={
              <InsulinPartDialog
                header={
                  <>
                    <div className="text-xl font-bold">인슐린 위치 조회</div>
                    <div className="text-slate-500">{`${insulin.writeDateShortText} ${detail.timeText}`}</div>
                  </>
                }
                part={detail.part}
                trigger={
                  <Badge className="font-bold hover:cursor-pointer">
                    {detail.part}
                  </Badge>
                }
              />
            }
          />
          <DataBox title="메모" text={detail.memo} />
        </div>
      </div>
    </div>
  );
};

function DataBox({ title, text }: { title: string; text: React.ReactNode }) {
  return (
    <div className="flex min-w-12 flex-col overflow-hidden">
      <div className="text-xs font-semibold text-slate-400">{title}</div>
      <div title={text?.toString()}>{text}</div>
    </div>
  );
}

export default InsulinBox;
