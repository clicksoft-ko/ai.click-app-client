import { ProgressNote } from "@/shared/dto/socket-io";
import { HighlighterX } from "@/widgets/highlighter-x";
import { SearchDataBox } from "@/widgets/search-data";

interface Props {
  progressNote: ProgressNote;
  searchString?: string;
}

export const ProgressNoteBox = ({ progressNote, searchString }: Props) => {
  const { writer, writeDateFullText, detail, doctorName, typeName } =
    progressNote;

  return (
    <SearchDataBox
      contents={[
        { title: "작성일자", text: writeDateFullText },
        { title: "작성자", text: writer },
        { title: "유형", text: typeName },
        { title: "진료의", text: doctorName },
      ]}
    >
      <HighlighterX searchString={searchString} textToHighlight={detail} />
    </SearchDataBox>
  );
};
