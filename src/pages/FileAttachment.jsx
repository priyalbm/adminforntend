import React, { useState, useRef } from "react";
import { ImAttachment } from "react-icons/im";
import { FiX } from "react-icons/fi";

export const FileAttachment = ({ onFileSelected, disabled = false, maxSize = 5 * 1024 * 1024 }) => {
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileSelect = (e) => {
        setError(null);
        
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            
            // Check file size
            if (file.size > maxSize) {
                setError(`File size exceeds ${formatFileSize(maxSize)} limit`);
                onFileSelected(null);
                return;
            }
            
            onFileSelected(file);
        }
    };
    
    const triggerFileInput = () => {
        fileInputRef.current.click();
    };
    
    const formatFileSize = (bytes) => {
        if (bytes < 1024) return bytes + " B";
        else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
        else return (bytes / 1048576).toFixed(1) + " MB";
    };
    
    return (
        <div>
            <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileSelect} 
                style={{ display: "none" }} 
            />
            
            <button 
                className={`btn btn-link p-0 ${disabled ? 'disabled' : ''}`}
                onClick={triggerFileInput}
                disabled={disabled}
            >
                <ImAttachment />
            </button>
            
            {error && <div className="text-danger small mt-1">{error}</div>}
        </div>
    );
};