import { SignUpForm } from "@/features/signup";
import { useVerify } from "@/features/signup/hooks/use-verify";
import { SignUpVerify } from "@/features/signup/ui/SignUpVerify";
import { AccountWrapper } from "@/widgets/accounts";

export const SignUp = () => {
  const { state } = useVerify();

  return (
    <AccountWrapper header={"회원가입"}>
      {state?.csUserId ? <SignUpForm /> : <SignUpVerify />}
    </AccountWrapper>
  );
};
