import {
  FaPlus,
  FaMinusCircle,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { cn } from "@/shared/utils";
import { CommonButton } from "./CommonButton";
import { ClassNameProps } from "@/shared/interfaces/props";

interface PageControllerProps extends ClassNameProps {
  currentPage: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
  onAddPage: () => void;
  onDeletePage: () => void;
}

export const PageController = ({
  className,
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
  onAddPage,
  onDeletePage,
}: PageControllerProps) => {
  return (
    <div className={cn("flex gap-2", "xl:grid xl:grid-cols-2", className)}>
      <CommonButton
        onClick={onAddPage}
        className="bg-green-200 text-green-600 hover:bg-green-300"
      >
        <FaPlus />
      </CommonButton>
      <CommonButton
        onClick={onDeletePage}
        disabled={totalPages <= 1}
        className="bg-red-100 text-red-600 hover:bg-red-200 disabled:opacity-50"
      >
        <FaMinusCircle />
      </CommonButton>
      <div className="col-span-2 flex items-center justify-between gap-2">
        <CommonButton
          onClick={onPrevPage}
          disabled={currentPage === 0}
          className="bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          <FaChevronLeft />
        </CommonButton>
        <span className="text-sm text-gray-600">
          {currentPage + 1} / {totalPages}
        </span>
        <CommonButton
          onClick={onNextPage}
          disabled={currentPage === totalPages - 1}
          className="bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          <FaChevronRight />
        </CommonButton>
      </div>
    </div>
  );
};
