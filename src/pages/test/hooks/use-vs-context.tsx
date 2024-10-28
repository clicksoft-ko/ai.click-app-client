import { useContext } from "react";
import { VsContext, VsContextType } from "../contexts/vs-context";

export const useVsContext = (): VsContextType => {
  return useContext(VsContext);
};
