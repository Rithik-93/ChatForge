import { useState } from "react"
import { ChevronsUpDown, User } from "lucide-react"
import { useNavigate } from "react-router-dom"

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
              <ChatbaseLogo />
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

function ChatbaseLogo() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 109 109"
      fill="none"
      strokeWidth="1.3333333333333333"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
      strokeDasharray="0"
      strokeDashoffset="0"
      strokeOpacity="1"
      className="h-7 w-7"
    >
      <title>Chatbase.co</title>
      <rect width="109" height="109" fill="#09090B" rx="28"></rect>
      <path
        fill="white"
        d="M84.5 46.5H66.9a12 12 0 0 0-1-4 9.1 9.1 0 0 0-5.5-5 13 13 0 0 0-4.5-.8c-3 0-5.4.7-7.4 2.1-2 1.4-3.6 3.5-4.6 6.1-1 2.7-1.5 5.9-1.5 9.6 0 4 .5 7.2 1.5 9.9 1.1 2.6 2.6 4.6 4.6 6 2 1.3 4.4 2 7.3 2 1.6 0 3-.3 4.3-.7 1.2-.4 2.3-1 3.3-1.8 1-.7 1.7-1.7 2.3-2.8.6-1 1-2.3 1.2-3.7l17.6.1a24 24 0 0 1-2.3 8.3 27 27 0 0 1-14.5 13.5 32.5 32.5 0 0 1-12.3 2.2c-5.9 0-11.2-1.3-15.8-3.8a27.5 27.5 0 0 1-11-11.2c-2.8-4.9-4.1-10.9-4.1-18 0-7.2 1.4-13.2 4.1-18 2.8-5 6.5-8.7 11.1-11.2a35.8 35.8 0 0 1 26.8-2.1c3.4 1 6.4 2.7 9 4.8a24 24 0 0 1 6.2 7.8c1.5 3.1 2.5 6.7 2.8 10.7Z"
      ></path>
      <mask
        id="chatbase-logo-mask"
        width="44"
        height="66"
        x="21"
        y="23"
        maskUnits="userSpaceOnUse"
        style={{ maskType: "alpha" }}
      >
        <path fill="#A1A1AA" d="M41.5 23 51 37.5 62.5 71 65 87l-31.5 2L21 71l3.5-35 17-13Z"></path>
      </mask>
      <g mask="url(#chatbase-logo-mask)">
        <path
          fill="#B2AEB9"
          opacity="1"
          d="M84.5 46.5H66.9a12 12 0 0 0-1-4 9.1 9.1 0 0 0-5.5-5 13 13 0 0 0-4.5-.8c-3 0-5.4.7-7.4 2.1-2 1.4-3.6 3.5-4.6 6.1-1 2.7-1.5 5.9-1.5 9.6 0 4 .5 7.2 1.5 9.9 1.1 2.6 2.6 4.6 4.6 6 2 1.3 4.4 2 7.3 2 1.6 0 3-.3 4.3-.7 1.2-.4 2.3-1 3.3-1.8 1-.7 1.7-1.7 2.3-2.8.6-1 1-2.3 1.2-3.7l17.6.1a24 24 0 0 1-2.3 8.3 27 27 0 0 1-14.5 13.5 32.5 32.5 0 0 1-12.3 2.2c-5.9 0-11.2-1.3-15.8-3.8a27.5 27.5 0 0 1-11-11.2c-2.8-4.9-4.1-10.9-4.1-18 0-7.2 1.4-13.2 4.1-18 2.8-5 6.5-8.7 11.1-11.2a35.8 35.8 0 0 1 26.8-2.1c3.4 1 6.4 2.7 9 4.8a24 24 0 0 1 6.2 7.8c1.5 3.1 2.5 6.7 2.8 10.7Z"
        ></path>
      </g>
    </svg>
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
