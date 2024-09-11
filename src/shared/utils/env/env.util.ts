
class EnvUtil {
  get IS_PROD(): boolean {
    return import.meta.env.MODE === "production";
  }
  get SOCKET_URL(): string {
    return this.IS_PROD ? "https://sock.click-soft.co.kr/web-app" : "http://localhost:4001/web-app";
  }

  get BACKEND_URL(): string {
    return this.IS_PROD ? "https://app.click-soft.co.kr/api" : "http://localhost:3000/api";
  }
}

export const envUtil = new EnvUtil();