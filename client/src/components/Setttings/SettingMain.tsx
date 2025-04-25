
const SettingMain = () => {
    return (
        <div className="rounded-lg border border-zinc-200 bg-white text-zinc-950 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50">
            <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="text-2xl font-semibold leading-none tracking-tight">General</h3>
            </div>

            <div className="p-6 pt-0 flex flex-col gap-4">
                {/* Team name field */}
                <div className="space-y-2">
                    <label
                        htmlFor="team-name"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Team name
                    </label>
                    <input
                        id="team-name"
                        placeholder="Enter your team name"
                        value="Rithik M"
                        aria-label="team name"
                        className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 placeholder:text-muted-foreground focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>

                {/* Team URL field */}
                <div className="space-y-2">
                    <label
                        htmlFor="team-url"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Team URL
                    </label>
                    <input
                        id="team-url"
                        placeholder="Enter your team URL"
                        value="rithik-m234"
                        aria-label="team url"
                        className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 placeholder:text-muted-foreground focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    <p className="text-[0.8rem] text-zinc-500 dark:text-zinc-400">
                        Changing the team URL will redirect you to the new address.
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-end p-6 pt-0">
                <button
                    type="submit"
                    form="general-account-form"
                    disabled
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-zinc-900 px-8 text-sm font-medium text-zinc-50 shadow hover:bg-zinc-800/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-80 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 h-10"
                >
                    Save
                </button>
            </div>
        </div>

    )
}

export default SettingMain
