import { SignUpForm } from "@/features/signup";
import { AccountWrapper } from "@/widgets/accounts";

export const SignUp = () => {
  return (
    <AccountWrapper header={"회원가입"}>
      <SignUpForm />
    </AccountWrapper>
  );
};
