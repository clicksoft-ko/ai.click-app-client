import { ClassNameProps } from "@/shared/interfaces/props";
import Lottie from "react-lottie-player";
import loading from "./files/loading-ani.json";
import { cn } from "@/shared/utils";

interface DataType {
  loading: any;
}

const dataObj: DataType = {
  loading,
};

interface Props extends ClassNameProps {
  data: keyof DataType;
  speed?: number;
  loop?: boolean;
  play?: boolean;
}

export const LottiePlayer = ({
  data,
  className,
  play = true,
  ...props
}: Props) => {
  return (
    <Lottie
      className={className}
      animationData={dataObj[data]}
      play={play}
      {...props}
    />
  );
};
