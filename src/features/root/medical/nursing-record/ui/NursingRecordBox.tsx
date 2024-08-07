import { useSearchString } from "@/features/root/hooks";
import { NursingRecord } from "@/shared/dto/socket-io";
import { cn } from "@/shared/utils";
import { HighlighterX } from "@/widgets/highlighter-x";
import { SearchDataBox } from "@/widgets/search-data";

interface Props {
  nursingRecord: NursingRecord;
}

export function NursingRecordBox({ nursingRecord }: Props) {
  const detailComponents = nursingRecord.details.map((d, i) => (
    <Content
      key={`${d.title}${i}`}
      title={d.title}
      detail={d.detail}
      noBorder={i === nursingRecord.details.length - 1}
    />
  ));

  return (
    <SearchDataBox
      childrenClassName="p-0"
      contents={[
        { title: "작성일자", text: nursingRecord.writeDateFullText },
        { title: "담당자", text: nursingRecord.nurseName },
      ]}
    >
      <div
        className={cn(
          "justify-stretch whitespace-pre-wrap bg-white",
          "sm:flex",
        )}
      >
        {detailComponents}
      </div>
    </SearchDataBox>
  );
}

interface ContentProps {
  title: string;
  detail: string;
  noBorder?: boolean;
}

function Content({ title, detail, noBorder }: ContentProps) {
  const { searchString } = useSearchString();

  return (
    <div
      className={cn(
        "flex-1",
        "sm:border-e-primary-sm",
        noBorder ? "" : "sm:border",
      )}
    >
      <div className="bg-green-200 p-2 py-1 font-semibold text-slate-700">
        {title}
      </div>
      <div className="p-2">
        <HighlighterX searchString={searchString} textToHighlight={detail} />
      </div>
    </div>
  );
}
