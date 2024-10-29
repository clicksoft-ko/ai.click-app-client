import { useContext } from "react";
import { VsContext, VsWriterContextType } from "../contexts/vs-writer-context";

export const useVsWriterContext = (): VsWriterContextType => {
  return useContext(VsContext);
};
