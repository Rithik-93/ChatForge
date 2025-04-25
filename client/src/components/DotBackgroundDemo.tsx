import { cn } from "@/lib/utils";
import ChatPanel from "./ChatPanel";

export function DotBackgroundDemo() {
    return (
      <div className="relative flex w-full  justify-center bg-gray-100 dark:bg-black px-4 py-5 min-h-screen">
        <div className=" z-10 w-full max-w-md h-[440px] ">
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
    );
  }
  