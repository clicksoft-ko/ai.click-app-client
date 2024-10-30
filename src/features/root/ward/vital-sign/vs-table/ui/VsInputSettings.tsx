import { Backdrop } from "@/widgets/dialogs";
import { Button } from "@/widgets/ui/button";

interface VsInputSettingsProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const VsInputSettings = ({ open, setOpen }: VsInputSettingsProps) => {
  return (
    <Backdrop open={open}>
      <div className="fixed inset-0 m-auto w-fit h-fit bg-white rounded p-4">
        <h1>설정</h1>
        <Button onClick={() => setOpen(false)}>닫기</Button>  
      </div>
    </Backdrop>
  );
};
