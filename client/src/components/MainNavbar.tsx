import React from 'react';

type NavItem = {
  label: string;
  href: string;
  isActive?: boolean;
};

type MainNavbarProps = {
  items: NavItem[];
};

const MainNavbar: React.FC<MainNavbarProps> = ({ items }) => {
  return (
    <nav className='no-scrollbar flex flex-row items-center justify-start gap-7 overflow-auto overflow-y-hidden whitespace-nowrap border-b p-1 font-medium lg:justify-center'>
      {items.map(({ label, href, isActive }) => (
        <a
          key={label}
          href={href}
          className='text-zinc-500 hover:text-zinc-700 relative col-span-1 items-center p-1 font-medium text-sm'
        >
          {label}
          {isActive && (
            <div className="bg-violet-500 -left-0 absolute top-[1.89rem] h-[0.15rem] w-full rounded-3xl transition-all ease-in-out"></div>
          )}
        </a>
      ))}
    </nav>
  );
};

export default MainNavbar;
