import { WardPatient } from "@/shared/dto/socket-io";
import { useEmitWithAck } from "@/shared/hooks/socket-io";
import { Loading } from "@/widgets/loadings";
import toast from "react-hot-toast";
import { useSelectPatient } from "../../contexts";

export interface PatientRowProps extends WardPatient {}

const PatientRow = ({
  bed,
  name,
  gender,
  age,
  chart,
  pcpName,
}: PatientRowProps) => {
  const { loadPatient } = useSelectPatient();
  const {
    data: patientData,
    isPending: patientIsPending,
    emit: emitPatient,
  } = useEmitWithAck("getPatient", {
    onSuccess: loadPatient,
    onError: ({ message }) => {
      toast.error(message);
    },
  });

  console.log(patientData);

  return (
    <>
      <div
        className="flex items-center gap-1 rounded-lg bg-gray-50 py-1.5 hover:bg-gray-100"
        onClick={() => emitPatient({ chartNo: chart })}
      >
        <div className="w-8 text-center font-medium text-blue-600">{bed}</div>
        <div className="w-20 text-center">{name}</div>
        <div className="w-12 text-center">{gender}</div>
        <div className="w-12 text-center">{age}세</div>
        <div className="w-20 text-center">{pcpName}</div>
      </div>
      {patientIsPending && <Loading />}
    </>
  );
};

export default PatientRow;
