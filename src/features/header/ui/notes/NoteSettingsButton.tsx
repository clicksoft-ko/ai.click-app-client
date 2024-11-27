import { LineStyle, useTNoteSettingsStore } from "@/shared/stores";
import { IconButton } from "@/widgets/buttons";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Label,
  RadioGroup,
  RadioGroupItem,
} from "@/widgets/ui";
import { Settings } from "lucide-react";
import { useEffect, useState } from "react";

interface NoteSettingsButtonProps {
  isLoading?: boolean;
  disabled?: boolean;
  onSave?: () => void;
}
export const NoteSettingsButton = ({
  isLoading,
  disabled,
  onSave,
}: NoteSettingsButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localLineStyle, setLocalLineStyle] = useState<LineStyle>("none");
  const { lineStyle, setLineStyle } = useTNoteSettingsStore((state) => ({
    lineStyle: state.lineStyle,
    setLineStyle: state.setLineStyle,
  }));

  function handleSave(): void {
    setLineStyle(localLineStyle);
    onSave?.();
    setIsOpen(false);
  }

  useEffect(() => {
    if (isOpen) setLocalLineStyle(lineStyle);
  }, [isOpen, lineStyle]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <IconButton
          isLoading={isLoading}
          disabled={disabled}
          variant="gray"
          icon={<Settings />}
        ></IconButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>노트 설정</DialogTitle>
          <DialogDescription>기기별로 저장되는 설정입니다.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right">
              노트 배경
            </label>
            <div className="col-span-3">
              <RadioGroup
                defaultValue={localLineStyle}
                name="lineStyle"
                onValueChange={(value) => setLocalLineStyle(value as LineStyle)}
              >
                <div className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="none" id="none" />
                    <Label htmlFor="none" className="text-sm text-gray-700">
                      없음
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dashed" id="dashed" />
                    <Label htmlFor="dashed" className="text-sm text-gray-700">
                      점선
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="solid" id="solid" />
                    <Label htmlFor="solid" className="text-sm text-gray-700">
                      라인
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            type="button"
            onClick={() => setIsOpen(false)}
          >
            닫기
          </Button>
          <Button type="button" onClick={handleSave}>
            저장
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
