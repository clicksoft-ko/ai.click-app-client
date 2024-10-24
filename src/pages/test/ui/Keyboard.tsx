import { Delete } from "lucide-react";
interface KeyboardProps {
  onClick: (value: string) => void;
  onDelete: () => void;
  onNext: () => void;
  ref?: React.RefObject<HTMLDivElement | null>;
}

export const Keyboard: React.FC<KeyboardProps> = ({
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
      <div className="grid grid-cols-4 gap-2">
        {/* 숫자 및 연산 버튼 */}
        {[
          "7",
          "8",
          "9",
          "/",
          "4",
          "5",
          "6",
          "-",
          "1",
          "2",
          "3",
          "+",
          "0",
          ".",
        ].map((value) => (
          <button
            key={value}
            className="rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-xl font-semibold text-white shadow-md transition-all duration-200 hover:from-blue-600 hover:to-indigo-700"
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


