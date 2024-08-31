import { useState } from "react";
import { ChartInCheckBox } from "../ui/ChartInCheckbox";
import { GraphDataType } from "../types/graph-data-type";

export interface Args {
  data: GraphDataType[];
}

export const useChartInCheckBox = ({ data }: Args) => {
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
  const colorMap = GetColorMap(data);
  const keys = Array.from(colorMap.keys());
  const checkComponents = keys.map((key) => {
    return (
      <ChartInCheckBox
        key={key}
        checked={checkedKeys.includes(key)}
        color={colorMap.get(key)}
        onCheckedChange={(checked) => {
          setCheckedKeys((prev) =>
            checked ? [...prev, key] : prev.filter((p) => p !== key),
          );
        }}
      >
        {key}
      </ChartInCheckBox>
    );
  });

  const resultKeys = checkedKeys.length === 0 ? keys : checkedKeys;
  const newData = data.filter((d) =>
    Object.keys(d).some((key) => resultKeys.includes(key)),
  );

  return {
    keys: resultKeys,
    newData,
    colorMap,
    checkComponents,
  };
};

function GetColorMap(data: GraphDataType[]) {
  const keySet = data?.reduce((acc: Set<string>, cur) => {
    const keys = Object.keys(cur);
    keys.forEach((key) => {
      if (key !== "xName") acc.add(key);
    });

    return acc;
  }, new Set<string>());

  const map = new Map<string, string>();
  let index = 0;
  keySet.forEach((key) => {
    map.set(key, colors?.[index++]);
  });

  return map;
}

const colors = [
  "#1f77b4",
  "#ff7f0e",
  "#2ca02c",
  "#d62728",
  "#9467bd",
  "#8c564b",
  "#e377c2",
  "#7f7f7f",
  "#bcbd22",
  "#17becf",
  "#aec7e8",
  "#ffbb78",
  "#98df8a",
  "#ff9896",
  "#c5b0d5",
  "#c49c94",
  "#f7b6d2",
  "#c7c7c7",
  "#dbdb8d",
  "#9edae5",
  "#393b79",
  "#ff7f0e",
  "#2ca02c",
  "#d62728",
  "#9467bd",
  "#8c564b",
  "#e377c2",
  "#7f7f7f",
  "#bcbd22",
  "#17becf",
];
