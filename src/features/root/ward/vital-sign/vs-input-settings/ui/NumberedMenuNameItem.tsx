import { VsMenuNameItem } from "../types";

interface NumberedMenuNameItemProps {
  item: VsMenuNameItem;
  index: number;
}

export const NumberedMenuNameItem = ({ item, index }: NumberedMenuNameItemProps) => {
  return (
    <div className="relative flex h-20 min-w-24 cursor-move items-center justify-between overflow-hidden whitespace-nowrap rounded border bg-gray-50 p-3 hover:bg-gray-100">
      <div className="flex flex-col items-center gap-2">
        {index !== undefined && (
          <div className="absolute left-1 top-0.5 rounded-sm px-1.5 py-0.5 text-xs font-medium text-gray-400">
            #{index + 1}
          </div>
        )}
        <span>{item.text}</span>
      </div>
    </div>
  );
};
