import { handleKeyDownToNext } from "@/shared/utils/input";
import { Button } from "@/widgets/ui/button";
import { Input } from "@/widgets/ui/input";
import { useRef, useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import { paths } from "@/shared/paths";
import { parseErrorMessage } from "@/shared/utils/error";
import { ErrorBox } from "@/widgets/errors/error-box";
import { useNavigate } from "react-router-dom";
import { useSignUp } from "../hooks";

export const SignUpForm = () => {
  const navigate = useNavigate();
  const csUserIdRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [hsUserId, setHsUserId] = useState("");
  const [csUserId, setCsUserId] = useState("");
  const [password, setPassword] = useState("");
  const { signUp, isPending, error, validateError } = useSignUp({
    onSuccess: () => {
      navigate(paths.signIn);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signUp({ hsUserId, csUserId, password });
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <Input
        placeholder="병원 아이디"
        value={hsUserId}        
        onChange={(e) => setHsUserId(e.target.value)}
        onKeyDown={handleKeyDownToNext.bind(null, csUserIdRef)}
        errorMessage={validateError?.hsUserId}
        startComponent={<FaUser className="ml-4 text-primary" />}
      />
      <Input
        ref={csUserIdRef}
        placeholder="eClick 아이디"
        value={csUserId}
        onChange={(e) => setCsUserId(e.target.value)}
        onKeyDown={handleKeyDownToNext.bind(null, passwordRef)}
        errorMessage={validateError?.csUserId}
        startComponent={<FaUser className="ml-4 text-primary" />}
      />
      <Input
        ref={passwordRef}
        placeholder="eClick 비밀번호"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        errorMessage={validateError?.password}
        startComponent={<FaLock className="ml-4 text-primary" />}
      />
      <ErrorBox errorMessage={parseErrorMessage(error)} />
      <Button disabled={isPending}>회원가입</Button>
    </form>
  );
};
