import { MedicalNote } from "@/shared/dto/socket-io";
import { cn } from "@/shared/utils";
import { ObGrid, ObGridBody, ObGridHead } from "@/widgets/ob-grid";
import { TitleGroup } from "@/widgets/title-group";
import { Fragment } from "react";

interface Props {
  medicalNotes: MedicalNote[] | undefined;
}

export function MedicalNotesBox({ medicalNotes }: Props) {
  if (!medicalNotes || medicalNotes.length === 0) return <></>;

  return (
    <TitleGroup title="참고사항">
      <ObGrid gridType="rx-diagnosis">
        <ObGridHead>코드</ObGridHead>
        <ObGridHead>명칭</ObGridHead>
        {medicalNotes?.map((mediNote, i) => {
          return (
            <Fragment key={i}>
              <ObGridBody className={cn("flex items-center")}>
                {mediNote.code}
              </ObGridBody>
              <ObGridBody className={cn("text-left")}>
                {mediNote.name}
              </ObGridBody>
            </Fragment>
          );
        })}
      </ObGrid>
    </TitleGroup>
  );
}
