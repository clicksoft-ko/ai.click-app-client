import { SearchDataBox } from "@/widgets/search-data";
import { FirstChartBox } from ".";
import { useFirstChart } from "../hooks";
import { InfiniteBodyWrapper } from "@/features/root/ui";

export const FirstChartBody = () => {
  const { data, ...result } = useFirstChart();

  const components = data?.map((item) => (
    <SearchDataBox
      key={item.id}
      contents={[
        { title: "작성일자", text: item.writeDateFullText },
        ...(item.headers || []),
      ]}
      childrenClassName="p-0"
    >
      <FirstChartBox infos={item.details} />
    </SearchDataBox>
  ));

  return <InfiniteBodyWrapper {...result}>{components}</InfiniteBodyWrapper>;
};
