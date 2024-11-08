import RoomCard from "@/features/header/ui/search_wards/RoomCard";
import { useInfiniteEmit } from "@/shared/hooks/socket-io";

export const TestPage = () => {
  const { data, inViewEl } = useInfiniteEmit({
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

  // useEffect(() => {
  //   emit({});
  // }, []);

  console.log(data);
  return (
    <div className="grid grid-cols-1 gap-3 p-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {data?.map((room) => <RoomCard key={room.name} {...room} />)}
      {inViewEl}
    </div>
  );
};
