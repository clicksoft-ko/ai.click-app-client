import { use } from "react";
import { SocketContext } from "../../providers";
 
export const useSocketIO = () => {
  return use(SocketContext);
};
