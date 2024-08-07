import { ContentInfo } from "@/shared/dto/socket-io";

interface Props {
  infos: ContentInfo[];
}

export const FirstChartBox = ({ infos }: Props) => {
  const contents = infos.map((d) => (
    <tr key={d.title} className="border-t border-primary/30">
      <td className="border-r p-2 font-semibold">{d.title}</td>
      <td className="whitespace-pre-wrap bg-white p-2">{d.text}</td>
    </tr>
  ));
  return (
    <table className="w-full">
      <colgroup>
        <col className="w-16 bg-primary/20" />
        <col />
      </colgroup>
      <tbody className="p-0">{contents}</tbody>
    </table>
  );
};
