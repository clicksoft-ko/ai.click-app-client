import { apiPaths } from "@/shared/paths";
import { axiosBase } from "./axios-base";

export const fetchRefreshToken = async (accessToken: string | undefined) => {
  const response = await axiosBase.post(apiPaths.auth.refreshToken, { accessToken });
  return response.data.accessToken;
}
