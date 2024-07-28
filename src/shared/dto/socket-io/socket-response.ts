export interface SocketResponse<T> extends Partial<SocketErrorResponse> {
  status: "success" | "error" | "none";
  data?: T;
}

export interface SocketErrorResponse {
  error?: { [key: string]: string };
  errorCode?: string;
  message: string;
}