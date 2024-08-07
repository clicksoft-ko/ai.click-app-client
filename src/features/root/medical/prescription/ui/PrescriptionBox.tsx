import { Prescription } from "@/shared/dto/socket-io";
import { SearchDataBox } from "@/widgets/search-data";
import { DiagnosisBox, MedicalNotesBox, OrderBox } from ".";

interface Props {
  prescription: Prescription;
}

export function PrescriptionBox({ prescription }: Props) {
  return (
    <SearchDataBox
      className="w-full"
      contents={prescription.headers}
      childrenClassName="flex flex-col gap-4"
    >
      <div className="flex h-fit flex-col gap-4">
        <DiagnosisBox diagnosises={prescription.diagnosises} />
        <OrderBox orders={prescription.orders} />
        <MedicalNotesBox medicalNotes={prescription.medicalNotes} />
      </div>
    </SearchDataBox>
  );
}
