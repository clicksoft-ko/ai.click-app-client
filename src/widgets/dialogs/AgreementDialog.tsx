import { Button } from "@/widgets/ui";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/widgets/ui/dialog";
import { DialogProps } from "@radix-ui/react-dialog";

interface AgreementDialogProps extends DialogProps {
  list: string[];
  setAgreement: (agreement: boolean) => void;
  dialogTrigger?: React.ReactNode;
}

export const AgreementDialog = ({
  list,
  open,
  onOpenChange,
  setAgreement,
  dialogTrigger,
}: AgreementDialogProps) => {
  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogTrigger asChild>{dialogTrigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4">서비스 약관 동의</DialogTitle>
          <DialogDescription>
            <ul className="flex list-inside list-disc flex-col gap-2">
              {list.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" onClick={() => setAgreement(true)}>
              동의
            </Button>
          </DialogClose>

          <DialogClose asChild>
            <Button
              type="button"
              variant="destructive"
              onClick={() => setAgreement(false)}
            >
              동의하지 않음
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
