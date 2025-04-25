import PageTitle from "@/components/PageTitle";
import SettingMain from "@/components/Setttings/SettingMain";
import Sidebar from "@/components/Setttings/SetttingsSidebar";

const Settings = () => {
  return (
    <div className="max-w-7xl w-full mx-auto px-4 flex flex-col gap-6">
      <PageTitle title="Settings" buttonHide={true} />
      <div className="flex w-full gap-6">
        <div className="w-1/4">
          <Sidebar />
        </div>
        <div className="w-3/4">
          <SettingMain />
        </div>
      </div>
    </div>
  );
};

export default Settings;
