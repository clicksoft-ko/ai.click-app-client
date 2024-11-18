
class EnvUtil {
  get IS_PROD(): boolean {
    return import.meta.env.MODE === "production";
  }
  get SOCKET_URL(): string {
    return this.IS_PROD
      ? "https://sock.click-soft.co.kr/web-app"
      : `http://${this.VITE_HOST}:4001/web-app`;
  }

  get BACKEND_URL(): string {
    return this.IS_PROD
      ? "https://app.click-soft.co.kr/api"
      : `http://${this.VITE_HOST}:3000/api`;
  }

  get VITE_HOST(): string {
    return import.meta.env.VITE_HOST ?? "localhost";
  }
}

export const envUtil = new EnvUtil();