import { useState } from 'react'
import Sidebar from '../Setttings/SetttingsSidebar'
import FileUpload from './FileUpload'
import SourcesCard from './trainCard'

// Type definition for file
type FileType = {
  id: string
  name: string
  size: number
  chars: number
  type: string
  active: boolean
  file?: File
}

const SourcesMain = () => {
    const [files, setFiles] = useState<FileType[]>([]);
    const [totalSize, setTotalSize] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    
    const navItems = [{
        label: 'Files',
        href: '#',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="none" strokeWidth="1.3333333333333333" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeDasharray="0" strokeDashoffset="0" strokeOpacity="1" className="text-violet-600 h-5 w-5 shrink-0" aria-hidden="true" data-sentry-element="svg" data-sentry-source-file="FileText.tsx" data-sentry-component="FileTextIcon"><title>FileTextIcon</title><path d="M20 11C20 9.34315 18.6569 8 17 8L16.4 8C16.0284 8 15.8426 8 15.6871 7.97538C14.8313 7.83983 14.1602 7.16865 14.0246 6.31287C14 6.1574 14 5.9716 14 5.6V5C14 3.34315 12.6569 2 11 2M8 13H16M8 17H13M20 10V18C20 20.2091 18.2091 22 16 22H8C5.79086 22 4 20.2091 4 18V6C4 3.79086 5.79086 2 8 2H12C16.4183 2 20 5.58172 20 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-sentry-element="path" data-sentry-source-file="FileText.tsx"></path></svg>
        ),
    }];

    const handleFilesChange = (newFiles: FileType[]) => {
        setFiles(newFiles);
        // Calculate total size
        const size = newFiles.reduce((acc, file) => acc + file.size, 0);
        setTotalSize(size);
    };

    const handleRetrainClick = async () => {
        if (files.length === 0) return;
        
        setIsUploading(true);
        
        try {
            const formData = new FormData();
            
            files.forEach(fileObj => {
                if (fileObj.file) {
                    formData.append('files', fileObj.file);
                }
            });
            
            formData.append('metadata', JSON.stringify(
                files.map(f => ({
                    id: f.id,
                    name: f.name,
                    size: f.size,
                    type: f.type,
                    active: f.active
                }))
            ));
            console.error( JSON.stringify(
                files.map(f => ({
                    id: f.id,
                    name: f.name,
                    size: f.size,
                    type: f.type,
                    active: f.active
                }))))
            
            
            const uploadResponse = await fetch('http://localhost:3000/api/core/api/create', {
                method: 'POST',
                body: formData
            });
            
            if (!uploadResponse.ok) {
                throw new Error(`Upload error: ${uploadResponse.status}`);
            }
            
            const result = await uploadResponse.json();
            console.log("Files uploaded successfully:", result);
            
        } catch (error) {
            console.error("Error during file upload:", error);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="flex w-full gap-3">
            <div className="w-1/4">
                <Sidebar navLinks={navItems} />
            </div>
            <div className="w-2/4">
                <FileUpload onFilesChange={handleFilesChange} />
            </div>
            <div className="w-1/4">
                <SourcesCard 
                    fileCount={files.length} 
                    fileSize={totalSize} 
                    onRetrainClick={handleRetrainClick}
                    isUploading={isUploading}
                />
            </div>
        </div>
    )
}

export default SourcesMain