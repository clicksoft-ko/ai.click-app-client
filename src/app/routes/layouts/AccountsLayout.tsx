import { Outlet } from "react-router-dom";

export const AccountsLayout = () => {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <Outlet />
    </div>
  );
};
