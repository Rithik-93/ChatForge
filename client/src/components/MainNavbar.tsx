
const MainNavbar = () => {
  return (
    <nav className='no-scrollbar flex flex-row items-center justify-start gap-7 overflow-auto overflow-y-hidden whitespace-nowrap border-b p-1 font-medium lg:justify-center'>
        <a className='text-zinc-500 hover:text-zinc-700 relative col-span-1 items-center p-1 font-medium text-sm' href='/dashboard/bots'>
          Agents
          <div className="bg-violet-500 -left-0 absolute top-[1.89rem] h-[0.15rem] w-full rounded-3xl transition-all ease-in-out"></div>
        </a>
        <a className='text-zinc-500 hover:text-zinc-700 relative col-span-1 items-center p-1 font-medium text-sm' href='/dashboard/usage'>
          Usage
          <div className="group-hover/link:bg-zinc-200 -left-0 absolute top-[1.89rem] h-[0.15rem] w-full rounded-3xl transition-all ease-in-out"></div>
        </a>
        <a className='text-zinc-500 hover:text-zinc-700 relative col-span-1 items-center p-1 font-medium text-sm' href='/dashboard/settings'>
          Settings
        </a>
    </nav>
  )
}

export default MainNavbar
