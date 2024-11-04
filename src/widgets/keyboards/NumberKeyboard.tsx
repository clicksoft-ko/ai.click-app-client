import { Delete } from "lucide-react";
interface NumberKeyboardProps {
  onClick: (value: string) => void;
  onDelete: () => void;
  onNext: () => void;
  ref?: React.RefObject<HTMLDivElement | null>;
}

export const NumberKeyboard: React.FC<NumberKeyboardProps> = ({
  onClick,
  onDelete,
  onNext,
  ref,
}) => {
  return (
    <div
      ref={ref}
      className="grid gap-2 bg-gradient-to-b from-slate-100 to-slate-200 p-4"
    >
      {/* 첫 번째 그리드: 숫자 키패드 */}
      <div className="grid grid-cols-6 gap-2">
        {/* 숫자 및 연산 버튼 */}
        {[
          "7",
          "8",
          "9",
          "4",
          "5",
          "6",
          "1",
          "2",
          "3",
          "0",
          ".",
        ].map((value) => (
          <button
            key={value}
            className="rounded-lg shadow bg-gradient-to-r col-span-2 from-white to-slate-100 p-4 text-xl font-semibold text-slate-800 transition-all duration-200 hover:from-slate-300 hover:to-slate-400"
            onClick={() => onClick(value)}
          >
            {value}
          </button>
        ))}
        <button
          className="flex-center rounded-lg bg-gradient-to-r from-red-500 to-red-600 p-4 text-xl font-semibold text-white shadow-md transition-all duration-200 hover:from-red-600 hover:to-red-700"
          onClick={onDelete}
        >
          <Delete />
        </button>
        <button
          className="rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 p-4 text-xl font-semibold text-white shadow-md transition-all duration-200 hover:from-green-600 hover:to-emerald-700"
          onClick={onNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};


