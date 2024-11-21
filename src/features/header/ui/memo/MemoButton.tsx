import { cn } from "@/shared/utils";
import { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";
import { MemoCanvas } from "./MemoCanvas";
import { usePatientStore } from "@/shared/stores";

const MemoModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [isOpening, setIsOpening] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      setIsOpening(true);
      requestAnimationFrame(() => {
        setIsOpening(false);
      });
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 200); // transition duration과 동일하게 설정
  };

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/50",
        "transition-all duration-200",
        isOpening || isClosing ? "opacity-0" : "opacity-100",
      )}
    >
      <div
        className={cn(
          "relative h-full w-full overflow-auto bg-white",
          "transition-all duration-200",
          isOpening || isClosing ? "scale-75" : "scale-100",
        )}
      >
        <MemoCanvas open={isOpen} onClose={handleClose} />
      </div>
    </div>
  );
};

export const MemoButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const patient = usePatientStore((state) => state.patient);

  if (!patient) return null;
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex w-12 items-center justify-center gap-1 rounded border border-pink-300 px-2 text-pink-500 hover:bg-pink-50"
      >
        <FaPen />
      </button>

      <MemoModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
