import { Button } from "@/components/ui/button";
import { useMemo } from "react";

interface SourcesCardProps {
  fileCount?: number;
  fileSize?: number;
  onRetrainClick?: () => Promise<void>;
  isUploading?: boolean;
}

export default function SourcesCard({ 
  fileCount = 0, 
  fileSize = 0,
  onRetrainClick,
  isUploading = false
}: SourcesCardProps) {
  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    return `${Math.round(bytes / 1024)} KB`;
  };

  const usedPercentage = useMemo(() => {
    return Math.min(100, (fileSize / (400 * 1024)) * 100);
  },[fileSize])

  return (
    <div className="rounded-xl border border-zinc-200 h-full max-h-96 p-4 shadow-sm w-full max-w-xs">
      <h2 className="text-sm font-semibold text-zinc-500 mb-4">SOURCES</h2>

      <div className="flex items-center justify-between text-sm font-medium text-zinc-700 mb-2">
        <span>📄 {fileCount} {fileCount === 1 ? 'File' : 'Files'}</span>
        <span>{formatFileSize(fileSize)}</span>
      </div>

      <div className="border-t border-dashed border-zinc-200 my-4" />
      
      <div className="w-full bg-zinc-100 rounded-full h-2 mb-2">
        <div 
          className="bg-violet-600 h-2 rounded-full" 
          style={{ width: `${usedPercentage}%` }}
        ></div>
      </div>

      <div className="text-sm text-zinc-600 mb-6">
        <span className="font-medium text-zinc-700">Total size:</span> {formatFileSize(fileSize)} / 400 KB
      </div>

      <Button 
        onClick={onRetrainClick}
        disabled={isUploading || fileCount === 0}
        className="w-full h-10 rounded-md bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800 transition"
      >
        {isUploading ? "Creating model..." : "Retrain agent"}
      </Button>
    </div>
  );
}