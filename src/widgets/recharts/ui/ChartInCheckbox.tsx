import { ChildrenProps } from "@/shared/interfaces/props";

interface ChartInCheckBoxProps extends ChildrenProps {
  color: string | undefined;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export function ChartInCheckBox({
  color,
  checked,
  children,
  onCheckedChange,
}: ChartInCheckBoxProps) {
  return (
    <label className="flex items-center gap-1 text-sm" style={{ color }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => {
          onCheckedChange(e.target.checked);
        }}
      />
      {children}
    </label>
  );
}
