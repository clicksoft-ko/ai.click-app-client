import { useContext } from "react";
import { SocketContext } from "../../providers";

export const useSocketIO = () => {
  return useContext(SocketContext);
};
