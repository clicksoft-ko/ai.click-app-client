import { CustomCheckBox } from "@/widgets/checkbox";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/widgets/ui/dialog";
import { Button } from "@/widgets/ui";

interface AgreementCheckBoxProps {
  checked: boolean;
  setChecked: (checked: boolean) => void;
}

export const AgreementCheckBox = ({
  checked,
  setChecked,
}: AgreementCheckBoxProps) => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <CustomCheckBox id="agreement" checked={checked}>
            약관동의(필수)
          </CustomCheckBox>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="mb-4">서비스 약관 동의</DialogTitle>
            <DialogDescription>
              <ul className="flex list-inside list-disc flex-col gap-2">
                <li>
                  해당 서비스를 가입함에 있어 본 서비스의 목적인 환자진료외의 목적으로 사용하지 않음에 동의합니다.
                </li>
                <li>
                  이를 위반 시 의료법, 개인정보보호법 등 기타 법령에 의한 민·형사상 법적
                  책임 질 것을 서약합니다.
                </li>
                <li>
                  가입 시 ID, PW는 반드시 노출되지 않도록 주의하시기 바랍니다.
                </li>
                <li>
                  개인정보 유출로 인한 불이익 등은 클릭소프트(주)에서 책임지지
                  않습니다.
                </li>
              </ul>
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" onClick={() => setChecked(true)}>
                동의
              </Button>
            </DialogClose>

            <DialogClose asChild>
              <Button
                type="button"
                variant="destructive"
                onClick={() => setChecked(false)}
              >
                동의하지 않음
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
