import { Link } from 'react-router-dom';

const navItems = [
  {
    label: 'General',
    href: './general',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
           strokeWidth="1.5" stroke="currentColor"
           className="h-5 w-5 shrink-0 text-violet-600">
        <path strokeLinecap="round" strokeLinejoin="round"
              d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87..."/>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    active: true,
  },
  {
    label: 'Members',
    href: './members',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none"
           viewBox="0 0 24 24" strokeWidth="1.5"
           stroke="currentColor" className="h-5 w-5 shrink-0 text-zinc-400 group-hover:text-violet-600">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38..."/>
      </svg>
    ),
  },
  {
    label: 'Plans',
    href: './plans',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none"
           viewBox="0 0 24 24" strokeWidth="1.5"
           stroke="currentColor" className="h-5 w-5 shrink-0 text-zinc-400 group-hover:text-violet-600">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25..."/>
      </svg>
    ),
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
