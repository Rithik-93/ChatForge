import PageTitle from "@/components/PageTitle";
import SettingMain from "@/components/Setttings/SettingMain";
import Sidebar from "@/components/Setttings/SetttingsSidebar";

const Settings = () => {
  
const img = (src: string, alt = '') => (
  <img src={src} alt={alt} className="h-5 w-5 shrink-0 text-zinc-400 group-hover:text-violet-600" />
);

const navItems = [
  {
    label: 'General',
    href: './general',
    active: true,
    icon: img('/setting.png', 'General'),
  },
  {
    label: 'Members',
    href: './members',
    icon: img('/group-chat.png', 'Members'),
  },
  {
    label: 'Plans',
    href: './plans',
    icon: img('/planning.png', 'Plans'),
  },
  {
    label: 'Billing',
    href: './billing',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg"
           className="lucide lucide-credit-card h-5 w-5 shrink-0 text-zinc-400 group-hover:text-violet-600"
           fill="none" viewBox="0 0 24 24" stroke="currentColor"
           strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="14" x="2" y="5" rx="2" />
        <line x1="2" x2="22" y1="10" y2="10" />
      </svg>
    ),
  },
];

  return (
    <div className="max-w-7xl w-full mx-auto px-4 flex flex-col gap-6">
      <PageTitle title="Settings" buttonHide={true} children="" variant="" />
      <div className="flex w-full gap-6">
        <div className="w-1/4">
          <Sidebar navLinks={navItems} />
        </div>
        <div className="w-3/4">
          <SettingMain />
        </div>
      </div>
    </div>
  );
};

export default Settings;
