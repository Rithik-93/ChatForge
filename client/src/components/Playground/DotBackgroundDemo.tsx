import { cn } from "@/lib/utils";
import ChatPanel from "../ChatPanel";
import { useState } from "react";
import { motion } from "motion/react";
// import { cn } from "@/lib/utils";

export function SidebarDemo() {
  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-7xl flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
        "h-[470px] ",
      )}
    >
      <div className="relative flex w-full justify-center bg-gray-100 dark:bg-black px-4 py-5">

        <div className="z-10 w-full max-w-md h-[440px]">
          <ChatPanel />
        </div>
        <div
          className={cn(
            "absolute inset-0",
            "[background-size:20px_20px]",
            "[background-image:radial-gradient(black_1px,transparent_1px)]",
            "dark:[background-image:radial-gradient(white_1px,transparent_1px)]",
          )}
        />
      </div>
    </div>
  );
}
export const Logo = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-black dark:text-white"
      >
        Acet Labs
      </motion.span>
    </a>
  );
};
export const LogoIcon = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
    </a>
  );
};

import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { InfoIcon as InfoCircle, Cpu } from "lucide-react"

function AIAgentConfig() {
  const [temperature, setTemperature] = useState(1)
  const [model, setModel] = useState("gpt-4o-mini")
  const [status, setStatus] = useState("trained")

  const statusColors = {
    trained: "bg-emerald-400",
    training: "bg-amber-400",
    failed: "bg-red-400",
  }

  const statusLabels = {
    trained: "Trained",
    training: "Training",
    failed: "Failed",
  }

  const handleSave = () => {
    console.log("Saving configuration:", { model, temperature })
  }

  return (
    <Card className="w-full max-w-md border rounded-lg shadow-sm">
      <CardContent className="p-0">
        <div className="p-4 pb-6">
          <Button className="w-full bg-gray-700 hover:bg-gray-800 text-white font-medium py-2.5" onClick={handleSave}>
            Save to agent
          </Button>
        </div>

        <div className="px-4 pb-4 border-t border-gray-100">
          <div className="flex items-center justify-between py-4">
            <span className="text-gray-700 font-medium">Status:</span>
            <div className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full ${statusColors[status]}`}></div>
              <span className="text-gray-700">{statusLabels[status]}</span>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="text-gray-700 font-medium">Model</label>
              <InfoCircle className="w-4 h-4 text-gray-400" />
            </div>
            <Select value={model} onValueChange={setModel}>
              <SelectTrigger className="w-full border-gray-200">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4" />
                  <SelectValue placeholder="Select model" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt-4o-mini">GPT-4o Mini</SelectItem>
                <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                <SelectItem value="claude-3-opus">Claude 3 Opus</SelectItem>
                <SelectItem value="claude-3-sonnet">Claude 3 Sonnet</SelectItem>
                <SelectItem value="llama-3">Llama 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="text-gray-700 font-medium">Temperature</label>
              <div className="flex items-center gap-1">
                <span className="text-gray-700 font-medium">{temperature}</span>
                <InfoCircle className="w-4 h-4 text-gray-400" />
              </div>
            </div>
            <div className="mt-2">
              <Slider
                value={[temperature]}
                min={0}
                max={2}
                step={0.1}
                onValueChange={(value) => setTemperature(value[0])}
              />
              <div className="flex justify-between mt-1 text-sm text-gray-500">
                <span>Reserved</span>
                <span>Creative</span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 py-4 border-t border-gray-100">
          <h3 className="text-gray-700 font-medium mb-3">AI Actions</h3>
          <div className="p-4 border border-gray-200 rounded-md text-center text-gray-500">No actions found</div>
        </div>

        <div className="px-4 py-4 border-t border-gray-100">
          <h3 className="text-gray-700 font-medium mb-3">System prompt</h3>
          {/* System prompt textarea would go here */}
        </div>
      </CardContent>
    </Card>
  )
}
