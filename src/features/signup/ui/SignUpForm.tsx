import { Button } from "@/widgets/ui/button";
import { Input } from "@/widgets/ui/input";
import { FaLock, FaUser } from "react-icons/fa";
import { useVerify } from "../hooks/use-verify";
import { useActionState, useRef, useState } from "react";
import { handleKeyDownToNext } from "@/shared/utils/input";

import { signUpFormAction } from "../action/sign-up-form-action";
import { Navigate } from "react-router-dom";
import { paths } from "@/shared/paths";
import { ErrorBox } from "@/widgets/errors/error-box";

export const SignUpForm = () => {
  const { state } = useVerify();
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [actionState, action, isPending] = useActionState(
    signUpFormAction.bind(null, state!),
    {},
  );

  if (actionState.success) {
    return <Navigate to={paths.signIn} />;
  }

  return (
    <form className="flex flex-col gap-2" action={action}>
      <div className="mb-2 flex justify-between">
        <span className="text-green-700">✅ 인증되었습니다.</span>
        <span>{state?.name} 님</span>
      </div>
      <Input
        name="email"
        autoFocus
        placeholder="EMAIL"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={handleKeyDownToNext.bind(null, passwordRef)}
        errorMessage={actionState.error?.email}
        startComponent={<FaUser className="ml-4 text-primary" />}
      />
      <Input
        name="password"
        ref={passwordRef}
        placeholder="PASSWORD"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={handleKeyDownToNext.bind(null, confirmPasswordRef)}
        errorMessage={actionState.error?.password}
        startComponent={<FaLock className="ml-4 text-primary" />}
      />
      <Input
        name="confirmPassword"
        ref={confirmPasswordRef}
        placeholder="CONFIRM PASSWORD"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        errorMessage={actionState.error?.confirmPassword}
        startComponent={<FaLock className="ml-4 text-primary" />}
      />
      <ErrorBox errorMessage={actionState.error?._form} />
      <Button disabled={isPending}>회원가입</Button>
    </form>
  );
};
