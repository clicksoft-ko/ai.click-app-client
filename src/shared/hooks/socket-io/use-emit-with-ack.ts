import { SocketErrorResponse, SocketResponse } from "@/shared/dto/socket-io";
import { parseErrorMessage } from "@/shared/utils/error";
import { useEffect, useState } from "react";
import { useAuth } from "../auth";
import { useSocketIO } from "./use-socket-io";
import { ExtractDto, ExtractResult, PathTypeKey, PathTypeMap } from "../types";

interface Args<TResult> {
  key?: string;
  clearKey?: boolean;
  onSuccess?: (data: TResult) => void;
  onError?: (error: SocketErrorResponse) => void;
  onPending?: (isPending: boolean) => void;
}

export function useEmitWithAck<TPath extends PathTypeKey>(path: TPath, args?: Args<ExtractResult<PathTypeMap[TPath]>>) {
  type DtoType = ExtractDto<PathTypeMap[TPath]>;
  type ResultType = ExtractResult<PathTypeMap[TPath]>;

  const { socket, isConnected } = useSocketIO();  
  const { user } = useAuth();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<SocketErrorResponse>();
  const [data, setData] = useState<ResultType>();

  async function emit(
    dto: DtoType & { key?: string },
  ): Promise<ResultType | undefined> {
    if (!isConnected) {
      // setError({ message: "서버 연결이 실패했습니다." });
      return;
    }

    setIsPending(true);
    args?.onPending?.(true);
    try {
      const { key, ...dtoWithoutKey } = dto;
      const response: SocketResponse<any> = await socket?.emitWithAck(path as string, {
        key: args?.key ?? user?.roomKey ?? key,        
        userId: user?.csUserId,
        ...dtoWithoutKey,
      });

      if (response.status === "error") {
        const error = {
          message: response.message ?? "클라이언트 연결이 실패했습니다.",
          error: response.error,
          errorCode: response.errorCode,
        }

        args?.onError?.(error);
        setError(error);
        return;
      }
      args?.onSuccess?.(response.data);

      setError(undefined);
      setData(response.data);

      return response.data;
    } catch (ex) {
      setData(undefined);
      const error = { message: parseErrorMessage(ex)! }

      args?.onError?.(error);
      setError(error);
    } finally {
      setIsPending(false);
      args?.onPending?.(false);
    }
  }

  function clear() {
    setError(undefined);
  }

  useEffect(() => {
    if (args?.clearKey) {
      clear();
    }
  }, [args?.clearKey]);

  return { data, isPending, error, emit, clear };
}
