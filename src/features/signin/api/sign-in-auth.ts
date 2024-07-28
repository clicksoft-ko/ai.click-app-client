import { axiosBase } from "@/shared/api/axios";
import { apiPaths } from "@/shared/paths";
import { SignInAuthDto, SignInAuthResultDto } from "../dto";

export const signInAuth = async (dto: SignInAuthDto): Promise<SignInAuthResultDto> => {
  const response = await axiosBase.post(apiPaths.auth.signIn, dto);
  return response.data;
}