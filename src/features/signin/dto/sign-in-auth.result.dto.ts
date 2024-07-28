import { User } from "@/shared/interfaces/auth";

export interface SignInAuthResultDto {
  accessToken: string;
  user: User;
}