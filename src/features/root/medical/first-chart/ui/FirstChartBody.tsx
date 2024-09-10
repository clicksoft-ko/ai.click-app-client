import { useComponents } from "@/features/root/hooks";
import { InfiniteBodyWrapper } from "@/features/root/ui";
import { SearchDataBox } from "@/widgets/search-data";
import { FirstChartBox } from ".";
import { useFirstChart } from "../hooks";

export const FirstChartBody = () => {
  const { data, ...result } = useFirstChart();
  const { components } = useComponents({
    data,
    element: (v) => (
      <SearchDataBox
        key={v.id}
        contents={[
          { title: "작성일자", text: v.writeDateFullText },
          ...(v.headers || []),
        ]}
        childrenClassName="p-0"
      >
        <FirstChartBox infos={v.details} />
      </SearchDataBox>
    ),
  });

  return <InfiniteBodyWrapper {...result}>{components}</InfiniteBodyWrapper>;
};
