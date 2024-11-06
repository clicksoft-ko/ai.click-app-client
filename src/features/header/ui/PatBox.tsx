import { Patient } from "@/shared/dto/socket-io";
import { convertBirthToAge } from "@/shared/utils/converts";
import { formatYmdToShort } from "@/shared/utils/formats";
import { GenderIcon } from "@/widgets/ui";

interface Props {
  patient: Patient;
  onClick: () => void;
}
export const PatBox = ({ patient, onClick }: Props) => {
  return (
    <li
      className="flex border p-2 hover:cursor-pointer hover:bg-blue-50"
      onClick={onClick}
    >
      <div className="flex-1">
        <div className="flex gap-2">
          <div className="w-32 whitespace-nowrap">No. {patient.chartNo}</div>
          <div className="min-w-24 rounded border px-1 text-center">
            {patient.yuhyungName}
          </div>
          <div className="min-w-24 rounded border px-1 text-center">
            {patient.jinchalName}
          </div>
        </div>
        <div className="my-1 h-[1px] w-full bg-slate-300"></div>
        <div
          className="flex items-center gap-4"
          // style={{ gridTemplateColumns: "5rem 5rem 6rem" }}
        >
          <div className="flex min-w-24 flex-col">
            <div className="flex w-32 items-center text-left">
              <span className="min-w-16 font-bold">{patient.suName}</span>
              <GenderIcon className="mt-1" gender={patient.sex} />
            </div>
          </div>
          <div className="flex min-w-24 flex-col">
            <div className="flex flex-col items-center gap-1 text-left sm:flex-row">
              <span className="whitespace-nowrap">
                {formatYmdToShort(patient.birthday)}
              </span>
              <span>({convertBirthToAge(patient.birthday)}세)</span>
            </div>
          </div>
        </div>
      </div>
      {patient.ibYmd && (
        <>
          <div className="mx-2 w-[1px] bg-slate-300" />
          <div className="flex min-w-14 max-w-8 items-center justify-center sm:max-w-none">
            {patient.wardName}
          </div>
        </>
      )}
    </li>
  );
};
