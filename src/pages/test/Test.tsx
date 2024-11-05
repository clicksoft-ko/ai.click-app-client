import { FloatButton } from "@/widgets/buttons";
import { Switch } from "@/widgets/ui";

export const TestPage = () => {
  return (
    <div className="flex items-center gap-1">
      <label htmlFor="switch">한방</label>
      <Switch id="switch"></Switch>
      <FloatButton
        className="text-sm font-normal text-white"
        onClick={() => {}}
        icon={"한방"}
      />
    </div>
  );
};
