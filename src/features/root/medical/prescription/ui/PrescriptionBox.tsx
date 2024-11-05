import { Prescription } from "@/shared/dto/socket-io";
import { SearchDataBox } from "@/widgets/search-data";
import { DiagnosisBox, MedicalNotesBox } from ".";
import { lazy, Suspense } from "react";

const OrderBox = lazy(() => import("./OrderBox"));

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
        <Suspense fallback={<div>Loading...</div>}>
          <OrderBox
            orders={prescription.orders}
            isHanbang={prescription.isHanbang}
          />
        </Suspense>
        <MedicalNotesBox medicalNotes={prescription.medicalNotes} />
      </div>
    </SearchDataBox>
  );
}
