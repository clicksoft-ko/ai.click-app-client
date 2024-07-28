import { useEmitWithAck } from "@/shared/hooks/socket-io";
import { handleKeyDownToNext } from "@/shared/utils/input";
import { ErrorBox } from "@/widgets/errors/error-box";
import { Button } from "@/widgets/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/widgets/ui/dialog";
import { Input } from "@/widgets/ui/input";
import { useEffect, useId, useReducer, useRef } from "react";
import { useVerify } from "../hook/use-verify";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  roomKey: string | undefined;
}

interface AccountState {
  userId: string;
  password: string;
}

function reducer(
  state: AccountState,
  args: Partial<AccountState>,
): AccountState {
  if (args.userId !== undefined) state.userId = args.userId;
  if (args.password !== undefined) state.password = args.password;
  return state;
}

export const VerifyDialog = ({ roomKey, open, setOpen }: Props) => {
  const { isPending, error, emit } = useEmitWithAck("winAccountVerification", {
    key: roomKey,
    clearKey: !open,
    onSuccess(data) {
      setVerify({ ...state, ...data, csUserId: account.userId });
      setOpen(false);
    },
  });
  const { state, setVerify } = useVerify();
  const passwordRef = useRef<HTMLInputElement>(null);
  const [account, accountDispatch] = useReducer(reducer, {
    userId: "",
    password: "",
  });

  async function handleVerify() {
    emit({ ...account });
  }

  useEffect(() => {
    if (!open) {
      accountDispatch({ userId: "", password: "" });
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>클릭소프트 계정 인증</DialogTitle>
          <DialogDescription>
            클릭소프트 윈도우 프로그램에서 사용하는 계정 정보를 입력하세요.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <LabeledInput
            label="ID"
            onKeyDown={handleKeyDownToNext.bind(null, passwordRef)}
            onChange={(e) => accountDispatch({ userId: e.target.value })}
          />
          <LabeledInput
            ref={passwordRef}
            type="password"
            label="Password"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleVerify();
            }}
            onChange={(e) => accountDispatch({ password: e.target.value })}
          />
          <ErrorBox errorMessage={error?.message} />
        </div>
        <DialogFooter>
          <Button
            type="submit"
            variant="outline"
            onClick={() => setOpen(false)}
          >
            닫기
          </Button>
          <Button type="submit" disabled={isPending} onClick={handleVerify}>
            인증하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

interface LabeledInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  ref?: React.RefObject<HTMLInputElement | null>;
}

function LabeledInput({ ref, label, ...props }: LabeledInputProps) {
  const id = useId();

  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <label htmlFor={id} className="text-right">
        {label}
      </label>
      <Input ref={ref} id={id} wrapperClassName="col-span-3" {...props} />
    </div>
  );
}
