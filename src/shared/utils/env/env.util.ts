class EnvUtil {
  constructor(
    readonly SOCKET_URL: string = import.meta.env.VITE_SOCKET_URL,
    readonly BACKEND_URL: string = import.meta.env.VITE_BACKEND_URL,
  ) { }
}

export const envUtil = new EnvUtil();