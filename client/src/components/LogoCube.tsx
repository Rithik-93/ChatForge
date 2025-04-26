<<<<<<< HEAD
export default function LogoCube({ w = 10, h = 10 }: { w: number; h: number }) {
    return (
      <div className={`w-${w} h-${h} relative`}>
=======
export default function LogoCube() {
    return (
      <div className="w-20 h-20 relative">
>>>>>>> 8bcf80222754e0b3e6a265f0b7d5e6524d8e770b
        <div className="absolute inset-0 bg-red-500 transform rotate-y-[-30deg] rotate-x-[22deg] shadow-lg rounded-sm">
          <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-2xl">B</div>
        </div>
      </div>
    )
<<<<<<< HEAD
}
=======
  }
>>>>>>> 8bcf80222754e0b3e6a265f0b7d5e6524d8e770b
  