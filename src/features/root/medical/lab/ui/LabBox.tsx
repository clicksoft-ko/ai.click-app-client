import { Lab } from "@/shared/dto/socket-io";
import { cn } from "@/shared/utils";
import { SearchDataBox } from "@/widgets/search-data";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { Fragment } from "react/jsx-runtime";

interface LabBoxProps {
  lab: Lab;
}
export const LabBox = ({ lab }: LabBoxProps) => {
  return (
    <SearchDataBox
      className="w-fit"
      contents={lab.headers.map((header) => ({
        title: header.title,
        text: header.text,
      }))}
    >
      <ChamgoNote chamgo={lab.chamgo} />
      <div
        className="grid gap-[1px] bg-slate-200 p-[1px]"
        style={{
          gridTemplateColumns:
            "7rem minmax(8rem, 15rem) minmax(8rem, 15rem) minmax(6rem, 50rem) 5rem 10rem minmax(3.5rem, 5rem)",
        }}
      >
        <GridHeader>코드</GridHeader>
        <GridHeader>명칭</GridHeader>
        <GridHeader>검사명</GridHeader>
        <GridHeader>결과치</GridHeader>
        <GridHeader>단위</GridHeader>
        <GridHeader>정상범위</GridHeader>
        <div className="bg-slate-100 text-center font-bold">검사일</div>
        {lab.labDetails.map((detail, idx) => {
          const prevDetail = lab.labDetails[idx - 1] || {};
          const isSameCode = detail.code === prevDetail.code;
          return (
            <Fragment key={detail.id}>
              <GridCell className={cn(isSameCode ? "text-slate-400" : "")}>
                {detail.code}
              </GridCell>
              <GridCell
                className={cn(
                  "whitespace-nowrap",
                  isSameCode ? "text-slate-400" : "",
                )}
              >
                {detail.myung}
              </GridCell>
              <GridCell>{detail.labMyung}</GridCell>
              <GridCell
                className={cn(
                  detail.upDown > 0
                    ? "text-blue-500"
                    : detail.upDown < 0
                      ? "text-red-500"
                      : "",
                )}
              >
                {detail.value}
                <UpOrDownIndicator upDown={detail.upDown} />
              </GridCell>
              <GridCell>{detail.danwi}</GridCell>
              <GridCell className="whitespace-nowrap text-sm">
                {detail.normalRange}
              </GridCell>
              <GridCell className="justify-center">
                {`${detail.labYmd.substring(4, 6)}/${detail.labYmd.substring(6, 8)}`}
              </GridCell>
            </Fragment>
          );
        })}
      </div>
    </SearchDataBox>
  );
};

const UpOrDownIndicator = ({ upDown }: { upDown: number }) => {
  if (!upDown) return null;

  return (
    <span className="mr-1">
      {upDown > 0 ? (
        <FaCaretUp className="text-2xl" />
      ) : (
        <FaCaretDown className="text-2xl" />
      )}
    </span>
  );
};

const GridHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-slate-100 text-center font-bold">{children}</div>
);

const GridCell = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`flex items-center bg-white p-1 overflow-auto ${className}`}
  >
    {children}
  </div>
);

const ChamgoNote = ({ chamgo }: { chamgo: string }) => {
  if (!chamgo) return null;

  return (
    <div className="flex gap-2 border-b border-gray-200 pb-2 text-sm text-gray-500">
      <span className="font-bold">참고사항:</span>
      <span className="whitespace-normal break-words">{chamgo}</span>
    </div>
  );
};
