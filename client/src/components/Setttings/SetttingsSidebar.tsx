import { Link } from 'react-router-dom';

const Sidebar = ({ navLinks }: { navLinks: unknown }) => {
  return (
    <nav className="flex flex-1 flex-col p-4 bg-white min-h-screen w-64">
      <ul role="list" className="space-y-1">
        {navLinks.map(({ label, href, icon, active }) => (
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
