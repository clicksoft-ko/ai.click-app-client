import { TitleValueDetail } from "@/shared/dto/socket-io";
import { ResultGridBox } from ".";

interface ResultGridProps {
  details: TitleValueDetail[];
}

export function ResultGrid({ details }: ResultGridProps) {
  return (
    <div
      className={`grid-area md2:grid-cols-7 lg2:grid-cols-9 xl2:grid-cols-11 grid grid-cols-4 bg-white md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 2xl:grid-cols-12`}
    >
      {details.map((d, i) => (
        <ResultGridBox key={d.title} {...d} isOdd={i % 2 !== 0} />
      ))}
    </div>
  );
}
