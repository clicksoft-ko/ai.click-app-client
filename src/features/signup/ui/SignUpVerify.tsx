import { Button } from "@/widgets/ui/button";

import { SocketIOProvider } from "@/shared/providers/socket-io.provider";
import { Input } from "@/widgets/ui/input";
import { useSignUpVerify } from "../hook/use-sign-up-verify";
import { VerifyDialog } from "./VerifyDialog";
import { ErrorBox } from "@/widgets/errors/error-box";
import { envUtil } from "@/shared/utils/env";

export const SignUpVerify = () => {
  const { data, open, error, isPending, setHsUserId, setOpen, handleSubmit } =
    useSignUpVerify();

  return (
    <>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <Input
          autoFocus
          placeholder="병원 계정 ID"
          onChange={(e) => setHsUserId(e.target.value)}
        />
        <Button disabled={isPending} className="w-full">
          병원 계정 인증
        </Button>
      </form>

      <ErrorBox errorMessage={error} />
      <SocketIOProvider uri={envUtil.SOCKET_URL} use={open}>
        <VerifyDialog open={open} setOpen={setOpen} roomKey={data?.roomKey} />
      </SocketIOProvider>
    </>
  );
};
