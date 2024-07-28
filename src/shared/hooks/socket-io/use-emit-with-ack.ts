import { useEffect, useState, useTransition } from "react";
import {
  SocketErrorResponse,
  SocketResponse,
  WinAccountVerificationDto,
  WinAccountVerificationResultDto,
} from "../../dto/socket-io";
import { useSocketIO } from "./use-socket-io";
import { useAuth } from "../auth";
import { parseErrorMessage } from "../../utils/error";

interface PathTypeMap {
  winAccountVerification: {
    dto: WinAccountVerificationDto;
    result: WinAccountVerificationResultDto;
  };
  abc: {
    dto: { userId: string };
    result: { success: boolean };
  };

  // 다른 경로와 타입들을 추가하세요
}

type ExtractDto<T> = T extends { dto: infer U } ? U : never;
type ExtractResult<T> = T extends { result: infer U } ? U : never;


interface Args<TResult> {
  key?: string;
  clearKey?: boolean;
  onSuccess?: (data: TResult) => void;
  onError?: (error: SocketErrorResponse) => void;
}

export function useEmitWithAck<TPath extends keyof PathTypeMap>(path: TPath, args?: Args<ExtractResult<PathTypeMap[TPath]>>) {
  type DtoType = ExtractDto<PathTypeMap[TPath]>;
  type ResultType = ExtractResult<PathTypeMap[TPath]>;

  const { socket, isConnected } = useSocketIO();
  const { user } = useAuth();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<SocketErrorResponse>();
  const [data, setData] = useState<ResultType>();

  function emit(
    dto: DtoType,
  ) {
    if (!isConnected) {
      setError({ message: "서버 연결이 실패했습니다." });
      return;
    }

    startTransition(async () => {
      try {
        const response: SocketResponse<any> = await socket?.emitWithAck(path as string, {
          key: args?.key ?? user?.roomKey,
          ...dto,
        });

        if (response.status === "error") {
          const error = {
            message: response.message ?? "클라이언트 연결이 실패했습니다.",
            error: response.error,
            errorCode: response.errorCode,
          }

          args?.onError?.(error);
          return setError(error);
        }
        args?.onSuccess?.(response.data);
        setData(response.data);
      } catch (ex) {
        setData(undefined);
        const error = { message: parseErrorMessage(ex)! }

        args?.onError?.(error);
        setError(error);
      }
    });
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
