import { Outlet } from "react-router-dom";

export const DefaultLayout = () => {
  return (
    <div className="w-full min-h-screen">
      <Outlet />
    </div>
  );
};
