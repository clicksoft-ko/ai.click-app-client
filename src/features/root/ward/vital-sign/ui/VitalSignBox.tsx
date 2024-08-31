import { ResultGrid } from "@/features/root/ui";
import { VitalSign } from "@/shared/dto/socket-io";
import { SearchDataBox } from "@/widgets/search-data";

interface Props extends VitalSign {}

export function VitalSignBox({
  writeDateFullText,
  managerName,
  details,
}: Props) {
  return (
    <SearchDataBox
      contents={[
        { title: "작성일자", text: writeDateFullText },
        { title: "작성자", text: managerName },
      ]}
      childrenClassName="p-0"
    >
      <ResultGrid details={details} />
    </SearchDataBox>
  );
}
