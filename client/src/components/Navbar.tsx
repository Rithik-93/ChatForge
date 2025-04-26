import { useState } from "react"
import { ChevronsUpDown, User } from "lucide-react"
import { useNavigate } from "react-router-dom"
import LogoCube from "./LogoCube"

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <nav className="relative flex flex-row items-center justify-between bg-white px-2 py-3 md:px-6 md:pb-0">
      <nav className="flex items-center">
        <ol
          className="break-words text-zinc-500 sm:gap-2.5 dark:text-zinc-500 flex flex-wrap items-center gap-2 px-2 font-medium text-sm leading-6"
          role="list"
        >
          <li className="flex items-center">
            <div onClick={() => navigate('/')} className="pointer-events-auto inline-block">
              <LogoCube h={10} w={10} />
            </div>
          </li>
          <li role="presentation" aria-hidden="true" className="[&>svg]:size-3.5">
            <span className="font-thin text-lg text-zinc-300">/</span>
          </li>
          <li>
            <div className="flex flex-row justify-between items-center">
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-80 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 disabled:text-zinc-600 h-9 py-1 text-zinc-900 hover:bg-transparent px-0 text-sm">
                Rithik M
              </button>
              <button
                className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-80 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 disabled:text-zinc-600 rounded-md px-3 hover:bg-zinc-100 ml-1 h-6 w-6 text-zinc-900 hover:cursor-pointer"
                role="combobox"
                aria-expanded="false"
                aria-label="Select a team"
                type="button"
                aria-haspopup="dialog"
                aria-controls="team-selector"
                data-state="closed"
              >
                <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
              </button>
            </div>
          </li>
        </ol>
      </nav>

      <div className="flex flex-row items-center justify-center gap-2">
        <button
          className="whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-80 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 disabled:text-zinc-600 h-9 w-9 pointer-events-auto flex items-center justify-center text-zinc-700 lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <MenuIcon />
        </button>

        <div
          onClick={() => navigate("/docs")}
          className="hidden rounded-lg p-1 text-sm font-semibold leading-6 text-zinc-600 outline-0 transition-all duration-75 ease-in-out hover:text-zinc-900 lg:block"
        >
          Docs
        </div>

        {/* <Link
          href="/help"
          className="hidden rounded-lg p-1 text-sm font-semibold leading-6 text-zinc-600 outline-0 transition-all duration-75 ease-in-out hover:text-zinc-900 lg:block"
        >
          Help
        </Link>

        <Link
          href="/changelog"
          className="mr-2 hidden rounded-lg p-1 text-sm font-semibold leading-6 text-zinc-600 outline-0 transition-all duration-75 ease-in-out hover:text-zinc-900 lg:block"
        >
          Changelog
        </Link> */}

        <span
          className="relative shrink-0 rounded-full hidden h-9 w-9 items-center justify-center overflow-hidden border border-zinc-300 bg-zinc-50/50 text-sm font-medium hover:cursor-pointer lg:flex"
        >
          <img
            className="aspect-square h-full w-full"
            src="https://lh3.googleusercontent.com/a/ACg8ocJbiINdtjPRtWNJZMGKQTrWu8-6ZDs8rldbGjf1alUFg1pCWtHP=s96-c"
            alt="User avatar"
            width={36}
            height={36}
            referrerPolicy="no-referrer"
          />
          <User className="mt-2 h-7 w-7 stroke-1 text-zinc-500" />
        </span>
      </div>
    </nav>
  )
}

function MenuIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="8" y2="8" className="origin-top-left transition-transform duration-300"></line>
      <line
        x1="4"
        x2="20"
        y1="16"
        y2="16"
        className="origin-bottom-left transition-transform duration-300 ease-in-out"
      ></line>
    </svg>
  )
}
