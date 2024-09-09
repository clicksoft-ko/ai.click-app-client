import { InfiniteBodyWrapper } from "@/features/root/ui";
import { SearchDataBox } from "@/widgets/search-data";
import useInsulin from "../hooks/use-insulin";
import InsulinBox from "./InsulinBox";

const InsulinBody = () => {
  const { data, ...result } = useInsulin();
  const components = data?.map((item) => (
    <SearchDataBox
      key={item.id}
      contents={[
        { title: "작성일자", text: item.writeDateShortText },
        { title: "담당자", text: item.managerName },
      ]}
      childrenClassName="flex flex-col gap-2"
    >
      {item.details.map((detail) => (
        <InsulinBox key={detail.id} insulin={item} detail={detail} />
      ))}
    </SearchDataBox>
  ));

  return <InfiniteBodyWrapper {...result}>{components}</InfiniteBodyWrapper>;
};

export default InsulinBody;
