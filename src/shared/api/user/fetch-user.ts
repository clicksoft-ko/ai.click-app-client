import { apiPaths } from "@/shared/paths"
import { axiosAuth } from "../axios/axios-ins"
import { User } from "@/shared/interfaces/auth";

export const fetchUser = async (): Promise<User> => {
  const response = await axiosAuth.get(apiPaths.user);
  return response.data;
}