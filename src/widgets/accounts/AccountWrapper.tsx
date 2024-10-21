import { ChildrenProps } from "@/shared/interfaces/props";
import { paths } from "@/shared/paths";
import { Link, useLocation } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

interface AccountWrapperProps extends ChildrenProps {
  header: React.ReactNode;
}

export const AccountWrapper = ({ header, children }: AccountWrapperProps) => {
  const { pathname } = useLocation();

  return (
    <div className="rounded-2xl border bg-blue-100 bg-gradient-to-br from-primary to-emerald-900 p-2">
      <div className="flex min-w-[22rem] flex-col items-center gap-4 rounded-xl bg-white px-4 py-16">
        <img className="h-16" src={`/images/click_soft_logo.png`} alt="로고" />
        <h2 className="my-4 text-2xl font-bold">{header}</h2>
        {children}
        <div className="flex justify-center gap-1 text-xs text-gray-400">
          {links[pathname].map((obj, index) => {
            const key = Object.keys(obj)[0];
            return (
              <Fragment key={key}>
                {index !== 0 && <span>/</span>}
                <Link key={key} to={key}>
                  {obj[key]}
                </Link>
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const signInObj = { [paths.signIn]: "로그인" };
const signUpObj = { [paths.signUp]: "회원가입" };
// const findPwObj = { [paths.findPw]: "비밀번호 찾기" };
const links = {
  [paths.signIn]: [signUpObj], // , findPwObj
  [paths.signUp]: [signInObj], // , findPwObj
  [paths.findPw]: [signInObj, signUpObj],
  [paths.error]: [],
};
