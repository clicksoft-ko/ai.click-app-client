import { paths } from "@/shared/paths";
import { parseErrorMessage } from "@/shared/utils/error";
import { handleKeyDownToNext } from "@/shared/utils/input";
import { ErrorBox } from "@/widgets/errors/error-box";
import { Button } from "@/widgets/ui/button";
import { Input } from "@/widgets/ui/input";
import { useEffect, useRef, useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useSignIn } from "../hook";
import { AgreementDialog } from "@/widgets/dialogs";
import { Checkbox } from "@/widgets/ui/checkbox";
import { useSettingsStore } from "@/shared/stores";

export const SiginInForm = () => {
  const navigate = useNavigate();
  const [hsUserId, setHsUserId] = useState("");
  const [csUserId, setCsUserId] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [checkSaveId, setCheckSaveId] = useState(false);
  const { error, isPending, validateError, signIn } = useSignIn({
    checkSaveId: checkSaveId,
    onSuccess: () => navigate(paths.medical, { replace: true }),
  });
  const savedLoginId = useSettingsStore((state) => state.savedLoginId);
  const csUserIdRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setOpen(true);
  }

  async function handleAgreement(agreement: boolean) {
    if (agreement) {
      await signIn({ hsUserId, csUserId, password });
    }
  }

  useEffect(() => {
    if (savedLoginId) {
      setHsUserId(savedLoginId.hsUserId);
      setCsUserId(savedLoginId.csUserId);
      setCheckSaveId(!!savedLoginId);
    }
  }, [savedLoginId]);

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <Input
        placeholder="병원 아이디"
        value={hsUserId}
        errorMessage={validateError?.hsUserId}
        onChange={(e) => setHsUserId(e.target.value)}
        onKeyDown={handleKeyDownToNext.bind(null, csUserIdRef)}
        startComponent={<FaUser className="ml-4 text-primary" />}
      />
      <Input
        ref={csUserIdRef}
        value={csUserId}
        placeholder="eClick 아이디"
        errorMessage={validateError?.csUserId}
        onChange={(e) => setCsUserId(e.target.value)}
        onKeyDown={handleKeyDownToNext.bind(null, passwordRef)}
        startComponent={<FaUser className="ml-4 text-primary" />}
      />
      <Input
        ref={passwordRef}
        placeholder="eClick 비밀번호"
        type="password"
        errorMessage={validateError?.password}
        onChange={(e) => setPassword(e.target.value)}
        startComponent={<FaLock className="ml-4 text-primary" />}
      />
      <ErrorBox errorMessage={parseErrorMessage(error)} />
      <label className="flex items-center gap-2 text-slate-700 hover:cursor-pointer">
        <Checkbox
          checked={checkSaveId}
          onCheckedChange={(chk) => setCheckSaveId(chk as boolean)}
        />
        아이디 저장
      </label>
      <Button disabled={isPending || !hsUserId || !csUserId || !password}>
        로그인
      </Button>
      <AgreementDialog
        open={open}
        onOpenChange={setOpen}
        list={[
          "해당 서비스를 가입함에 있어 본 서비스의 목적인 환자진료외의 목적으로 사용하지 않음에 동의합니다.",
        ]}
        setAgreement={handleAgreement}
      />
    </form>
  );
};
