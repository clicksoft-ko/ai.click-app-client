import { AxiosError } from "axios";

export function parseErrorMessage(ex: unknown): string | undefined {
  if (!ex) return;
  if (ex instanceof AxiosError) {
    const message = ex.response?.data.message;
    if (typeof message === 'object') {
      return message.message;
    } else {
      return message;
    }
  } else if (ex instanceof Error) {
    return ex.message;
  }
  return "알 수 없는 오류가 발생했습니다.";
}