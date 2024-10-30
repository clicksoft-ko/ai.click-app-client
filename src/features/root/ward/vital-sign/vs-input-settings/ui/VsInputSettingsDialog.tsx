import { ChildrenClassNameProps } from "@/shared/interfaces/props";
import { cn } from "@/shared/utils/utils";
import { Backdrop } from "@/widgets/dialogs";
import { SortableList } from "@/widgets/dnd-kit";
import { Button } from "@/widgets/ui";
import { vsMenuName } from "../../vs-table/consts/vs-menu-name";
import { useInputSettings } from "../hooks/use-input-settings";
import { ActionButton } from "./ActionButton";
import { NumberedMenuNameItem } from "./NumberedMenuNameItem";

interface VsInputSettingsProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface ContentWrapperProps extends ChildrenClassNameProps {
  title: string;
  innerClassName?: string;
  trailing?: React.ReactNode;
}

export const VsInputSettingsDialog = ({
  open,
  setOpen,
}: VsInputSettingsProps) => {
  const { menuNames, handleSave, setMenuNameList } = useInputSettings();

  const vsMenuNameList = Object.entries(vsMenuName).map(([id, text]) => ({
    id,
    text,
  }));

  return (
    <Backdrop
      open={open}
      className="flex items-center justify-center"
      onClick={() => setOpen(false)}
    >
      <div className="max-h-[30rem] overflow-hidden rounded-lg bg-white">
        <SortableList
          items={menuNames}
          className="grid w-[30rem] grid-cols-4 gap-2 rounded-lg bg-white p-4"
          onChange={({ items }) => setMenuNameList(items)}
          renderItem={(item, index) => (
            <SortableList.Item id={item.id}>
              <SortableList.DragHandleWrapper>
                <NumberedMenuNameItem item={item} index={index} />
              </SortableList.DragHandleWrapper>
            </SortableList.Item>
          )}
        />
        <div className="flex h-[30rem] overflow-y-auto">
          <ContentWrapper
            title="바이탈사인 저장 설정"
            trailing={
              <Button variant="outline" size="sm" onClick={handleSave}>
                💾 저장
              </Button>
            }
          >
            <SortableList
              items={menuNames}
              className="grid w-[30rem] grid-cols-4 gap-2 rounded-lg bg-white p-4"
              onChange={({ items }) => setMenuNameList(items)}
              renderItem={(item, index) => (
                <SortableList.Item id={item.id}>
                  <SortableList.DragHandleWrapper>
                    <NumberedMenuNameItem item={item} index={index} />
                  </SortableList.DragHandleWrapper>
                </SortableList.Item>
              )}
            />
          </ContentWrapper>

          <ContentWrapper
            title="기본 목록"
            className="mb-2"
            innerClassName="flex flex-col gap-2 py-2"
            trailing={
              <Button
                variant="outline"
                size="sm"
                onClick={() => setOpen(false)}
              >
                ❌ 닫기
              </Button>
            }
          >
            {vsMenuNameList.map((item, _) => (
              <div className="mx-2 flex items-center justify-between gap-2 border p-2">
                <span>{item.text}</span>
                {menuNames.some((menu) => menu.id === item.id) ? (
                  <ActionButton
                    type="delete"
                    onClick={() => {
                      setMenuNameList((prev) =>
                        prev.filter((menu) => menu.id !== item.id),
                      );
                    }}
                  />
                ) : (
                  <ActionButton
                    type="add"
                    onClick={() => {
                      setMenuNameList((prev) => [...prev, item]);
                    }}
                  />
                )}
              </div>
            ))}
          </ContentWrapper>
        </div>
      </div>
    </Backdrop>
  );
};

const ContentWrapper = ({
  title,
  children,
  className,
  innerClassName,
  trailing,
}: ContentWrapperProps) => {
  return (
    <div className={cn("flex flex-col rounded-lg", className)}>
      <Header className="flex items-center justify-between">
        {title}
        {trailing}
      </Header>
      <div className={cn("flex-1 overflow-y-auto rounded-lg", innerClassName)}>
        {children}
      </div>
    </div>
  );
};

const Header = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("border-b bg-slate-50 p-2 font-medium", className)}>
      {children}
    </div>
  );
};
