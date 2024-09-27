import { MedicalTab, WardTab } from "@/features/root/enums";
import { SearchTabControl } from "@/features/root/ui";
import { paths } from "@/shared/paths";
import { Outlet, useLocation } from "react-router-dom";
import { MainHeader } from "src/app/header";

const wardTabs = Object.values(WardTab);
const medicalTabs = Object.values(MedicalTab);

export const RootLayout = () => {
  const { pathname } = useLocation();

  return (
    // <SocketIOProvider uri={envUtil.SOCKET_URL} use={true}>
    <div className="flex h-screen flex-col overflow-hidden">
      <MainHeader />
      <SearchTabControl
        tabTypes={pathname.startsWith(paths.medical) ? medicalTabs : wardTabs}
      />
      <Outlet />
    </div>
    // </SocketIOProvider>
  );
};
