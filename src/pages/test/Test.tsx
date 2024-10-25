import { ChildrenClassNameProps } from "@/shared/interfaces/props";
import { cn } from "@/shared/utils";
import { Button, DatePicker } from "@/widgets/ui";
import { useState } from "react";
import ReactDOM from "react-dom";
import { VsInputTable } from "./ui/VsInputTable";

export const TestPage = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button className="h-[50rem]" onClick={() => setOpen(true)}>
        Open
      </Button>
      <CustomDialog
        className="w-fit max-w-[500px] overflow-auto"
        open={open}
        onOpenChange={(open) => setOpen(open)}
        dialogTrigger={<Button>Open</Button>}
        title="바이탈 사인 입력 화면"
        description={"sdad"}
        footer={
          <>
            <Button>동의</Button>
            <Button variant="destructive">동의하지 않음</Button>
          </>
        }
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">{"바이탈 사인 입력 화면"}</h2>
          <div className="flex gap-2">
            <Button variant="default" onClick={() => {}}>
              저장
            </Button>
            <Button variant="destructive" onClick={() => setOpen(false)}>
              닫기
            </Button>
          </div>
        </div>
        <div>
          <label className="flex items-center gap-2">
            <span>일자</span>
            <span className="w-1">:</span>
            <DatePicker />
          </label>
        </div>
        <div className="overflow-auto">
          <VsInputTable />
          <div className="h-2" />
        </div>
      </CustomDialog>
    </>
  );
};

interface CustomDialogProps extends ChildrenClassNameProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dialogTrigger: React.ReactNode;
  title: string;
  description: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
}

const CustomDialog = ({
  open,
  onOpenChange,
  dialogTrigger,
  title,
  description,
  footer,
  className,
  children,
}: CustomDialogProps) => {
  return ReactDOM.createPortal(
    <div
      className={cn(
        "fixed left-0 top-0 z-[20] w-screen bg-white/95 p-4 shadow-lg transition-all",
        open ? "opacity-100" : "pointer-events-none top-[-100%] opacity-0",
      )}
    >
      {children}
    </div>,
    document.getElementById("top-portal")!,
  );
};

// <Dialog modal={true} onOpenChange={onOpenChange} open={open}>
//   <DialogTrigger asChild>{dialogTrigger}</DialogTrigger>
//   <DialogContent className={className}>
//     <DialogHeader>
//       <DialogTitle className="mb-4">{title}</DialogTitle>
//       {description && <DialogDescription>{description}</DialogDescription>}
//     </DialogHeader>
//     {children}
//     <DialogFooter>{footer}</DialogFooter>
//   </DialogContent>
// </Dialog>
