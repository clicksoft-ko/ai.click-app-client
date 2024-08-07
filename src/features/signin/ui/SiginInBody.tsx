import { Button } from "@/widgets/ui/button";
import { Input } from "@/widgets/ui/input";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
import { useSignIn } from "../hook";
import { Navigate } from "react-router-dom";
import { paths } from "@/shared/paths";
import { ErrorBox } from "@/widgets/errors/error-box";
import { useRef, useState } from "react";
import { parseErrorMessage } from "@/shared/utils/error";
import { handleKeyDownToNext } from "@/shared/utils/input";

export const SiginInForm = () => {
  const { error, isPending, isSuccess, validateError, signIn } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const passwordRef = useRef<HTMLInputElement>(null);

  if (isSuccess) {
    return <Navigate to={paths.root} replace />;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    signIn({ email, password });
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <Input
        placeholder="EMAIL"
        type="email"
        errorMessage={validateError?.email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={handleKeyDownToNext.bind(null, passwordRef)}
        startComponent={<FaUser className="ml-4 text-primary" />}
      />
      <Input
        ref={passwordRef}
        placeholder="PASSWORD"
        type="password"
        errorMessage={validateError?.password}
        onChange={(e) => setPassword(e.target.value)}
        startComponent={<FaLock className="ml-4 text-primary" />}
      />
      <ErrorBox errorMessage={parseErrorMessage(error)} />
      <Button disabled={isPending}>로그인</Button>
    </form>
  );
};
