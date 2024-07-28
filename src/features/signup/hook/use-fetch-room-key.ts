import { useMutation } from "@tanstack/react-query"
import { fetchRoomKey } from "../api/fetch-room-key"
import { apiPaths } from "@/shared/paths"

interface Args {
  hsUserId: string;
}

export const useFetchRoomKey = ({ hsUserId }: Args) => {
  return useMutation({
    mutationFn: () => fetchRoomKey({ hsUserId }),
    mutationKey: [apiPaths.auth.roomKey(hsUserId)],
  })
}