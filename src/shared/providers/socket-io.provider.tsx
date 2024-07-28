import { Socket, io } from "socket.io-client";
import React, { createContext, useEffect, useState } from "react";

export type SocketContextType = {
  socket: Socket | null;
  isConnected: boolean;
};

const initialze: SocketContextType = {
  socket: null,
  isConnected: false,
};

export const SocketContext = createContext<SocketContextType>(initialze);

interface SocketProviderProps {
  uri?: string;
  path?: string;
  children: React.ReactNode;
  use?: boolean;
}

export const SocketIOProvider = ({
  children,
  uri,
  path,
  use,
}: SocketProviderProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!uri || !use) return;
    const socket = io(uri, { path, transports: ["websocket"] });

    socket.on("connect", async () => {
      setIsConnected(true);
    });
    socket.on("disconnect", async () => {
      setIsConnected(false);
    });
    
    setSocket(socket);

    return () => {
      setSocket(null);
    };
  }, [use]);

  useEffect(()=> {
    if(!use){
      socket?.disconnect();
    }
  }, [use])
  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
