import { Weib } from "@/shared/dto/socket-io";
import { useInfiniteEmit } from "@/shared/hooks/socket-io";
import { PathTypeKey } from "@/shared/hooks/types";
import dayjs from "dayjs";

interface Args {
  enabled: boolean;
  searchString: string;
  weib: Weib;
}

export const useInfiniteSelectPat = ({ searchString, weib, enabled }: Args) => {
  return useInfiniteEmit({
    path: "getPatients",
    dtoFn({ page, count }) {
      return {
        count,
        page,
        searchString,
        weib,
        ymd: dayjs().format("YYYYMMDD"),
      };
    },
    queryKey: ["getPatients" as PathTypeKey, searchString, weib],
    enabled,
  });
};
