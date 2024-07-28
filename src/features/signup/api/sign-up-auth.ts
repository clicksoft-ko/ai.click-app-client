import { axiosBase } from "@/shared/api/axios";
import { apiPaths } from "@/shared/paths"

type SignUpAuthDto = {
  hsUserId: string;
  csUserId: string;
  name: string;
  email: string;
  password: string;
}

export const signUpAuth = async (dto: SignUpAuthDto) => {
  const response = await axiosBase.post(apiPaths.auth.signUp, dto);

  return response.data;
}   