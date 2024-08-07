import { Diagnosis } from "@/shared/dto/socket-io";
import { cn } from "@/shared/utils";
import { ObGrid, ObGridBody, ObGridHead } from "@/widgets/ob-grid";
import { TitleGroup } from "@/widgets/title-group";
import { Fragment } from "react";

interface Props {
  diagnosises: Diagnosis[] | undefined;
}

export function DiagnosisBox({ diagnosises }: Props) {
  if (!diagnosises || diagnosises.length === 0) return <></>;

  return (
    <TitleGroup title="상병내역">
      <ObGrid gridType="rx-diagnosis">
        <ObGridHead>코드</ObGridHead>
        <ObGridHead>명칭</ObGridHead>
        {diagnosises?.map((diag, i) => {
          return (
            <Fragment key={i}>
              <ObGridBody className={cn("flex items-center")}>
                {diag.code}
              </ObGridBody>
              <ObGridBody className={cn("text-left")}>{diag.name}</ObGridBody>
            </Fragment>
          );
        })}
      </ObGrid>
    </TitleGroup>
  );
}
