import { JSX, useState, useEffect } from "react";

interface UseComponentsArgs<T> {
  data: T[] | undefined;
  element: (value: T) => JSX.Element;
}

export function useComponents<T>({ data, element }: UseComponentsArgs<T>) {
  const [components, setComponents] = useState<JSX.Element[]>();

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setComponents(data.map((p) => element(p)));
    }
  }, [data]);

  return { components };
}
