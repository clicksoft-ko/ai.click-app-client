import { axiosBase } from "@/shared/api/axios";
import { apiPaths } from "@/shared/paths"

export const fetchRoomKey = async ({ hsUserId }: { hsUserId: string }): Promise<{ roomKey: string }> => {
  const response = await axiosBase.get(apiPaths.auth.roomKey(hsUserId));

  return response.data;
}