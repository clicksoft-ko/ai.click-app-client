import { CustomCheckBox } from "@/widgets/checkbox";
import { AgreementDialog } from "@/widgets/dialogs";


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
      <AgreementDialog
        list={[
          "해당 서비스를 가입함에 있어 본 서비스의 목적인 환자진료외의 목적으로 사용하지 않음에 동의합니다.",
          "이를 위반 시 의료법, 개인정보보호법 등 기타 법령에 의한 민·형사상 법적 책임 질 것을 서약합니다.",
          "가입 시 ID, PW는 반드시 노출되지 않도록 주의하시기 바랍니다.",
          "개인정보 유출로 인한 불이익 등은 클릭소프트(주)에서 책임지지 않습니다.",
        ]}
        setAgreement={setChecked}
        dialogTrigger={
          <CustomCheckBox id="agreement" checked={checked}>
            약관동의(필수)
          </CustomCheckBox>
        }
      />
    </>
  );
};

