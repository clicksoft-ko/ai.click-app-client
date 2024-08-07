import Highlighter from "react-highlight-words";

interface Props {
  searchString: string | undefined;
  textToHighlight: string;
}

export const HighlighterX = ({ searchString, textToHighlight }: Props) => {
  if (!searchString) return <>{textToHighlight}</>;

  const searchWords = searchString.split(" ");

  return (
    // @ts-ignore
    <Highlighter
      highlightClassName="text-white bg-rose-400"
      searchWords={searchWords}
      autoEscape={true}
      textToHighlight={textToHighlight}
    />
  );
};
