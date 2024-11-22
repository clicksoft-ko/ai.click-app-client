import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../ui/alert-dialog";

interface ShowDialogProps {
  title: string;
  description: string;
  open: boolean;
  trigger: React.ReactNode;
  onOpenChange: (open: boolean) => void;
  onSubmit: () => void;
  onCancel?: () => void;
  submitButtonText?: string;
  cancelButtonText?: string;
}

export const ShowDialog = ({
  title,
  description,
  submitButtonText = "Yes",
  cancelButtonText = "Cancel",
  open,
  onOpenChange,
  trigger,
  onSubmit,
  onCancel,
}: ShowDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={onSubmit}>
            {submitButtonText}
          </AlertDialogAction>
          <AlertDialogCancel onClick={onCancel}>
            {cancelButtonText}
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
