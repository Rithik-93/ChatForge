import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Trash2, ChevronDown, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type FileType = {
  id: string
  name: string
  size: number
  chars: number
  type: string
  active: boolean
  file?: File // Store the actual file object
}

interface FileUploadProps {
  onFilesChange?: (files: FileType[]) => void;
}

export default function FileUpload({ onFilesChange }: FileUploadProps) {
  const [files, setFiles] = useState<FileType[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Update parent component when files change
  useEffect(() => {
    if (onFilesChange) {
      onFilesChange(files);
    }
  }, [files, onFilesChange]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.name.endsWith(".pdf")) {
        alert("Please upload a PDF file.");
        e.target.value = "";
      } 
    }
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((file) => ({
        id: Math.random().toString(36).substring(2, 9),
        name: file.name,
        size: file.size,
        chars: Math.floor(Math.random() * 3000),
        type: file.type.split("/")[1] || file.name.split('.').pop() || "",
        active: true,
        file: file,
      }))
      setFiles([...files, ...newFiles])
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files).map((file) => ({
        id: Math.random().toString(36).substring(2, 9),
        name: file.name,
        size: file.size,
        chars: Math.floor(Math.random() * 3000),
        type: file.type.split("/")[1] || file.name.split('.').pop() || "",
        active: true,
        file: file,
      }))
      setFiles([...files, ...newFiles])
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleDelete = (id: string) => {
    setFiles(files.filter((file) => file.id !== id))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    return `${Math.round(bytes / 1024)} KB`
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return (
          <div className="w-10 h-10 flex items-center justify-center bg-red-500 text-white text-xs rounded">PDF</div>
        )
      case "txt":
        return (
          <div className="w-10 h-10 flex items-center justify-center bg-purple-500 text-white text-xs rounded">TXT</div>
        )
      case "doc":
      case "docx":
        return (
          <div className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white text-xs rounded">DOC</div>
        )
      default:
        return (
          <div className="w-10 h-10 flex items-center justify-center bg-gray-500 text-white text-xs rounded">FILE</div>
        )
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Files</CardTitle>
      </CardHeader>
      <CardContent>
        {files.length === 0 ? (
          <div
            className="border-2 border-dashed rounded-md p-12 text-center cursor-pointer"
            onClick={handleClick}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <div className="flex justify-center mb-4">
              <Upload className="h-10 w-10 text-gray-400" />
            </div>
            <p className="text-gray-700 mb-2">Drag & drop files here, or click to select files</p>
            <p className="text-gray-500 text-sm">Supported File Types: .pdf, .doc, .docx, .txt</p>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
              multiple
              accept=".pdf,.doc,.docx,.txt"
            />
          </div>
        ) : (
          <div className="space-y-4">
            {files.map((file) => (
              <div key={file.id} className="flex items-center justify-between border rounded-md p-3">
                <div className="flex items-center space-x-3">
                  {getFileIcon(file.type)}
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{file.name}</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Active
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-500">
                      {formatFileSize(file.size)} • {file.chars} chars
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleDelete(file.id)}
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <ChevronDown className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            ))}

            <div
              className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer mt-4"
              onClick={handleClick}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <p className="text-gray-700">Drag & drop more files here, or click to select files</p>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
                multiple
                accept=".pdf"
              />
            </div>

            <p className="text-gray-600 text-sm mt-4">
              If you are uploading a PDF, make sure you can select/highlight the text.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}