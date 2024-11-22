import { usePatientStore } from "@/shared/stores";
import { IconButton } from "@/widgets/buttons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/widgets/ui";
import { DatePicker } from "@/widgets/ui/DatePicker";
import toast from "react-hot-toast";
import { FaSave, FaTrash } from "react-icons/fa";
import { CanvasKind } from "../../../../shared/types/canvas-type";

interface CanvasHeaderProps {
  date: Date;
  isPending: boolean;
  kind: CanvasKind;
  setDate: (date: Date) => void;
  onSave: () => void;
  onDelete: () => void;
  onClose: () => void;
  onKindChange: (kind: CanvasKind) => void;
}

export const CanvasHeader = ({
  date,
  isPending,
  kind,
  setDate,
  onSave,
  onDelete,
  onClose,
  onKindChange,
}: CanvasHeaderProps) => {
  const patient = usePatientStore((state) => state.patient);

  function handleSave(): void {
    if (!patient) {
      toast.error("환자 정보가 없습니다.");
      return;
    }

    onSave();
  }

  return (
    <div className="sticky top-0 z-50 mb-4 flex w-full items-center justify-between gap-4 rounded-lg bg-gray-50 p-2 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="w-20">
          <Select value={kind} onValueChange={onKindChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="진료">진료</SelectItem>
              <SelectItem value="병동">병동</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <DatePicker value={date} onChange={setDate} toDate={new Date()} />
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-700">수진자명:</span>
          <span className="text-gray-900">
            {patient?.suName}({patient?.chartNo})
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <IconButton
          isLoading={isPending}
          variant="blue"
          icon={<FaSave />}
          onClick={handleSave}
        >
          저장
        </IconButton>
        <IconButton
          isLoading={isPending}
          variant="red"
          icon={<FaTrash />}
          onClick={onDelete}
        >
          삭제
        </IconButton>
        <IconButton variant="gray" onClick={onClose}>
          ✕
        </IconButton>
      </div>
    </div>
  );
};
