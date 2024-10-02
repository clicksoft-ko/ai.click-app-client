import { useComponents } from "@/features/root/hooks";
import { InfiniteBodyWrapper } from "@/features/root/ui";
import { useConsultation } from "../hooks";
import { ConsultationBox } from "./ConsultationBox";

const ConsultationBody = () => {
  const { data, ...result } = useConsultation();
  const { components } = useComponents({
    data,
    element: (v) => <ConsultationBox key={v.id} item={v} />,
  });

  return <InfiniteBodyWrapper {...result}>{components}</InfiniteBodyWrapper>;
};

export { ConsultationBody };
