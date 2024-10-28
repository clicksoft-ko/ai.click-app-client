import { Button } from "@/widgets/ui";
import { useState } from "react";
import { VsInputDialog } from "./ui/VsInputDialog";
import { VsContextProvider } from "./contexts/vs-context";

export const TestPage = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button className="w-[10rem]" onClick={() => setOpen(true)}>
        TestOpen
      </Button>
      <VsContextProvider>
        <VsInputDialog open={open} setOpen={setOpen} />
      </VsContextProvider>
    </>
  );
};
