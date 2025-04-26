import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import PageTitle from "../components/PageTitle"

export default function SettingsPage() {
    const [agentId] = useState("rHFwQc8SJdA8kzRG2kqwd")
    const [name, setName] = useState("Rithik-resume")

    const copyToClipboard = () => {
        navigator.clipboard.writeText(agentId)
    }

    const handleSave = () => {
        console.log("Saving settings:", { agentId, name })
    }

    return (
        <div className="container mx-auto py-6 w-full max-w-4xl">
            <PageTitle title="Settings" buttonHide={true} variant="outline" children="" />

            <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-slate-100 text-slate-900">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-purple-500"
                        >
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 16v-4" />
                            <path d="M12 8h.01" />
                        </svg>
                        <span className="font-medium">General</span>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>General</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="agent-id" className="text-sm font-medium">
                                Agent ID
                            </label>
                            <div className="flex">
                                <Input id="agent-id" value={agentId} readOnly className="font-mono" />
                                <button
                                    type="button"
                                    className="inline-flex ml-3 items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-80 border border-zinc-200 bg-transparent hover:bg-zinc-100/70 hover:text-zinc-900 dark:border-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 rounded-xl disabled:bg-zinc-100/60 h-9 px-2 py-1"
                                    onClick={copyToClipboard}
                                >
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
                                        className="lucide lucide-copy h-4 w-4"
                                    >
                                        <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                                    </svg>
                                </button>

                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium">
                                Name
                            </label>
                            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>

                        <div className="flex justify-end">
                            <Button onClick={handleSave}>Save</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
