import { SiginInForm } from "@/features/signin";
import { AccountWrapper } from "@/widgets/accounts";

export const SignIn = () => {
  return (
    <AccountWrapper header={"클릭소프트 로그인"}>
      <SiginInForm/>
    </AccountWrapper>
  );
};
