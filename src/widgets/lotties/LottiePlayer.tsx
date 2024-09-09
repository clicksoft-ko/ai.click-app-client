import { ClassNameProps } from "@/shared/interfaces/props";
import Lottie from "react-lottie-player";
import loading from "./files/loading-ani.json";
import redCheck from "./files/red-check-ani.json";

const dataObj = {
  loading,
  redCheck,
};

type DataType = typeof dataObj;

interface Props extends ClassNameProps {
  data: keyof DataType;
  speed?: number;
  loop?: boolean;
  play?: boolean;
  ref?: any;
}

export const LottiePlayer = ({
  data,
  className,
  play = true,
  ref,
  ...props
}: Props) => {
  return (
    <Lottie
      ref={ref}
      className={className}
      animationData={dataObj[data]}
      play={play}
      {...props}
    />
  );
};
