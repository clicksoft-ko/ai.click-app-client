import { WardPatient } from "@/shared/dto/socket-io";
import { Card, CardContent, CardHeader, CardTitle } from "@/widgets/ui";
import PatientRow from "./PatientRow";

interface RoomCardProps {
  name: string;
  patients: WardPatient[];
}

const RoomCard = ({ name, patients }: RoomCardProps) => {
  return (
    <Card>
      <CardHeader className="px-3 pb-2 pt-3">
        <CardTitle className="text-lg">{name}</CardTitle>
      </CardHeader>
      <CardContent className="px-3 pb-3">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1 border-b pb-1.5 font-medium text-gray-600">
            <div className="w-8 text-center">Bed</div>
            <div className="w-20 text-center">이름</div>
            <div className="w-12 text-center">성별</div>
            <div className="w-12 text-center">나이</div>
            <div className="w-20 text-center">주치의</div>
          </div>
          <div className="flex flex-col gap-2">
            {patients.map((patient) => (
              <PatientRow key={patient.bed} {...patient} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoomCard;
