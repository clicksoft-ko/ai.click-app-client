import { InfiniteBodyWrapper } from "@/features/root/ui";
import { SearchDataBox } from "@/widgets/search-data";
import useInsulin from "../hooks/use-insulin";
import InsulinBox from "./InsulinBox";
import { useComponents } from "@/features/root/hooks";

const InsulinBody = () => {
  const { data, ...result } = useInsulin();
  const { components } = useComponents({
    data,
    element: (v) => (
      <SearchDataBox
        key={v.id}
        contents={[
          { title: "작성일자", text: v.writeDateShortText },
          { title: "담당자", text: v.managerName },
        ]}
        childrenClassName="flex flex-col gap-2"
      >
        {v.details.map((detail) => (
          <InsulinBox key={detail.id} insulin={v} detail={detail} />
        ))}
      </SearchDataBox>
    ),
  });

  return <InfiniteBodyWrapper {...result}>{components}</InfiniteBodyWrapper>;
};

export default InsulinBody;
