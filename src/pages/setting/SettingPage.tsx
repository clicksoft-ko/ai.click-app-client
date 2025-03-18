import { SettingBody } from "@/features/setting/ui";
import { IoIosArrowBack } from "react-icons/io";

const SettingPage = () => {
  return (
    <div>
      <header className="flex items-center border-b border-input">
        <button className="p-4 text-lg" onClick={() => history.back()}>
          <IoIosArrowBack />
        </button>
        <h1 className="text-xl font-bold">설정</h1>
      </header>
      <SettingBody />
    </div>
  );
};

export default SettingPage;
