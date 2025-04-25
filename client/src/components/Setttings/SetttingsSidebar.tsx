import { Link } from 'react-router-dom';

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

const Sidebar = () => {
  return (
    <nav className="flex flex-1 flex-col p-4 bg-white min-h-screen w-64">
      <ul role="list" className="space-y-1">
        {navItems.map(({ label, href, icon, active }) => (
          <li key={label}>
            <Link
              to={href}
              className={`group flex items-center gap-x-3 rounded-md p-2 font-semibold text-sm leading-6
                ${active
                  ? 'bg-zinc-50 text-violet-600'
                  : 'text-zinc-700 hover:bg-zinc-50 hover:text-violet-600'}
              `}
            >
              {icon}
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
