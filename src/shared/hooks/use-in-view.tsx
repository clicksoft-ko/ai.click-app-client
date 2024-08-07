import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface Args {
  onInView: () => void;
}
export function useInViewEx(args?: Args) {
  const { inView, ref } = useInView({ threshold: 0.1 });

  const inViewEl = <div ref={ref} className="p-[1px]" />;

  useEffect(() => {
    if (!inView) return;
    args?.onInView();
  }, [inView]);

  return { ref, inView, inViewEl };
}
