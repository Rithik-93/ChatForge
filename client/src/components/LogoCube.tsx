export default function LogoCube({ w = 10, h = 10 }: { w: number; h: number }) {
    return (
      <div className={`w-${w} h-${h} relative`}>
        <div className="absolute inset-0 bg-red-500 transform rotate-y-[-30deg] rotate-x-[22deg] shadow-lg rounded-sm">
          <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-2xl">B</div>
        </div>
      </div>
    )}