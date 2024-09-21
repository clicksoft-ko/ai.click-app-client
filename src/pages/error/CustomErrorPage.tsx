import { paths } from "@/shared/paths";
import { AccountWrapper } from "@/widgets/accounts";
import { Link, useLocation } from "react-router-dom";

export const CustomErrorPage = () => {
  const location = useLocation();

  const url = new URLSearchParams(location.search);
  const message = url.get("message");

  return (
    <AccountWrapper header={message}>
      <div className="flex flex-col items-center justify-center">
        <Link
          to={paths.signIn}
          className="block w-full rounded bg-blue-700 px-4 py-2 text-center text-xl font-medium text-white hover:bg-blue-900"
        >
          로그인 페이지로 가기
        </Link>
      </div>
    </AccountWrapper>
  );
};