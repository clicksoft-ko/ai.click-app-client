import { Button } from "@/widgets/ui";
import { useState } from "react";
import { VsInputDialog } from "./ui/VsInputDialog";

export const TestPage = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>TestOpen</Button>
      <VsInputDialog open={open} setOpen={setOpen} />
    </>
  );
};
