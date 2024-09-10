const isProd = import.meta.env.NODE_ENV === "production";
class EnvUtil {
  constructor(
    readonly SOCKET_URL: string = isProd ? "https://sign.click-soft.co.kr/web-app" : "http://localhost:4001/web-app",
    readonly BACKEND_URL: string = isProd ? "https://app.click-soft.co.kr/api" : "http://localhost:3000/api",
  ) { }
}

export const envUtil = new EnvUtil();