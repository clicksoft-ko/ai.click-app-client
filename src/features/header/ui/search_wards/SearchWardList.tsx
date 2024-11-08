import { useInfiniteEmit } from "@/shared/hooks/socket-io";
import { Loading } from "@/widgets/loadings";
import RoomCard from "./RoomCard";

const SearchWardList = () => {
  const { data, inViewEl, isPending } = useInfiniteEmit({
    path: "getWards",
    dtoFn({ page, count }) {
      return {
        count,
        page,
      };
    },
    count: 20,
    queryKey: ["getWards"],
  });

  return (
    <div className="grid grid-cols-1 gap-3 overflow-y-auto p-3 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {isPending && <Loading className="bg-transparent" />}
      {data?.map((room) => <RoomCard key={room.name} {...room} />)}
      {inViewEl}
    </div>
  );
};

export default SearchWardList;
