import { axiosAuth } from "@/shared/api/axios/axios-ins";
import { apiPaths } from "@/shared/paths/api-paths";
import { UserSettingsDto } from "@/shared/dto";

export const upsertUserSettings = async ({
  userId,
  dto,
}: {
  userId: string;
  dto: UserSettingsDto;
}) => {
  const response = await axiosAuth.put(apiPaths.userSettings(userId), dto);
  return response.data;
};
