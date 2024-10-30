import { axiosAuth } from "@/shared/api/axios/axios-ins";
import { apiPaths } from "@/shared/paths/api-paths";
import { UserSettingsDto } from "@/shared/dto";

export const fetchVsInputSettings = async (userId: string) => {
  const response = await axiosAuth.get<UserSettingsDto>(
    apiPaths.userSettings(userId),
  );
  
  return response.data;
};
