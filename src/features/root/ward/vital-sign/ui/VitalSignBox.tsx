import { ResultGrid } from "@/features/root/ui";
import { VitalSign } from "@/shared/dto/socket-io";
import { SearchDataBox } from "@/widgets/search-data";
import { Button } from "@/widgets/ui";
import { useVsWriterContext } from "../vs-table/hooks";
import { BsPencilSquare } from "react-icons/bs";

interface Props extends VitalSign {}

export function VitalSignBox({
  writeDateFullText,
  managerName,
  details,
}: Props) {
  const { setOpen, setDate } = useVsWriterContext();

  function handleEditButtonClick(): void {
    setDate(new Date(writeDateFullText));
    setOpen(true);
  }

  return (
    <SearchDataBox
      contents={[
        { title: "작성일자", text: writeDateFullText },
        { title: "작성자", text: managerName },
      ]}
      trailing={
        <Button variant="outline" onClick={handleEditButtonClick}>
          <BsPencilSquare />
        </Button>
      }
      childrenClassName="p-0"
    >
      <ResultGrid details={details} />
    </SearchDataBox>
  );
}
