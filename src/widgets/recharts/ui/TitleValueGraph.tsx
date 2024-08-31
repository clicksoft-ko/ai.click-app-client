import { TitleValueDetail } from "@/shared/dto/socket-io";
import { GraphDataType } from "../types";
import { LineChartBase } from ".";
import { IoClose } from "react-icons/io5";

export interface ItemWithDetails {
  [key: string]: any;
  details: TitleValueDetail[];
}

export interface TitleValueGraphProps<T extends ItemWithDetails> {
  xName: string;
  items: T[] | undefined;
  onClose?: () => void;
}

export function TitleValueGraph<T extends ItemWithDetails>({
  xName,
  items,
  onClose,
}: TitleValueGraphProps<T>) {
  if (!items || items.length === 0) return <></>;

  const data = items
    ?.reduce((acc: GraphDataType[], cur) => {
      const obj: GraphDataType = { xName: cur[xName] as string };
      cur.details.forEach((d) => {
        obj[d.title] = parseFloat(d.value);
      });

      acc.push(obj);

      return acc;
    }, [] satisfies GraphDataType[])
    .reverse();

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white">
      <LineChartBase data={data} />
      <button
        className="absolute right-1 top-1 p-2 text-gray-500"
        onClick={onClose}
      >
        <IoClose />
      </button>
    </div>
  );
}
